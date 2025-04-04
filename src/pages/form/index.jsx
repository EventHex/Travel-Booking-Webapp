import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import {FrontPassportForm} from "./passportFrontForm";
import {BackPassportForm} from "./passportBackForm";
import {SearchInputText,SearchInputDate} from "../../components/searchInput";
import File from "../../components/file";
import {
  Flight,
  Home,
  CalenderUp,
  CalenderDown,
  MainBackground,
 UserAdd,
 Saveline
} from "../../assets";
import {
  Upload,
  Info,
  Clock,
  X,
  Edit2,
  Crop,
  RotateCw,
  FlipHorizontal2
} from "lucide-react";
import Input from "../../components/input";
import CustomSelect from "../../components/dropdown";
import { CustomDatePicker, FullCalendar } from "../../components/calender";
import SideBar from "./sideBar";
const TravelVisaBooking = () => {
  const citizenInputRef = useRef(null);
  const goingToInputRef = useRef(null);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

  // Track focus state for all four inputs
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [goingToIsFocused, setGoingToIsFocused] = useState(false);
  const [TravellingDateFocused, setTravellingDateFocused] = useState(false);
  const [TravellingDateEndFocused, setTravellingDateEndFocused] =
    useState(false);

  // Form data state
  const [formData, setFormData] = useState({
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
    fathersName: "",
    mothersName: "",
  });

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };

  const handleGoingToIconClick = () => {
    goingToInputRef.current.focus();
  };

  const [applicationType, setApplicationType] = useState("individual");
  const [visaType, setVisaType] = useState("Tourist Visa");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const visaOptions = [
    "Tourist Visa",
    "Business Visa",
    "Student Visa",
    "Work Visa",
    "Transit Visa",
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

  const handleSubmitTicketBooking = (e) => {
    e.preventDefault();
    console.log("Submitted documents:", documents);
  };
  const UploadForm = () => {
    const Visa = [
      { value: 1, label: "goldern visa" },
      { value: 2, label: "job visa" },
      { value: 3, label: "visiting visa" },
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
                onClick={() => setApplicationType("individual")}
              >
                Individual
              </button>
              <button
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                  applicationType === "group"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setApplicationType("group")}
              >
                Group
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="relative mb-4 md:mb-5">
                <CustomSelect 
                labelClass={'12px'}
                  className={"py-[11px]"}
                  placeholder={"Tourist Visa"}
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
                <Input
                  placeholder={"Internal Id"}
                  label={"Internal Id"}
                />
            </div>

         
              <div className="mb-4 md:mb-5">
                <Input
                  placeholder={"Tourist Visa"}
                  label={"Group Name"}
                  
                />
            </div>
          </div>
        </div>
      </>
    );
  };

  // Front passport page component

 

  const UploadTravelerPhoto = () => {
    const Occupations = [
      { value: 1, label: "developer" },
      { value: 2, label: "enginear" },
      { value: 3, label: "docter" },
    ];
    return (
      <div className="mb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">
            Upload Traveler Photo
          </h1>

          {/* Main upload section */}
          <div className="border border-gray-300 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left side - Text content */}
              <div className="w-full md:flex-1">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 md:mb-0">
                  Vietnam requires a scan of the traveler's passport. Upload a
                  clear passport image and your details will be filled
                  automatically. AI has built-in OCR which is 99.9% accurate.
                  However, it is mandatory to review the information before
                  submitting to ensure there are no mistakes. See detailed
                  guidelines for the perfect passport here. Your visa can get
                  rejected if these guidelines are not followed.
                </p>
              </div>
<div className=" w-full  md:w-[50%]">
                  <File head={"Travel Photo"} />
                </div>
              
            </div>
          </div>

          {/* Additional Questions Section */}
          <div>
            <h2 className="text-lg sm:text-xl text-blue-600 mb-4 sm:mb-6">
              Answer Additional Required Questions
            </h2>

            <div className="space-y-3 w-full  md:w-[60%] sm:space-y-4">
              <h3 className="text-sm sm:text-base font-medium">
                What is the traveler's occupation (optional)?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">
                This is an optional occupation field. Most people use the
                default - Service. Occupation does not influence the decision of
                the visa.
              </p>
              <CustomSelect options={Occupations} label="" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TicketBooking = () => {
    return (
      <div className="px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto overflow-hidden">
          <form onSubmit={handleSubmitTicketBooking} className="">
            <div className="w-full">
              {/* Flight Ticket Section */}
              <div className="w-full flex flex-col md:flex-row gap-4 md:gap-5 border-b pb-6 md:pb-8 md:border-b-0  border-gray-200">
                <div className="w-full md:w-[50%]">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    Round Trip Flight Ticket
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-8">
                    Ensure all round trip tickets (both onward and return).
                    Highlight the passenger's name clearly.
                  </p>
                </div>
                <div className="relative w-full md:w-[50%]">
                  {/* <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) =>
                        handleFileChangeTicketBooking(
                          "flightTicket",
                          e.target.files?.[0] || null
                        )
                      }
                      accept=".jpg,.jpeg,.png,.pdf"
                    />
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400" />
                      <p className="mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
                        {documents.flightTicket
                          ? documents.flightTicket.name
                          : "Choose a file or drag & drop it here."}
                      </p>
                      <p className="mt-1 md:mt-2 text-xs text-gray-500">
                        JPEG, PNG, PDF, and MP4 formats, up to 50 MB
                      </p>
                      {!documents.flightTicket && (
                        <button
                          type="button"
                          className="mt-2 md:mt-4 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50"
                        >
                          Browse File
                        </button>
                      )}
                    </div>
                  </div> */}
                  <div className="w-[100%]">
                  <File head={"Round Trip Flight Ticket"} />
                </div>
                </div>
              </div>

              {/* Hotel Booking Section */}
              <div className="w-full flex flex-col md:flex-row gap-4 md:gap-5  ">
                <div className="w-full md:w-[50%]">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    Hotel Booking
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-8">
                    Hotel booking should be for the same day as the passenger's
                    arrival in Dubai. Highlight the passenger's name clearly.
                  </p>
                </div>
                <div className="w-full md:w-[50%] relative">
                  {/* <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) =>
                        handleFileChangeTicketBooking(
                          "hotelBooking",
                          e.target.files?.[0] || null
                        )
                      }
                      accept=".jpg,.jpeg,.png,.pdf"
                    />
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400" />
                      <p className="mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
                        {documents.hotelBooking
                          ? documents.hotelBooking.name
                          : "Choose a file or drag & drop it here."}
                      </p>
                      <p className="mt-1 md:mt-2 text-xs text-gray-500">
                        JPEG, PNG, PDF, and MP4 formats, up to 50 MB
                      </p>
                      {!documents.hotelBooking && (
                        <button
                          type="button"
                          className="mt-2 md:mt-4 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50"
                        >
                          Browse File
                        </button>
                      )}
                    </div>
                  </div> */}
                  <div className="w-[100%]">
                  <File  className={''} head={"Hotel Booking"} />
                </div>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="w-full mt-10 px-4 md:px-0">
                <div className="w-full md:w-[50%]">
                  <div className="flex flex-col sm:flex-row py-4 md:py-5 border-t border-[#CDD0D5] gap-3 sm:gap-5">
                    <button className=" gap-2 bg-blue-600 hover:bg-blue-700  w-full justify-center py-2  flex text-[14px] font-[400] text-white rounded-md ">
                      <img src={UserAdd} alt="" /> Add Another Traveller
                    </button>
                    <button className=" gap-2 bg-blue-600 hover:bg-blue-700 flex w-full justify-center py-2 text-[14px] font-[400] text-white rounded-md ">
                     <img src={Saveline} alt="" />  Review & Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

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
                  <p className="text-gray-600">Vietnam - Vietnam E-Visa</p>
                  <p className="text-gray-600">Vietnam - Vietnam E-Visa</p>
                  <div className="mt-4">
                    <p className="text-gray-600">Travelers: 2</p>
                    <p className="text-gray-600">
                      Travel Dates: Feb 27, 2025 - Feb 27, 2025
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
                  <span className="text-gray-800">₹13,519</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 border-[#868C98] font-medium">
                  <span className="text-gray-800">Total</span>
                  <span className="text-gray-800">₹13,519</span>
                </div>
                <div className="flex justify-betweenitems-center text-sm">
                  <span className="text-gray-600">Current Wallet Balance</span>
                  <span className="text-gray-800">₹13,519</span>
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
          <div className="flex gap-5 flex-col  md:flex-row p-5 w-full">
         <SearchInputText  />
         <SearchInputDate />
           
            <div className="flex items-center">
              <button className="text-white py-2 px-5 rounded-xl bg-[#375DFB] border text-[16px]">
                Search
              </button>
            </div>
          </div>
          <UploadForm />
          <div className="flex  mt-10 ">
            <div className="  w-auto  pr-3 mt-3 md:w-[20%]">
              <div
                className={`${
                  isNarrowScreen ? "w-[50px]" : "w-full"
                } min-w-[50px]   mb-6 md:mb-0 transition-all duration-300`}
              >
                <SideBar isNarrow={isNarrowScreen} />
              </div>

              {/* <Sidebar /> */}
            </div>
            <div className="w-full md:w-[70%] border-l border-[#bbbdc2] flex flex-col justify-center">
            <div className=" md:p-5">
              <FrontPassportForm />
              <BackPassportForm />
              <UploadTravelerPhoto />
              <TicketBooking />
              <VisaInformation />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit Image</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setActiveOption(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <img
                src={selectedImage}
                alt="Edit preview"
                className="max-h-[400px] mx-auto object-contain"
              />
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setActiveOption(activeOption === 'crop' ? null : 'crop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeOption === 'crop' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Crop className="h-5 w-5" />
                Crop
              </button>
              <button 
                onClick={() => setActiveOption(activeOption === 'rotate' ? null : 'rotate')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeOption === 'rotate' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <RotateCw className="h-5 w-5" />
                Rotate
              </button>
              <button 
                onClick={() => setActiveOption(activeOption === 'flip' ? null : 'flip')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeOption === 'flip' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FlipHorizontal2 className="h-5 w-5" />
                Flip
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TravelVisaBooking;
