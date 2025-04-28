import React, { useState, useEffect, useRef } from "react";
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

const TravelVisaBooking = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPassport, setSelectedPassport] = useState("");
  const [passports, setPassports] = useState([]);
  
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
    returnDate = '' 
  } = location.state || {};

  // Remove unused searchData object since we're using location.state
  useEffect(() => {
    console.log(fromCountry, toCountry, travelDate, returnDate, purpose, price, "fromCountry, toCountry, travelDate, returnDate, purpose, price");
    if (!fromCountry || !toCountry || !travelDate || !returnDate || !purpose || !price) {
      navigate("/");
    }
  }, [fromCountry, toCountry, travelDate, returnDate, purpose, price, navigate]);

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

  // useEffect(() => {
  //   const fetchPassportData = async () => {
  //     const response = await instance.get(`/traveller-information?id=${selectedPassport}`);
  //     console.log(response.data, "response.data");
  //   };
  //   if (selectedPassport) {
  //     fetchPassportData();
  //   }
  // }, [selectedPassport, passports]);

  const citizenInputRef = useRef(null);
  const goingToInputRef = useRef(null);

  const [frontImage, setFrontImage] = useState(null);
  // const [backImageUrl, setBackImageUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [goingToIsFocused, setGoingToIsFocused] = useState(false);
  const [TravellingDateFocused, setTravellingDateFocused] = useState(false);
  const [TravellingDateEndFocused, setTravellingDateEndFocused] =
    useState(false);
  // ************  hiding grp btn ************
  const [isGroup, setIsGroup] = useState(false);
  // Add state for all form data
  const [frontFormData, setFrontFormData] = useState({
    passportNumber: "",
    firstName: "",
    lastName: "",
    nationality: "",
    sex: "",
    dateOfBirth: "",
    placeOfBirth: "",
    placeOfIssue: "",
    maritalStatus: "",
    dateOfIssue: "",
    dateOfExpiry: "",
  });

  const [backFormData, setBackFormData] = useState({
    fathersName: "",
    mothersName: "",
  });

  const [travelerPhoto, setTravelerPhoto] = useState(null);
  const [flightTicket, setFlightTicket] = useState(null);
  const [hotelBooking, setHotelBooking] = useState(null);
  

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };

  const handleGoingToIconClick = () => {
    goingToInputRef.current.focus();
  };

  const [applicationType, setApplicationType] = useState("individual");
  const [visaType, setVisaType] = useState(purpose || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const visaOptions = [
   purpose
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
      setIsNarrowScreen(window.innerWidth < 880); // Set the new state based on width
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ***************passport photo*****************
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // *********************ticketBooking******************************
  const [documents, setDocuments] = useState({
    flightTicket: null,
    hotelBooking: null,
  });

  const handleFileChangeTicketBooking = (type, file) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const handleSubmitTicketBooking = async (e) => {
    e.preventDefault();
    // try {
    const formData = new FormData();
    formData.append("travellerInformation", travelerId);
    formData.append("visaFor", "Individual");
    formData.append("visaType", visaType);
    formData.append("visaCountry", destination);
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

  // Add new state for multiple travelers
  const [travelers, setTravelers] = useState([
    {
      id: 0,
      frontFormData: {
        passportNumber: "",
        firstName: "",
        lastName: "",
        nationality: "",
        sex: "",
        dateOfBirth: "",
        placeOfBirth: "",
        placeOfIssue: "",
        maritalStatus: "",
        dateOfIssue: "",
        dateOfExpiry: "",
      },
      backFormData: {
        fathersName: "",
        mothersName: "",
      },
      frontImage: null,
      previewUrl: null,
      travelerPhoto: null,
      selectedPassport: "",
    }
  ]);

  // Add function to handle adding new traveler
  const addTraveler = () => {
    setTravelers([...travelers, {
      id: travelers.length,
      frontFormData: {
        passportNumber: "",
        firstName: "",
        lastName: "",
        nationality: "",
        sex: "",
        dateOfBirth: "",
        placeOfBirth: "",
        placeOfIssue: "",
        maritalStatus: "",
        dateOfIssue: "",
        dateOfExpiry: "",
      },
      backFormData: {
        fathersName: "",
        mothersName: "",
      },
      frontImage: null,
      previewUrl: null,
      travelerPhoto: null,
      selectedPassport: "",
    }]);
  };

  // Modify handleSubmit for multiple travelers
  const handleSubmit = async () => {
    try {
      if (travelers.length > 1) {
        // Group visa application
        const travellerIds = await Promise.all(travelers.map(async (traveler) => {
          let travelerId = '';
          
          if (!traveler.selectedPassport) {
            // Create new traveler information
            const passportInfo = new FormData();
            Object.entries(traveler.frontFormData).forEach(([key, value]) => {
              passportInfo.append(key, value);
            });
            Object.entries(traveler.backFormData).forEach(([key, value]) => {
              passportInfo.append(key, value);
            });

            if (traveler.frontImage) {
              passportInfo.append("passportImageFront", traveler.frontImage);
            }
            if (traveler.previewUrl) {
              passportInfo.append("passportImageBack", traveler.previewUrl);
            }
            if (traveler.travelerPhoto) {
              passportInfo.append("travellerPhoto", traveler.travelerPhoto);
            }
            if(documents.flightTicket) {
              passportInfo.append("roundTripFlightTicket", documents.flightTicket);
            }
            if(documents.hotelBooking) {
              passportInfo.append("hotelBooking", documents.hotelBooking);
            }
            // if(traveler.flightTicket) {
            //   passportInfo.append("roundTripFlightTicket", traveler.flightTicket);
            // }
            // if(traveler.hotelBooking) {
            //   passportInfo.append("hotelBooking", traveler.hotelBooking);
            // }

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
          
          return travelerId;
        }));

        // Create group visa application
        const groupFormData = new FormData();
        groupFormData.append("travellerInformation", JSON.stringify(travellerIds));
        groupFormData.append("purpose", purpose);
        groupFormData.append("price", price);
        groupFormData.append("toCountry", toCountry);
        groupFormData.append("fromCountry", fromCountry);
        groupFormData.append("travelDateFrom", travelDate);
        groupFormData.append("travelDateTo", returnDate);
        groupFormData.append("dateOfApply", new Date().toISOString());
        groupFormData.append("status", "Submitted");
        groupFormData.append("isGroup", "true");

        // Add traveler photos for each traveler
        travelers.forEach((traveler, index) => {
          if (traveler.travelerPhoto) {
            groupFormData.append(`travelerPhotos[${index}]`, traveler.travelerPhoto);
          }
        });

        // Add flight and hotel booking documents
        if (flightTicket) {
          groupFormData.append("flightTicket", flightTicket);
        }
        if (hotelBooking) {
          groupFormData.append("hotelBooking", hotelBooking);
        }

        // Call group visa application endpoint
        await instance.post("/visa-application/group-visa-application", groupFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

      } else {
        // Original single traveler logic
        const submissionResults = await Promise.all(travelers.map(async (traveler) => {
          let travelerId = '';
          
          if (!traveler.selectedPassport) {
            // Create new traveler information
            const passportInfo = new FormData();
            Object.entries(traveler.frontFormData).forEach(([key, value]) => {
              passportInfo.append(key, value);
            });
            Object.entries(traveler.backFormData).forEach(([key, value]) => {
              passportInfo.append(key, value);
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

          const formData = new FormData();
          formData.append("travellerInformation", travelerId);
          formData.append("purpose", purpose);
          formData.append("price", price);
          formData.append("toCountry", toCountry);
          formData.append("fromCountry", fromCountry);
          formData.append("travelDateFrom", travelDate);
          formData.append("travelDateTo", returnDate);
          formData.append("dateOfApply", new Date().toISOString());
          formData.append("status", "Submitted");

          if (traveler.travelerPhoto) {
            formData.append("travelerPhoto", traveler.travelerPhoto);
          }
          if(flightTicket) {
            formData.append("roundTripFlightTicket", flightTicket);
          }
          if(hotelBooking) {
            formData.append("hotelBooking", hotelBooking);
          }

          return instance.post("/visa-application", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        }));
      }

      alert("Visa application(s) submitted successfully!");
    } catch (error) {
      console.error("Error submitting visa applications:", error);
      alert("Failed to submit visa applications. Please try again.");
    }
  };

  // Add this new function
  const getTravelerInfo = async (id) => {
    try {
      const response = await instance.get(`/traveller-information?id=${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch traveler information");
      }

      const data = await response;
      return data.response; // Assuming the API returns the data in response field
    } catch (error) {
      console.error("Error fetching traveler information:", error);
      throw error;
    }
  };

  // Move passportOptions definition outside of UploadForm
  const passportOptions = passports.map(passport => ({
    value: passport.id,
    label: passport.value
  }));

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
                onClick={() =>{ setApplicationType("individual")
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

          {isGroup &&  <div className="mb-4 md:mb-5">
              <Input
                placeholder={"Tourist Visa"}
                label={"Group Name"}
                required={applicationType === "group"}
              />
            </div>}
          </div>
        </div>
      </>
    );
  };

  // Front passport page component

  const VisaInformation = () => {
    return (
      <div className=" flex items-center  border rounded-[26px] border-[#CDD0D5] justify-center p-4">
        <div className="w-full  rounded-2xl  overflow-hidden">
          {/* Visa Information Section */}
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
                    <p className="text-gray-600">Travelers: 1</p>
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
                  {/* Timeline line */}
                  <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

                  {/* Auto-validation item */}
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

                  {/* Visa processed item */}
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

                  {/* Non-refundable item */}
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

            {/* Price Details Section */}
            <div className="mt-8 border-[#CDD0D5] border  rounded-[21px]  p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Price Details
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2 border-[#868C98] items-center">
                  <span className="text-gray-600">Traveller 1</span>
                  <span className="text-gray-800">{price || "₹0"}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 border-[#868C98] font-medium">
                  <span className="text-gray-800">Total</span>
                  <span className="text-gray-800">{price || "₹0"}</span>
                </div>
                <div className="flex justify-betweenitems-center text-sm">
                  <span className="text-gray-600">Current Wallet Balance</span>
                  <span className="text-gray-800">{price || "₹0"}</span>
                </div>
              </div>
              <div className="  flex justify-end">
                <button className="mt-6  w-full  md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg font-[400] text-[14px] hover:bg-blue-700 transition-colors flex items-center justify-center">
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

  // Define all states at the top of your component
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Your existing handleImageChange function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Modify handlePassportChange to accept index parameter
  const handlePassportChange = async (selectedOption, index) => {
    try {
      // Fetch traveler information using the selected passport ID
      const response = await instance.get(`/traveller-information?id=${selectedOption}`);
      const travelerData = response.data.response;

      // Update the specific traveler's data
      const newTravelers = [...travelers];
      const traveler = newTravelers[index];

      // Update front form data
      traveler.frontFormData = {
        passportNumber: travelerData.passportNumber || '',
        firstName: travelerData.firstName || '',
        lastName: travelerData.lastName || '',
        nationality: travelerData.nationality || '',
        sex: travelerData.sex || '',
        dateOfBirth: travelerData.dateOfBirth ? travelerData.dateOfBirth.split('T')[0] : '',
        placeOfBirth: travelerData.placeOfBirth || '',
        placeOfIssue: travelerData.placeOfIssue || '',
        maritalStatus: travelerData.maritalStatus || '',
        dateOfIssue: travelerData.dateOfIssue ? travelerData.dateOfIssue.split('T')[0] : '',
        dateOfExpiry: travelerData.dateOfExpiry ? travelerData.dateOfExpiry.split('T')[0] : '',
      };

      // Update back form data
      traveler.backFormData = {
        fathersName: travelerData.fathersName || '',
        mothersName: travelerData.mothersName || '',
      };

      // Set passport images if they exist
      if (travelerData.passportImageFront) {
        traveler.frontImage = travelerData.passportImageFront;
      }
      if (travelerData.passportImageBack) {
        traveler.previewUrl = travelerData.passportImageBack;
      }
      if (travelerData.travellerPhoto) {
        traveler.travelerPhoto = travelerData.travellerPhoto;
      }

      setTravelers(newTravelers);

    } catch (error) {
      console.error('Error fetching traveler information:', error);
      alert('Failed to fetch traveler information');
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${MainBackground})`,
          backgroundSize: "100%", // Don't scale the image
          backgroundPosition: "center", // Start from top left
          backgroundRepeat: "repeat", // Repeat in both directions
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
                {travelers.map((traveler, index) => (
                  <div key={traveler.id} className="mb-8 border-b pb-8">
                    <h3 className="text-xl font-bold mb-4">Traveler {index + 1}</h3>
                    
                    {/* Passport Selection - Always show for each traveler */}
                    <div className="mb-4">
                      <CustomSelect
                        labelClass={"12px"}
                        className={"py-[11px]"}
                        placeholder={"Select Passport"}
                        label={"Passport Number"}
                        options={passportOptions}
                        value={passportOptions.find(option => option.value === traveler.selectedPassport) || ''}
                        onChange={(value) => {
                          const newTravelers = [...travelers];
                          newTravelers[index].selectedPassport = value;
                          setTravelers(newTravelers);
                          handlePassportChange(value, index);
                        }}
                      />
                    </div>

                    {/* Front Passport Form - Always show */}
                    <FrontPassportForm
                      travelerNumber={index + 1}
                      frontImage={traveler.frontImage}
                      setFrontImage={(image) => {
                        const newTravelers = [...travelers];
                        newTravelers[index].frontImage = image;
                        setTravelers(newTravelers);
                      }}
                      formData={traveler.frontFormData}
                      setFormData={(data) => {
                        const newTravelers = [...travelers];
                        newTravelers[index].frontFormData = data;
                        setTravelers(newTravelers);
                      }}
                    />

                    {/* Back Passport Form - Always show */}
                    <BackPassportForm
                      formData={traveler.backFormData}
                      setFormData={(data) => {
                        const newTravelers = [...travelers];
                        newTravelers[index].backFormData = data;
                        setTravelers(newTravelers);
                      }}
                      previewUrl={traveler.previewUrl}
                      setPreviewUrl={(url) => {
                        const newTravelers = [...travelers];
                        newTravelers[index].previewUrl = url;
                        setTravelers(newTravelers);
                      }}
                    />

                    {/* Traveler Photo Upload - Always show */}
                    <UploadTravelerPhoto
                      photo={traveler.travelerPhoto}
                      setPhoto={(photo) => {
                        const newTravelers = [...travelers];
                        newTravelers[index].travelerPhoto = photo;
                        setTravelers(newTravelers);
                      }}
                    />
                  </div>
                ))}
                
                {/* Add Traveler Button - Show only in group mode */}
                {isGroup && (
                  <button
                    onClick={addTraveler}
                    className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Another Traveler
                  </button>
                )}
                
                {/* Flight and Hotel Booking - Show only once outside the travelers mapping */}
                <FlightHotelBooking
                  isGroup={isGroup}
                  flightTicket={flightTicket}
                  setFlightTicket={setFlightTicket}
                  hotelBooking={hotelBooking}
                  setHotelBooking={setHotelBooking}
                />
                
                <VisaInformation />
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Applications
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelVisaBooking;
