import React from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Briefcase,
  Heart,
  Plane,
  ArrowRight,
  Shield,
  X
} from "lucide-react";

const Ticket = ({ approvedApplication, refuntApplication, rejectedApplication }) => {
  // Create an array of applications, filtering out undefined ones
  const applicationData = [
    approvedApplication, 
    refuntApplication, 
    rejectedApplication
  ].filter(app => app !== undefined);

  const getStatusBarColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-blue-500";
      case "rejected":
        return "bg-red-500";
      case "refunded":
        return "bg-orange-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="w-full">
      <main className="w-full px-4 sm:px-6 py-2">
        <div className="flex flex-col gap-3">
          <div className="flex-1">
            {applicationData.map((application, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] mb-6 overflow-hidden shadow-sm"
              >
                <div className="flex w-full">
                  <div className={`relative w-[8px] sm:w-[12px] md:w-[20px] ${getStatusBarColor(application.status)} flex-shrink-0`}></div>

                  <div className="flex flex-col w-full p-3 sm:p-5">
                    {/* Desktop layout (lg and above) */}
                    <div className="hidden lg:flex lg:flex-row lg:justify-between lg:gap-4 lg:w-full">
                      {/* Personal Information Section */}
                      <div className="flex flex-col p-2 flex-grow">
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
                            ([key, value], idx) => (
                              <div
                                key={key}
                                className="flex items-center space-x-3 relative"
                              >
                                <div
                                  className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full ${
                                    value ? "bg-blue-50" : "bg-red-50"
                                  } flex items-center justify-center z-10 border ${
                                    value ? "border-blue-100" : "border-red-100"
                                  }`}
                                >
                                  {value ? (
                                    <svg
                                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                        value ? "text-blue-500" : "text-red-500"
                                      }`}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
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

                      {/* Status Card Section */}
                      <div className="flex-shrink-0 w-72">
                        <div
                          className={`${application.statusMessage.cardBg} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 ${application.statusMessage.borderColor} border`}
                        >
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div
                              className={`h-10 w-10 sm:h-12 sm:w-12 ${application.statusMessage.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center`}
                            >
                              {typeof application.statusMessage.icon === 'string' ? (
                                <img src={application.statusMessage.icon} alt="" className="h-6 w-6" />
                              ) : (
                                <div className={`${application.statusMessage.iconColor}`}>
                                  {application.status === "approved" && <Shield className="h-6 w-6" />}
                                  {(application.status === "rejected" || application.status === "refunded") && <X className="h-6 w-6" />}
                                </div>
                              )}
                            </div>
                            <div>
                              <h4
                                className={`font-medium ${application.statusMessage.iconColor} text-base sm:text-lg`}
                              >
                                {application.statusMessage.title}
                              </h4>
                              {application.status === "rejected" && (
                                <div className="text-xs bg-red-100 text-red-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mt-1 inline-block">
                                  Before Time
                                </div>
                              )}
                            </div>
                          </div>
                          {application.statusMessage.description && (
                            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                              {application.statusMessage.description}
                            </p>
                          )}
                          {application.statusMessage.reason && (
                            <div className="mt-2">
                              <span className="text-xs sm:text-sm font-medium text-gray-700">
                                Reason for refund:{" "}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-600">
                                {application.statusMessage.reason}
                              </span>
                            </div>
                          )}
                          {application.status === "rejected" && (
                            <div className="mt-3 sm:mt-4 space-y-1 text-xs sm:text-sm text-gray-600">
                              <p className="flex justify-between">
                                <span>Estimated on:</span>
                                <span>Mar 4, 2025</span>
                              </p>
                              <p className="flex justify-between">
                                <span>Delivery on:</span>
                                <span>Mar 4, 2025</span>
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 grid grid-cols-1">
                          <button className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50">
                            View Application
                          </button>
                          <button className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Invoice
                          </button>
                          <button className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50">
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
                            ([key, value], idx) => (
                              <div
                                key={key}
                                className="flex items-center space-x-3 relative"
                              >
                                <div
                                  className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full ${
                                    value ? "bg-blue-50" : "bg-red-50"
                                  } flex items-center justify-center z-10 border ${
                                    value ? "border-blue-100" : "border-red-100"
                                  }`}
                                >
                                  {value ? (
                                    <svg
                                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                        value ? "text-blue-500" : "text-red-500"
                                      }`}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
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

                      {/* Status Card Section */}
                      <div className="mt-6">
                        <div
                          className={`${application.statusMessage.cardBg} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 ${application.statusMessage.borderColor} border`}
                        >
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div
                              className={`h-10 w-10 sm:h-12 sm:w-12 ${application.statusMessage.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center`}
                            >
                              {typeof application.statusMessage.icon === 'string' ? (
                                <img src={application.statusMessage.icon} alt="" className="h-6 w-6" />
                              ) : (
                                <div className={`${application.statusMessage.iconColor}`}>
                                  {application.status === "approved" && <Shield className="h-6 w-6" />}
                                  {(application.status === "rejected" || application.status === "refunded") && <X className="h-6 w-6" />}
                                </div>
                              )}
                            </div>
                            <div>
                              <h4
                                className={`font-medium ${application.statusMessage.iconColor} text-base sm:text-lg`}
                              >
                                {application.statusMessage.title}
                              </h4>
                              {application.status === "rejected" && (
                                <div className="text-xs bg-red-100 text-red-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full mt-1 inline-block">
                                  Before Time
                                </div>
                              )}
                            </div>
                          </div>
                          {application.statusMessage.description && (
                            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                              {application.statusMessage.description}
                            </p>
                          )}
                          {application.statusMessage.reason && (
                            <div className="mt-2">
                              <span className="text-xs sm:text-sm font-medium text-gray-700">
                                Reason for refund:{" "}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-600">
                                {application.statusMessage.reason}
                              </span>
                            </div>
                          )}
                          {application.status === "rejected" && (
                            <div className="mt-3 sm:mt-4 space-y-1 text-xs sm:text-sm text-gray-600">
                              <p className="flex justify-between">
                                <span>Estimated on:</span>
                                <span>Mar 4, 2025</span>
                              </p>
                              <p className="flex justify-between">
                                <span>Delivery on:</span>
                                <span>Mar 4, 2025</span>
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 grid grid-cols-1">
                          <button className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50">
                            View Application
                          </button>
                          <button className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Invoice
                          </button>
                          <button className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50">
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
    </div>
  );
};

export default Ticket;