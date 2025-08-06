import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/header";
import { FrontPassportForm } from "./passportFrontForm";
import { BackPassportForm } from "./passportBackForm";
import { SearchInputText, SearchInputDate } from "../../components/searchInput";
import File from "../../components/file";
import { useLocation, useNavigate } from "react-router-dom";
import { SingleSelect } from "../../components/dropdown";
import { FlightHotelBooking } from "./FlightHotalBooking";

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

  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPassport, setSelectedPassport] = useState("");
  const [passports, setPassports] = useState([]);
  const [visaFields, setVisaFields] = useState([]);
  
  // Destructure with default empty object to prevent errors if state is undefined
  const { 
    purpose = '', 
    price = '', 
    title = '', 
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
      _id: "travellerPhoto",
      type: "file",
      placeholder: "Traveller Photo",
      name: "travellerPhoto",
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
    
    if (visaId) {
      fetchVisaFields();
    }
  }, [visaId, presetFields]);



  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [travelerPhoto] = useState(null);
  const [flightTicket, setFlightTicket] = useState(null);
  const [hotelBooking, setHotelBooking] = useState(null);
  const [applicationType, setApplicationType] = useState("individual");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({});
  
  const [groupName, setGroupName] = useState("");

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
      setIsNarrowScreen(window.innerWidth < 880);
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
        setSelectedPassport(selectedValue); 
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

  // Fixed submit handler - matches DynamicForm expected signature
  const handleSubmit = useCallback(async (formDataObj, formDataRegular, isGroupSubmit = false) => {
    try {
      console.log("Submitting visa application:", { formDataObj, formDataRegular, isGroupSubmit });
      
      if (isGroup || isGroupSubmit) {
        // Group submission - process each traveler
        const processedTravelerIds = [];
        
        // Process each traveler
        for (let i = 0; i < travelers.length; i++) {
          const traveler = travelers[i];
          let travellerId = traveler.selectedPassport;
          
          // If no passport is selected but passport data is provided, create new traveller
          if (!traveler.selectedPassport && traveler.formData) {
            const passportData = new FormData();
            
            // Add passport fields to create new traveller
            const passportFields = [
              'passportNumber', 'firstName', 'lastName', 'nationality', 'sex', 
              'dob', 'placeOfBirth', 'placeOfIssue', 'maritalStatus', 'dateOfIssue', 
              'dateOfExpiry', 'fathersName', 'mothersName'
            ];
            
                      passportFields.forEach(field => {
            if (traveler.formData[field]) {
              let value = traveler.formData[field];
              
              // Map sex values to backend format
              if (field === 'sex') {
                if (value === 'Male') value = 'M';
                else if (value === 'Female') value = 'F';
                else if (value === 'Other') value = 'M'; // Default to M for Other
              }
              
              passportData.append(field, value);
            }
          });
            
            // Add passport images if available
            if (traveler.formData.passportImageFront) {
              passportData.append("passportImageFront", traveler.formData.passportImageFront);
            }
            if (traveler.formData.passportImageBack) {
              passportData.append("passportImageBack", traveler.formData.passportImageBack);
            }
            if (traveler.formData.travellerPhoto) {
              passportData.append("travellerPhoto", traveler.formData.travellerPhoto);
            }
            console.log("Group - Sending passport data:", passportData);
            console.log("Group - Traveler form data:", traveler.formData);
            
            try {
              const travellerResponse = await instance.post("/traveller-information", passportData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              
              travellerId = travellerResponse.data.data._id;
              console.log(`Created new traveller ${i + 1}:`, travellerId);
            } catch (error) {
              console.error(`Error creating traveller ${i + 1}:`, error);
              alert(`Failed to create traveller ${i + 1} information. Please try again.`);
              return;
            }
          }
          
          processedTravelerIds.push(travellerId);
        }
        
        // Create group visa application FormData
        const data = new FormData();
        
        data.append("travellerInformation", JSON.stringify(processedTravelerIds));
        data.append("visaFor", "Group");
        data.append("groupName", groupName);
        
        // Add files for each traveler (only if not already uploaded with passport)
        travelers.forEach((traveler, index) => {
          if (traveler.travelerPhoto && !traveler.formData?.travellerPhoto) {
            data.append(`travelerPhotos[${index}]`, traveler.travelerPhoto);
          }
        });
        
        if (flightTicket) {
          data.append("flightTicket", flightTicket);
        }
        if (hotelBooking) {
          data.append("hotelBooking", hotelBooking);
        }
        
        data.append("purpose", purpose);
        data.append("price", price);
        data.append("toCountry", toCountry);
        data.append("fromCountry", fromCountry);
        data.append("travelDateFrom", travelDate);
        data.append("travelDateTo", returnDate);
        data.append("dateOfApply", new Date().toISOString());
        data.append("status", "Submitted");
        
        // For group applications, collect visa form data from each traveler
        // Each traveler has their own visa form data
        const visaFormDataArray = [];
        travelers.forEach((traveler, index) => {
          const travelerVisaFormData = {};
          if (traveler.formData) {
            visaFields.forEach((field) => {
              if (traveler.formData[field.name]) {
                // Exclude passport fields and files from visa form data
                const excludeFields = [
                  'passportNumber', 'firstName', 'lastName', 'nationality', 'sex', 
                  'dob', 'placeOfBirth', 'placeOfIssue', 'maritalStatus', 'dateOfIssue', 
                  'dateOfExpiry', 'fathersName', 'mothersName', 'passportImageFront', 
                  'passportImageBack', 'travellerPhoto', 'travellerInformation'
                ];
                if (!excludeFields.includes(field.name)) {
                  travelerVisaFormData[field.name] = traveler.formData[field.name];
                }
              }
            });
          }
          visaFormDataArray.push(travelerVisaFormData);
        });
        data.append("visaFormData", JSON.stringify(visaFormDataArray));
        data.append("visaId", visaId);
        
        const response = await instance.post("/visa-application/group-visa-application", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        console.log("Group submission response:", response.data);
        alert("Group visa applications submitted successfully!");
        
      } else {
        // Individual submission
        let travellerId = selectedPassport;
        
        // If no passport is selected but passport data is provided, create new traveller
        if (!selectedPassport && formDataRegular) {
          const passportData = new FormData();
          
          // Add passport fields to create new traveller
          const passportFields = [
            'passportNumber', 'firstName', 'lastName', 'nationality', 'sex', 
            'dob', 'placeOfBirth', 'placeOfIssue', 'maritalStatus', 'dateOfIssue', 
            'dateOfExpiry', 'fathersName', 'mothersName'
          ];
          
          passportFields.forEach(field => {
            if (formDataRegular[field]) {
              let value = formDataRegular[field];
              
              // Map sex values to backend format
              if (field === 'sex') {
                if (value === 'Male') value = 'M';
                else if (value === 'Female') value = 'F';
                else if (value === 'Other') value = 'M'; // Default to M for Other
              }
              
              passportData.append(field, value);
            }
          });
          
          // Add passport images if available
          if (formDataRegular.passportImageFront) {
            passportData.append("passportImageFront", formDataRegular.passportImageFront);
          }
          if (formDataRegular.passportImageBack) {
            passportData.append("passportImageBack", formDataRegular.passportImageBack);
          }
          if (formDataRegular.travellerPhoto) {
            passportData.append("travellerPhoto", formDataRegular.travellerPhoto);
          }

          console.log("Individual - Sending passport data:", passportData);
          console.log("Individual - Form data:", formDataRegular);
          
          try {
            const travellerResponse = await instance.post("/traveller-information", passportData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            
            travellerId = travellerResponse.data.data._id;
            console.log("Created new traveller:", travellerId);
          } catch (error) {
            console.error("Error creating traveller:", error);
            alert("Failed to create traveller information. Please try again.");
            return;
          }
        }
        
        // Create visa application FormData
        const data = new FormData();
        
        // Add traveller ID
        data.append("travellerInformation", travellerId);
        
        // Add required visa application fields
        data.append("purpose", purpose);
        data.append("price", price);
        data.append("toCountry", toCountry);
        data.append("fromCountry", fromCountry);
        data.append("travelDateFrom", travelDate);
        data.append("travelDateTo", returnDate);
        data.append("dateOfApply", new Date().toISOString());
        data.append("status", "Submitted");
        data.append("visaFor", "Individual");
        
        // Add files (only if not already uploaded with passport)
        if (travelerPhoto && !formDataRegular?.travellerPhoto) {
          data.append("travelerPhoto", travelerPhoto);
        }
        if (flightTicket) {
          data.append("roundTripFlightTicket", flightTicket);
        }
        if (hotelBooking) {
          data.append("hotelBooking", hotelBooking);
        }
        
        // Append only dynamic visa form fields (not predefined model fields)
        const visaFormData = {};
        visaFields.forEach((field) => {
          if (formDataRegular && formDataRegular[field.name]) {
            // Exclude passport fields and files from visa form data
            const excludeFields = [
              'passportNumber', 'firstName', 'lastName', 'nationality', 'sex', 
              'dob', 'placeOfBirth', 'placeOfIssue', 'maritalStatus', 'dateOfIssue', 
              'dateOfExpiry', 'fathersName', 'mothersName', 'passportImageFront', 
              'passportImageBack', 'travellerPhoto'
            ];
            if (!excludeFields.includes(field.name)) {
              visaFormData[field.name] = formDataRegular[field.name];
            }
          }
        });
        data.append("visaFormData", JSON.stringify(visaFormData));
        data.append("visaId", visaId);
        
        const response = await instance.post("/visa-application", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        console.log("Individual submission response:", response.data);
        alert("Visa application submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting visa application:", error);
      alert("Failed to submit visa application. Please try again.");
    }
  }, [travelers, selectedPassport, travelerPhoto, flightTicket, hotelBooking, purpose, price, toCountry, fromCountry, travelDate, returnDate, visaFields, groupName, isGroup]);

  // Separate handler for group submit
  const handleGroupSubmit = useCallback(() => {
    // Call handleSubmit with the correct signature for group submission
    handleSubmit(null, null, true);
  }, [handleSubmit]);

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
                  placeholder={"Enter Group Name"}
                  label={"Group Name"}
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
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
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelVisaBooking;