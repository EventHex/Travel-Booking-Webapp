import React, { useState, useEffect } from "react";
import { Shield, X } from "lucide-react";
import { True, TicIcon, CloseIconTicket } from "../../assets";
import PassportPopup from "./popup";
import axios from "axios";
import { generateInvoicePDF } from "../../utils/pdfGenerator";

const Ticket = ({
  approvedApplications = [],
  rejectedApplications = [],
  submittedApplications = [],
  refundedApplications = [],
  pendingApplications = [],
}) => {
  const [travellerInformationList, setTravellerInformationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPassport, setSelectedPassport] = useState(null);

  // Update the base URL to use DigitalOcean Spaces CDN
  const CDN_BASE_URL = 'https://event-manager.syd1.cdn.digitaloceanspaces.com';

  // Function to format image URL
  const formatImageUrl = (imagePath) => {
    if (!imagePath) return '';
    // If the path already starts with http/https, return as is
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, combine with CDN base URL
    return `${CDN_BASE_URL}/${imagePath}`;
  };

  // Create an array of all applications, filtering out empty arrays
  const applicationData = [
    ...approvedApplications,
    ...rejectedApplications,
    ...submittedApplications,
    ...pendingApplications,
    ...refundedApplications,
  ];

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();

    const fetchTravellerInformation = async () => {
      if (isLoading) return; // Prevent duplicate calls while loading
      
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8078/api/v1/traveller-information', {
          signal: controller.signal
        });
        
        if (isMounted && response.data && response.data.success && Array.isArray(response.data.response)) {
          setTravellerInformationList(response.data.response);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          // Handle abort error silently
          return;
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTravellerInformation();

    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []); // Remove applicationData dependency

  const findMatchingTravellerInfo = (application) => {
    if (!Array.isArray(travellerInformationList)) {
      return {};
    }

    // Try to find matching traveller information based on available data
    const matchingInfo = travellerInformationList.find(info => {
      // Match based on name if available (case insensitive)
      if (application.name && info.firstName) {
        const appName = application.name.toLowerCase();
        const infoName = info.firstName.toLowerCase();
        if (appName === infoName) {
          return true;
        }
        // Also try matching full name
        const fullName = `${info.firstName} ${info.lastName || ''}`.trim().toLowerCase();
        if (appName === fullName) {
          return true;
        }
      }
      
      // Match based on passport number if available
      if (application.passportNumber && application.passportNumber !== 'N/A' && 
          info.passportNumber === application.passportNumber) {
        return true;
      }

      return false;
    });

    return matchingInfo || {};
  };

  const getStatusBarColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-blue-500 ";
      case "Rejected":
        return "bg-red-500";
      case "Refunded":
        return "bg-orange-500";
      case "Submitted":
        return "bg-blue-800";
      case "Pending Payment":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Approved":
        return "Approved";
      case "Rejected":
        return "Rejected";
      case "Submitted":
        return "Submitted";
      case "Refunded":
        return "Refunded";
      case "Pending Payment":
        return "Pending Payment";
      default:
        return "Processing";
    }
  };

  const openPassportPopup = (application) => {
    try {
      const travellerInfo = findMatchingTravellerInfo(application);
      
      // Create passport data combining application and traveller information
      const passportData = {
        // Basic Information
        name: `${travellerInfo.firstName || ''} ${travellerInfo.lastName || ''}` || application.name || '',
        passportNumber: travellerInfo.passportNumber || application.passportNumber || 'N/A',
        gender: travellerInfo.sex || '',
        dateOfBirth: travellerInfo.dateOfBirth ? 
          new Date(travellerInfo.dateOfBirth).toLocaleDateString() : '',
        placeOfBirth: travellerInfo.placeOfBirth || '',
        maritalStatus: travellerInfo.maritalStatus || '',
        dateOfIssue: travellerInfo.dateOfIssue ? 
          new Date(travellerInfo.dateOfIssue).toLocaleDateString() : '',
        dateOfExpiry: travellerInfo.dateOfExpiry ? 
          new Date(travellerInfo.dateOfExpiry).toLocaleDateString() : '',
        nationality: travellerInfo.nationality || application.country || '',
        occupation: travellerInfo.occupation || '',

        // Additional Information
        fatherName: travellerInfo.fathersName || '',
        motherName: travellerInfo.mothersName || '',

        // Images with CDN URLs
        travellerPhoto: formatImageUrl(travellerInfo.travellerPhoto) || '',
        passportImageFront: formatImageUrl(travellerInfo.passportImageFront) || '',
        passportImageBack: formatImageUrl(travellerInfo.passportImageBack) || '',
        panPhoto: formatImageUrl(travellerInfo.panPhoto) || '',

        // Visa and Travel Information
        panNumber: travellerInfo.indianPanCard || '',
        status: application.status || '',
        visaType: application.visa || '',
        visaCountry: application.country || '',
        travelDates: {
          from: application.travelDates ? application.travelDates.split('—')[0].trim() : '',
          to: application.travelDates ? application.travelDates.split('—')[1].trim() : ''
        },
        
        // Include the traveller information ID if available
        travellerId: travellerInfo._id || null,

        // Include place of issue if available
        placeOfIssue: travellerInfo.placeOfIssue || ''
      };

      setSelectedPassport(passportData);
      setIsPopupOpen(true);
    } catch (error) {
    }
  };

  if (applicationData.length === 0) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <p className="text-gray-500">No applications found</p>
      </div>
    );
  }

  const handleDownloadInvoice = async (application) => {
    try {
      const pdfBytes = await generateInvoicePDF(application);
      
      // Create a blob from the PDF bytes
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${application.passportNumber}.pdf`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating invoice PDF:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="w-full">
      <main className="w-full">
        <div className="flex flex-col gap-3">
          <div className="flex-1">
            {applicationData.map((application, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] mb-6 overflow-hidden shadow-sm"
              >
                <div className="flex w-full">
                  <div
                    className={`relative w-[8px] p-2 sm:w-[12px] flex justify-center items-center md:w-[20px] ${getStatusBarColor(
                      application.status
                    )} flex-shrink-0`}
                  >
                    <div className="  flex gap-5   origin-center -rotate-90 whitespace-nowrap text-white text-[12px]">
                      <p className="flex   gap-1">
                        {" "}
                        <img className="rotate-90" src={application.image} alt="" />
                        <span className="flex">visa</span>
                      </p>
                      {getStatusText(application.status)}
                    </div>
                  </div>
                  <div className="flex flex-col w-full p-3 sm:p-5">
                    {/* Desktop layout (lg and above) */}
                    <div className="hidden lg:flex lg:flex-row lg:justify-between lg:gap-4 lg:w-full">
                      {/* Personal Information Section */}
                      <div className="flex flex-col border-r border-dashed border-black p-2 flex-grow">
                        <div>
                          <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-gray-900 break-words">
                            {application.name}
                          </h3>
                        </div>

                        <div className="mt-4 text-[12px] sm:text-[13px] md:text-[14px] flex flex-col w-[80%] text-gray-500">
                          <div className="flex w-full">
                            <p className="flex w-full justify-between">
                              <span className="mr-2">Submitted on:</span>
                              <span>{application.submittedOn}</span>
                            </p>
                          </div>
                          <div className="flex w-full">
                            <p className="flex w-full justify-between">
                              <span className="mr-2">Submitted at:</span>
                              <span>{application.submittedAt}</span>
                            </p>
                          </div>
                          <div className="flex w-full">
                            <p className="flex w-full justify-between">
                              <span className="mr-2">Passport Number:</span>
                              <span>{application.passportNumber}</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <h4 className="text-[14px] sm:text-[16px] font-medium text-gray-900">
                            {application.country}
                          </h4>
                          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-500 mt-2">
                            {application.visa}
                          </p>
                          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-500 mt-1">
                            Travel: {application.travelDates}
                          </p>
                        </div>
                      </div>

                      {/* Application Details Section */}
                      <div className="flex-shrink-0 w-64 relative">
                        <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6">
                          Application Details
                        </h4>
                        <div className="space-y-4 sm:space-y-6 relative">
                          <div
                            className="absolute left-[11px] top-0 bottom-0"
                            style={{
                              width: "1px",
                              background:
                                "repeating-linear-gradient(to bottom, #E2E8F0 0, #E2E8F0 4px, transparent 4px, transparent 8px)",
                            }}
                          ></div>

                          {Object.entries(application.details).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center space-x-3 relative"
                              >
                                <div
                                  className={` sm:w-6 rounded-full ${
                                    value ? "" : ""
                                  } flex items-center justify-center  ${
                                    value ? "" : ""
                                  }`}
                                >
                                  {value ? (
                                    <img src={TicIcon} alt="tic" />
                                  ) : (
                                    <img src={CloseIconTicket} alt="close" />
                                  )}
                                </div>
                                <span className="text-xs sm:text-sm text-gray-600">
                                  {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Status Card Section */}
                      <div className="flex-shrink-0 w-72">
                        <h2 className="w-full rounded-lg text-gray-500 underline text-sm font-semibold mb-3 py-1">
                          {Object.values(application.details).filter(Boolean).length}/
                          {Object.keys(application.details).length} Parameters checked
                        </h2>
                        <div
                          className={`${
                            application.status === "Approved"
                              ? "bg-blue-100"
                              : application.status === "Pending Payment"
                              ? "bg-green-100"
                              : application.status === "Submitted"
                              ? "bg-blue-200"
                              : application.statusMessage.cardBg
                          } rounded-xl sm:rounded-2xl sm:p-2`}
                        >
                          <div className="flex w-full space-x-3 sm:space-x-4">
                            {/* Icon container for all statuses */}
                            {application.status !== "refunded" && (
                              <div
                                className={`h-10 w-10 sm:h-12 sm:w-12 ${
                                  application.status === "Pending Payment"
                                    ? "bg-green-200"
                                    : application.status === "Submitted" || application.status === "submitting"
                                    ? "bg-blue-100"
                                    : application.status === "Approved"
                                    ? "bg-blue-200"
                                    : application.statusMessage.iconBg
                                } rounded-lg sm:rounded-xl flex items-center justify-center`}
                              >
                                {typeof application.statusMessage.icon ===
                                "string" ? (
                                  <img
                                    src={application.statusMessage.icon}
                                    alt=""
                                    className="h-6 w-6"
                                  />
                                ) : (
                                  <div
                                    className={`${
                                      application.status === "Pending Payment"
                                        ? "text-green-500"
                                        : application.status === "Submitted" || application.status === "submitting"
                                        ? "text-orange-500"
                                        : application.status === "Approved"
                                        ? "text-yellow-500"
                                        : application.statusMessage.iconColor
                                    }`}
                                  >
                                    {application.status === "Approved" && (
                                      <Shield className="h-6 w-6" />
                                    )}
                                    {application.status === "Rejected" && (
                                      <X className="h-6 w-6" />
                                    )}
                                    {application.status === "Pending Payment" && (
                                      <Shield className="h-6 w-6" />
                                    )}
                                    {(application.status === "Submitted" || application.status === "submitting") && (
                                      <span className="text-lg font-bold">!</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="w-[80%] justify-between flex">
                              <h4
                                className={`font-medium ${
                                  application.status === "Pending Payment"
                                    ? "text-green-500  "
                                    : application.statusMessage.iconColor
                                } sm:text-[16px]`}
                              >
                                {application.status === "Pending Payment"
                                  ? "Your application is being processed"
                                  : application.statusMessage.title}
                              </h4>
                              {application.status === "Approved" && (
                                <div>
                                  <button className="text-[12px] text-white px-1 gap-1 flex justify-center bg-green-500 rounded-full">
                                    <span className="flex justify-center">
                                      <img src={True} alt="" />
                                    </span>
                                    Before Time
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          {(application.statusMessage.description ||
                            application.status === "Pending Payment") && (
                            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                              {application.status === "Pending Payment"
                                ? "We are reviewing your application. This usually takes 2-3 business days."
                                : application.statusMessage.description}
                            </p>
                          )}

                          {/* Delivery status */}
                          {application.status === "Pending Payment" && (
                            <div className="mt-2">
                              <span className="text-xs sm:text-sm text-gray-600">
                                Yet to be delivered
                              </span>
                            </div>
                          )}

                          {/* Dates for rejected */}
                          {application.status === "Rejected" && (
                            <div className="mt-3 sm:mt-4 space-y-1 text-xs sm:text-sm text-gray-700">
                              <p className="flex justify-between">
                                <span className="text-[14px] font-[400]">
                                  Estimated on:
                                </span>
                                <span className="text-[14px] font-[400]">
                                  {new Date(application.expectedVisaApprovalDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-[14px] font-[400]">
                                  Delivery on:
                                </span>
                                <span className="text-[14px] font-[400]">
                                  {new Date(application.deliveredDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                              </p>
                            </div>
                          )}

                          {/* Dates for approved or pending */}
                          {(application.status === "Approved" ||
                            application.status === "Pending Payment" ||
                            application.status === "Submitted") && (
                            <div className="mt-3 sm:mt-4 space-y-1 text-xs sm:text-sm">
                              <p className="flex justify-between">
                                <span className="text-gray-700 text-[14px] font-[400]">
                                  Estimated on:
                                </span>
                                <span className="text-gray-700 text-[14px] font-[400]">
                                  {new Date(application.expectedVisaApprovalDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-gray-700 text-[14px] font-[400]">
                                  Delivery on:
                                </span>
                                <span className="text-[14px] font-[400]">
                                  {new Date(application.deliveredDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 grid grid-cols-1">
                          <button className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              openPassportPopup(application);
                            }}
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleDownloadInvoice(application)}
                            className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Invoice
                          </button>
                          <button 
                            // onClick={() => handleDownloadInsurance(application)}
                            className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Download Insurance
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile layout (below lg) */}
                    <div className="flex flex-col lg:hidden gap-4 w-full">
                      {/* Personal Information Section */}
                      <div className="flex flex-col p-2">
                        <div>
                          <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-gray-900 break-words">
                            {application.name}
                          </h3>
                        </div>

                        <div className="mt-4 text-[12px] sm:text-[13px] md:text-[14px] flex flex-col w-full text-gray-500">
                          <div className="flex w-full">
                            <p className="flex w-full justify-between">
                              <span className="mr-2">Submitted on:</span>
                              <span>{application.submittedOn}</span>
                            </p>
                          </div>
                          <div className="flex w-full">
                            <p className="flex w-full justify-between">
                              <span className="mr-2">Submitted at:</span>
                              <span>{application.submittedAt}</span>
                            </p>
                          </div>
                          <div className="flex w-full">
                            <p className="flex w-full justify-between">
                              <span className="mr-2">Passport Number:</span>
                              <span>{application.passportNumber}</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <h4 className="text-[14px] sm:text-[16px] font-medium text-gray-900">
                            {application.country}
                          </h4>
                          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-500 mt-2">
                            {application.visa}
                          </p>
                          <p className="text-[12px] sm:text-[13px] md:text-[14px] text-gray-500 mt-1">
                            Travel: {application.travelDates}
                          </p>
                        </div>
                      </div>

                      {/* Application Details Section */}
                      <div className="mt-4 relative">
                        <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6">
                          Application Details
                        </h4>
                        <div className="space-y-4 sm:space-y-6 relative">
                          <div
                            className="absolute left-[11px] top-0 bottom-0"
                            style={{
                              width: "1px",
                              background:
                                "repeating-linear-gradient(to bottom, #E2E8F0 0, #E2E8F0 4px, transparent 4px, transparent 8px)",
                            }}
                          ></div>

                          {Object.entries(application.details).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center space-x-3 relative"
                              >
                                <div
                                  className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full ${
                                    value ? "" : ""
                                  } flex items-center justify-center  ${
                                    value ? "border-blue-100" : "border-red-100"
                                  }`}
                                >
                                  {value ? (
                               <img src={TicIcon} alt="" />
                                  ) : (
                                    <X
                                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                        value ? "text-blue-500" : "text-red-500"
                                      }`}
                                    />
                                  )}
                                </div>
                                <span className="text-xs sm:text-sm text-gray-600">
                                  {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div className="mt-6 ">
                        <div
                          className={`${
                            application.status === "Pending Payment"
                              ? "bg-green-100 border-blue-100 border"
                              : application.status === "Approved"
                              ? "bg-blue-50 border-blue-100 border"
                              : application.statusMessage.cardBg +
                                " " +
                                application.statusMessage.borderColor +
                                " border"
                          } rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6`}
                        >
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            {/* Icon container for all statuses */}
                            {application.status !== "refunded" && (
                              <div
                                className={`h-10 w-10 sm:h-12 sm:w-12 ${
                                  application.status === "Pending Payment"
                                    ? "bg-green-200"
                                    : application.status === "Submitted" || application.status === "submitting"
                                    ? "bg-blue-100"
                                    : application.status === "Approved"
                                    ? "bg-blue-100"
                                    : application.statusMessage.iconBg
                                } rounded-lg sm:rounded-xl flex items-center justify-center`}
                              >
                                {typeof application.statusMessage.icon ===
                                "string" ? (
                                  <img
                                    src={application.statusMessage.icon}
                                    alt=""
                                    className="h-6 w-6"
                                  />
                                ) : (
                                  <div
                                    className={`${
                                      application.status === "Pending Payment"
                                        ? "text-green-500"
                                        : application.status === "Submitted" || application.status === "submitting"
                                        ? "text-orange-500"
                                        : application.status === "Approved"
                                        ? "text-yellow-500"
                                        : application.statusMessage.iconColor
                                    }`}
                                  >
                                    {application.status === "Approved" && (
                                      <Shield className="h-6 w-6" />
                                    )}
                                    {application.status === "Rejected" && (
                                      <X className="h-6 w-6" />
                                    )}
                                    {application.status === "Pending Payment" && (
                                      <Shield className="h-6 w-6" />
                                    )}
                                    {(application.status === "submitted" || application.status === "submitting") && (
                                      <span className="text-lg font-bold">!</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                            <div>
                              <h4
                                className={`font-medium ${
                                  application.status === "pending"
                                    ? "text-blue-500"
                                    : application.statusMessage.iconColor
                                } text-base sm:text-lg`}
                              >
                                {application.status === "Pending Payment"
                                  ? "Your application is being processed"
                                  : application.statusMessage.title}
                              </h4>
                              {application.status === "Approved" && (
                                <div className="text-xs bg-green-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mt-1 inline-flex items-center gap-1">
                                  <img src={True} alt="" className="h-3 w-3" />
                                  Before Time
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          {(application.statusMessage.description ||
                            application.status === "Pending Payment") && (
                            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                              {application.status === "Pending Payment"
                                ? "We are reviewing your application. This usually takes 2-3 business days."
                                : application.statusMessage.description}
                            </p>
                          )}

                          {/* Delivery status */}
                          {application.status === "Pending Payment" && (
                            <div className="mt-2">
                              <span className="text-xs sm:text-sm text-gray-600">
                                Yet to be delivered
                              </span>
                            </div>
                          )}

                          {/* Dates for rejected */}
                          {application.status === "Rejected" && (
                            <div className="mt-3 sm:mt-4 space-y-1 text-xs sm:text-sm text-gray-600">
                              <p className="flex justify-between">
                                <span>Estimated on:</span>
                                <span>{new Date(application.expectedVisaApprovalDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              </p>
                              <p className="flex justify-between">
                                <span>Delivery on:</span>
                                <span>{new Date(application.deliveredDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              </p>
                            </div>
                          )}
                          {application.status === "Submitted" && (
                            <div className="mt-3 sm:mt-4 space-y-1 text-xs sm:text-sm text-gray-600">
                              <p className="flex justify-between">
                                <span>Estimated on:</span>
                                <span>{new Date(application.expectedVisaApprovalDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              </p>
                              <p className="flex justify-between">
                                <span>Delivery on:</span>
                                <span>{new Date(application.deliveredDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              </p>
                            </div>
                          )}


                          {/* No dates shown for refunded applications */}
                        </div>

                        {/* Buttons */}
                        <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 grid grid-cols-1">
                          <button 
                            onClick={() => {
                              console.log("Mobile view button clicked");
                              openPassportPopup(application);
                            }}
                            className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleDownloadInvoice(application)}
                            className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Invoice
                          </button>
                          <button 
                            onClick={() => handleDownloadInsurance(application)}
                            className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Download Insurance
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isPopupOpen && selectedPassport && (
        <PassportPopup
          isOpen={isPopupOpen}
          onClose={() => {
            console.log("Closing popup");
            setIsPopupOpen(false);
          }}
          passportData={selectedPassport}
        />
      )}
    </div>
  );
};

export default Ticket;
