import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../components/header";
import { FrontPassportForm } from "./passportFrontForm";
import { BackPassportForm } from "./passportBackForm";
import { SearchInputText, SearchInputDate } from "../../components/searchInput";
import File from "../../components/file";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { SingleSelect } from "../../components/dropdown";
import { FlightHotelBooking } from "./FlightHotalBooking";
import { UploadTravelerPhoto } from "./travelBooking";
import {
  Flight,
  Home,
  CalenderUp,
  CalenderDown,
  MainBackground,
  UserAdd,
  Saveline,
} from "../../assets";
import {
  Upload,
  Info,
  Clock,
  X,
  Edit2,
  Crop,
  RotateCw,
  FlipHorizontal2,
} from "lucide-react";
import Input from "../../components/input";
import { CustomSelect } from "../../components/dropdown";
import { CustomDatePicker, FullCalendar } from "../../components/calender";
import SideBar from "./sideBar";
import instance from "../../instance";
import DynamicForm from "../../components/dynamicForm";

const TravelVisaBooking = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPassport, setSelectedPassport] = useState("");
  const [passports, setPassports] = useState([]);
  const [visaFields, setVisaFields] = useState([]);
  
  // Destructure with default empty object to prevent errors if state is undefined
  const { 
    purpose = '', 
    price = '', 
    currency = '', 
    title = '', 
    details = '', 
    fromCountry = '', 
    toCountry = '', 
    travelDate = '', 
    returnDate = '' ,
    visaId = ''
  } = location.state || {};

  // Validation useEffect with proper dependencies
  useEffect(() => {
    console.log(fromCountry, toCountry, travelDate, returnDate, purpose, price, visaId, "fromCountry, toCountry, travelDate, returnDate, purpose, price, visaId ");
    if (!fromCountry || !toCountry || !travelDate || !returnDate || !purpose || !price) {
      navigate("/");
    }
  }, []); // Remove dependencies to prevent re-navigation loops

  // Fetch passports only once on mount
  useEffect(() => {
    const fetchPassports = async () => {
      try {
        const response = await instance.get('/traveller-information/select');
        console.log(response.data, "response.data");
        setPassports(response.data);
      } catch (error) {
        console.error('Error fetching passports:', error);
      }
    };
    fetchPassports();
  }, []);

  // Memoize preset fields to prevent recreation on every render
  const presetFields = useCallback(() => [
    {
      _id: "passportNumber",
      type: "text",
      placeholder: "Passport Number",
      name: "passportNumber",
      validation: "",
      default: "",
      label: "Passport Number",
      required: true,
    },
    {
      _id: "firstName",
      type: "text",
      placeholder: "First Name",
      name: "firstName",
      label: "First Name",
      required: true,
    },
    {
      _id: "lastName",
      type: "text",
      placeholder: "Last Name",
      name: "lastName",
      label: "Last Name",
      required: true,
    },
    {
      _id: "nationality",
      type: "text",
      placeholder: "Nationality",
      name: "nationality",
      label: "Nationality",
      required: true,
    },
    {
      _id: "sex",
      type: "select",
      placeholder: "Sex",
      name: "sex",
      label: "Sex",
      required: true,
      options: ["Male", "Female", "Other"],
    },
    {
      _id: "dob",
      type: "date",
      placeholder: "Date of Birth",
      name: "dob",
      label: "Date of Birth",
      required: true,
    },
    {
      _id: "placeOfBirth",
      type: "text",
      placeholder: "Place of Birth",
      name: "placeOfBirth",
      label: "Place of Birth",
      required: true,
    },
    {
      _id: "placeOfIssue",
      type: "text",
      placeholder: "Place of Issue",
      name: "placeOfIssue",
      label: "Place of Issue",
      required: true,
    },
    {
      _id: "maritalStatus",
      type: "select",
      placeholder: "Marital Status",
      name: "maritalStatus",
      label: "Marital Status",
      required: true,
      options: ["Single", "Married", "Divorced", "Widowed"],
    },
    {
      _id: "dateOfIssue",
      type: "date",
      placeholder: "Date of Issue",
      name: "dateOfIssue",
      label: "Date of Issue",
      required: true,
    },
    {
      _id: "dateOfExpiry",
      type: "date",
      placeholder: "Date of Expiry",
      name: "dateOfExpiry",
      label: "Date of Expiry",
      required: true,
    },
    {
      _id: "fathersName",
      type: "text",
      placeholder: "Father's Name",
      name: "fathersName",
      label: "Father's Name",
      required: false,
    },
    {
      _id: "mothersName",
      type: "text",
      placeholder: "Mother's Name",
      name: "mothersName",
      label: "Mother's Name",
      required: false,
    },
    {
      _id: "travelerPhoto",
      type: "file",
      placeholder: "Traveller Photo",
      name: "travelerPhoto",
      label: "Traveler Photo",
      required: false,
    }
  ], []);
  
  // Fetch visa fields when dependencies change
  useEffect(() => {
    const fetchVisaFields = async () => {
      try {
        const response = await instance.get(`/visa-form-fields?visa=${visaId}`);
        console.log(response.data, "response.data");
        
        const fields = [
          {
            _id: "travelerInfoSection",
            type: "section",
            label: "Traveller Information",
          },
          {
            _id: "travellerInformation",
            type: "select",
            placeholder: "Passport Image",
            name: "travellerInformation",
            validation: "",
            default: "",
            label: "Select Traveller",
            apiType: "JSON",
            selectApi: passports,
          },
          {
            _id: "passportImageFront",
            type: "file",
            placeholder: "Passport Front Image",
            name: "passportImageFront",
            validation: "",
            default: "",
            label: "Passport Front Image",
            required: false,
          },
          {
            _id: "passportImageBack",
            type: "file",
            placeholder: "Passport Back Image",
            name: "passportImageBack",
            validation: "",
            default: "",
            label: "Passport Back Image",
            required: false,
          },
          ...presetFields(),
          {
            _id: "visaInfoSection",
            type: "section",
            label: "Visa Information",
          }, 
          ...response.data.response
        ];
        
        setVisaFields(fields);
      } catch (error) {
        console.error('Error fetching visa fields:', error);
      }
    };
    
    if (visaId && passports.length > 0) {
      fetchVisaFields();
    }
  }, [visaId, passports.length, presetFields]);

  const citizenInputRef = useRef(null);
  const goingToInputRef = useRef(null);

  const [frontImage, setFrontImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [goingToIsFocused, setGoingToIsFocused] = useState(false);
  const [TravellingDateFocused, setTravellingDateFocused] = useState(false);
  const [TravellingDateEndFocused, setTravellingDateEndFocused] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [travelerPhoto, setTravelerPhoto] = useState(null);
  const [flightTicket, setFlightTicket] = useState(null);
  const [hotelBooking, setHotelBooking] = useState(null);
  const [applicationType, setApplicationType] = useState("individual");
  const [visaType, setVisaType] = useState(purpose || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  
  const [documents, setDocuments] = useState({
    flightTicket: null,
    hotelBooking: null,
  });

  // Initialize travelers state with proper structure
  const [travelers, setTravelers] = useState([
    {
      id: 0,
      formData: {
        travellerInformation: "",
        passportNumber: "",
        firstName: "",
        lastName: "",
        nationality: "",
        sex: "",
        dob: "",
        placeOfBirth: "",
        placeOfIssue: "",
        maritalStatus: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        fathersName: "",
        mothersName: "",
        travelerPhoto: null,
      },
      frontImage: null,
      previewUrl: null,
      travelerPhoto: null,
      selectedPassport: "",
    }
  ]);

  const visaOptions = [purpose];

  // Handle resize effect
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
      setIsNarrowScreen(window.innerWidth < 880);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cleanup passport IDs when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem("currentPassportId");
      // Clean up group passport IDs
      travelers.forEach((_, index) => {
        localStorage.removeItem(`currentPassportId_${index}`);
      });
    };
  }, [travelers.length]);

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };

  const handleGoingToIconClick = () => {
    goingToInputRef.current.focus();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileChangeTicketBooking = (type, file) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const handleSubmitTicketBooking = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("travellerInformation", "travelerId");
    formData.append("visaFor", "Individual");
    formData.append("visaType", visaType);
    formData.append("visaCountry", "destination");
    formData.append("travelDateFrom", travelDate);
    formData.append("travelDateTo", returnDate);
    formData.append("dateOfApply", new Date().toISOString());
    formData.append("status", "Submitted");
    formData.append("applicationDetails", "Application Complete");

    if (documents.flightTicket) {
      formData.append("roundTripFlightTicket", documents.flightTicket);
    }
    if (documents.hotelBooking) {
      formData.append("hotelBooking", documents.hotelBooking);
    }
  };

  // Fixed passport selection handler for DynamicForm
  const handlePassportSelection = useCallback(async (fieldName, selectedValue, newFormData) => {
    if (fieldName === 'travellerInformation' && selectedValue) {
      try {
        const response = await instance.get(`/traveller-information?id=${selectedValue}`);
        const travelerData = response.data.response;

        const updatedFormData = {
          ...newFormData,
          passportNumber: travelerData.passportNumber || '',
          firstName: travelerData.firstName || '',
          lastName: travelerData.lastName || '',
          nationality: travelerData.nationality || '',
          sex: travelerData.sex || '',
          dob: travelerData.dateOfBirth ? travelerData.dateOfBirth.split('T')[0] : '',
          placeOfBirth: travelerData.placeOfBirth || '',
          placeOfIssue: travelerData.placeOfIssue || '',
          maritalStatus: travelerData.maritalStatus || '',
          dateOfIssue: travelerData.dateOfIssue ? travelerData.dateOfIssue.split('T')[0] : '',
          dateOfExpiry: travelerData.dateOfExpiry ? travelerData.dateOfExpiry.split('T')[0] : '',
          fathersName: travelerData.fathersName || '',
          mothersName: travelerData.mothersName || '',
        };

        setFormData(updatedFormData);
      } catch (error) {
        console.error('Error fetching traveler information:', error);
        alert('Failed to fetch traveler information');
      }
    }
  }, []);

  // Fixed traveler change handler for group mode
  const handleTravelerChange = useCallback(async (index, fieldName, value, newFormData) => {
    if (index === 'add') {
      // Add new traveler
      const newTraveler = {
        id: travelers.length,
        formData: {
          travellerInformation: "",
          passportNumber: "",
          firstName: "",
          lastName: "",
          nationality: "",
          sex: "",
          dob: "",
          placeOfBirth: "",
          placeOfIssue: "",
          maritalStatus: "",
          dateOfIssue: "",
          dateOfExpiry: "",
          fathersName: "",
          mothersName: "",
          travelerPhoto: null,
        },
        frontImage: null,
        previewUrl: null,
        travelerPhoto: null,
        selectedPassport: "",
      };
      setTravelers(prev => [...prev, newTraveler]);
    } else {
      // Update existing traveler
      setTravelers(prevTravelers => {
        const newTravelers = [...prevTravelers];
        if (newTravelers[index]) {
          // Handle passport selection in group mode
          if (fieldName === 'travellerInformation' && value) {
            try {
              // Fetch traveler information using the selected passport ID
              instance.get(`/traveller-information?id=${value}`)
                .then(response => {
                  const travelerData = response.data.response;
                  
                  setTravelers(currentTravelers => {
                    const updatedTravelers = [...currentTravelers];
                    updatedTravelers[index] = {
                      ...updatedTravelers[index],
                      selectedPassport: value,
                      formData: {
                        ...newFormData,
                        passportNumber: travelerData.passportNumber || '',
                        firstName: travelerData.firstName || '',
                        lastName: travelerData.lastName || '',
                        nationality: travelerData.nationality || '',
                        sex: travelerData.sex || '',
                        dob: travelerData.dateOfBirth ? travelerData.dateOfBirth.split('T')[0] : '',
                        placeOfBirth: travelerData.placeOfBirth || '',
                        placeOfIssue: travelerData.placeOfIssue || '',
                        maritalStatus: travelerData.maritalStatus || '',
                        dateOfIssue: travelerData.dateOfIssue ? travelerData.dateOfIssue.split('T')[0] : '',
                        dateOfExpiry: travelerData.dateOfExpiry ? travelerData.dateOfExpiry.split('T')[0] : '',
                        fathersName: travelerData.fathersName || '',
                        mothersName: travelerData.mothersName || '',
                      }
                    };
                    return updatedTravelers;
                  });
                })
                .catch(error => {
                  console.error('Error fetching traveler information:', error);
                  alert('Failed to fetch traveler information');
                });
            } catch (error) {
              console.error('Error fetching traveler information:', error);
              alert('Failed to fetch traveler information');
            }
          } else {
            // For other field changes, just update the form data
            newTravelers[index] = {
              ...newTravelers[index],
              formData: newFormData
            };
          }
        }
        return newTravelers;
      });
    }
  }, [travelers.length]);

  // Fixed submit handler
  const handleSubmit = useCallback(async (formDataObj, formDataRegular, isGroupSubmit = false) => {
    try {
      console.log(formDataObj, "formDataObj");
      console.log(formDataRegular, "formData");
      
      if (isGroup || isGroupSubmit) {
        // Group submission - process all travelers
        const submissionResults = await Promise.all(travelers.map(async (traveler) => {
          let travelerId = '';
          
          if (!traveler.selectedPassport) {
            // Create new traveler information
            const passportInfo = new FormData();
            
            // Add form data to passport info
            Object.entries(traveler.formData).forEach(([key, value]) => {
              if (value !== null && value !== undefined && value !== '') {
                passportInfo.append(key, value);
              }
            });

            if (traveler.frontImage) {
              passportInfo.append("passportImageFront", traveler.frontImage);
            }
            if (traveler.previewUrl) {
              passportInfo.append("passportImageBack", traveler.previewUrl);
            }

            const travelerResponse = await instance.post(
              "/traveller-information",
              passportInfo,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            );

            travelerId = travelerResponse.data.data._id;
          } else {
            travelerId = traveler.selectedPassport;
          }

          // Create visa application for each traveler
          const visaFormData = new FormData();
          visaFormData.append("travellerInformation", travelerId);
          visaFormData.append("purpose", purpose);
          visaFormData.append("price", price);
          visaFormData.append("toCountry", toCountry);
          visaFormData.append("fromCountry", fromCountry);
          visaFormData.append("travelDateFrom", travelDate);
          visaFormData.append("travelDateTo", returnDate);
          visaFormData.append("dateOfApply", new Date().toISOString());
          visaFormData.append("status", "Submitted");

          if (traveler.travelerPhoto) {
            visaFormData.append("travelerPhoto", traveler.travelerPhoto);
          }
          
          // Uncomment when ready to submit
          // return instance.post("/visa-application", visaFormData, {
          //   headers: {
          //     'Content-Type': 'multipart/form-data'
          //   }
          // });
          
          return true;
        }));

        alert("All visa applications submitted successfully!");
      } else {
        // Individual submission
        const visaFormData = new FormData();
        
        // Add all form fields to FormData
        Object.keys(formDataRegular).forEach(key => {
          const value = formDataRegular[key];
          if (value !== null && value !== undefined && value !== '') {
            if (value instanceof File) {
              visaFormData.append(key, value);
            } else {
              visaFormData.append(key, value.toString());
            }
          }
        });
        
        visaFormData.append("purpose", purpose);
        visaFormData.append("price", price);
        visaFormData.append("toCountry", toCountry);
        visaFormData.append("fromCountry", fromCountry);
        visaFormData.append("travelDateFrom", travelDate);
        visaFormData.append("travelDateTo", returnDate);
        visaFormData.append("dateOfApply", new Date().toISOString());
        visaFormData.append("status", "Submitted");
        
        // Uncomment when ready to submit
        // const response = await instance.post("/visa-application", visaFormData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // });
        
        alert("Visa application submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting visa applications:", error);
      alert("Failed to submit visa applications. Please try again.");
    }
  }, [travelers, isGroup, purpose, price, toCountry, fromCountry, travelDate, returnDate]);

  // Separate handler for group submit
  const handleGroupSubmit = useCallback(() => {
    const groupFormData = travelers.map((traveler) => traveler.formData);
    console.log("Group submission data:", groupFormData);
    handleSubmit(null, null, true);
  }, [handleSubmit, travelers]);

  const UploadForm = () => {
    const Visa = [
      { value: purpose, label: purpose },
    ];

    return (
      <>
        <div className="w-full p-6 rounded-3xl shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Are You Applying For
            </h1>
          </div>

          <div className="flex justify-end mb-6">
            <div className="rounded-xl p-1 border border-gray-300">
              <button
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                  applicationType === "individual"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setApplicationType("individual");
                  setIsGroup(false);
                }}
              >
                Individual
              </button>
              <button
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                  applicationType === "group"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setApplicationType("group");
                  setIsGroup(true);
                }}
              >
                Group
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="relative mb-4 md:mb-5">
                <CustomSelect
                  labelClass={"12px"}
                  className={"py-[11px]"}
                  placeholder={"Select Visa"}
                  label={"Visa Type"}
                  options={Visa}
                />

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {visaOptions.map((option) => (
                      <div
                        key={option}
                        className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
                        onClick={() => {
                          setVisaType(option);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <span className="block truncate text-gray-500">
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 md:mb-5">
              <Input placeholder={"Internal Id"} label={"Internal Id"} />
            </div>

            {isGroup && (
              <div className="mb-4 md:mb-5">
                <Input
                  placeholder={"Tourist Visa"}
                  label={"Group Name"}
                  required={applicationType === "group"}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const VisaInformation = () => {
    return (
      <div className="flex items-center border rounded-[26px] border-[#CDD0D5] justify-center p-4">
        <div className="w-full rounded-2xl overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-r p-5 border-[#868C98]">
                <h2 className="text-[32px] font-[600] text-gray-800 mb-4">
                  Visa Information
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-600">{title || "Visa Information"}</p>
                  <p className="text-gray-600">{purpose || "Visa Purpose"}</p>
                  <div className="mt-4">
                    <p className="text-gray-600">
                      Travelers: {isGroup ? travelers.length : 1}
                    </p>
                    <p className="text-gray-600">
                      Travel Dates: {travelDate} - {returnDate}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Expected Visa Approval
                  </h3>
                  <div className="flex items-center text-blue-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>3/7/25, if submitted now!</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-[32px] font-[600] text-gray-900 mb-8">
                  Know Before You Pay
                </h2>
                <div className="relative pl-8 space-y-12">
                  <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

                  <div className="relative">
                    <div className="absolute -left-8 mt-1.5">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Auto-validation upon submission
                      </h4>
                      <p className="mt-1 text-gray-600">
                        Atlys performs automated validation after submission. We
                        will let you know if there are any problems with the
                        application.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-8 mt-1.5">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Visa processed within 30 seconds
                      </h4>
                      <p className="mt-1 text-gray-600">
                        Atlys automatically processes your visa.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-8 mt-1.5">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Non-refundable after you pay
                      </h4>
                      <p className="mt-1 text-gray-600">
                        If canceled after payment, you will not be refunded.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-[#CDD0D5] border rounded-[21px] p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Price Details
              </h2>
              <div className="space-y-4">
                {isGroup ? (
                  travelers.map((_, index) => (
                    <div key={index} className="flex justify-between border-b pb-2 border-[#868C98] items-center">
                      <span className="text-gray-600">Traveller {index + 1}</span>
                      <span className="text-gray-800">{price || "₹0"}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-between border-b pb-2 border-[#868C98] items-center">
                    <span className="text-gray-600">Traveller 1</span>
                    <span className="text-gray-800">{price || "₹0"}</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-b pb-2 border-[#868C98] font-medium">
                  <span className="text-gray-800">Total</span>
                  <span className="text-gray-800">
                    {isGroup ? `₹${(parseInt(String(price || '0').replace('₹', '') || '0') * travelers.length)}` : (price || "₹0")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Current Wallet Balance</span>
                  <span className="text-gray-800">{price || "₹0"}</span>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="mt-6 w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg font-[400] text-[14px] hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Info className="w-4 h-4 mr-2" />
                  Select Insurance date
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${MainBackground})`,
          backgroundSize: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          width: "100%",
        }}
      >
        <Header />
        <div className="max-w-[1300px] w-full mx-auto rounded-lg">
          <div className="flex gap-5 flex-col flex-wrap justify-between md:flex-row p-5 w-full">
          </div>
          <UploadForm />
          <div className="flex mt-10">
            <div className="w-auto pr-3 mt-3 md:w-[20%]">
              <div
                className={`${
                  isNarrowScreen ? "w-[50px]" : "w-full"
                } min-w-[50px] mb-6 md:mb-0 transition-all duration-300`}
              >
                <SideBar isNarrow={isNarrowScreen} />
              </div>
            </div>
            <div className="w-full md:w-[70%] border-l border-[#bbbdc2] flex flex-col justify-center">
              <div className="md:p-5">
                {isGroup ? (
                  // Group mode - use DynamicForm with multiple travelers
                  <DynamicForm
                    attributes={visaFields}
                    formMode="double"
                    onSubmit={handleSubmit}
                    groupMode={true}
                    travelers={travelers}
                    onTravelerChange={handleTravelerChange}
                    onGroupSubmit={handleGroupSubmit}
                    className=""
                  />
                ) : (
                  // Individual mode - use DynamicForm for single traveler
                  <DynamicForm
                    attributes={visaFields}
                    formMode="double"
                    onSubmit={handleSubmit}
                    initialData={formData}
                    onFieldChange={handlePassportSelection}
                    className=""
                  />
                )}
                
                <FlightHotelBooking
                  isGroup={isGroup}
                  flightTicket={flightTicket}
                  setFlightTicket={setFlightTicket}
                  hotelBooking={hotelBooking}
                  setHotelBooking={setHotelBooking}
                />
                
                <VisaInformation />
                
                {/* Only show individual submit button when not in group mode */}
                {!isGroup && (
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => handleSubmit(null, formData, false)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Submit Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelVisaBooking;