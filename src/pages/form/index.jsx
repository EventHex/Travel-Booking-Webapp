import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import {
  Flight,
  Home,
  CalenderUp,
  CalenderDown,
  MainBackground,
  Allicon,
  Aproved,
  Rejection,
  Refuse,
  Pending,
  Submit,
} from "../../assets";
import { Upload, Calendar, Info } from "lucide-react";
import Input from "../../components/input";
import CustomSelect from "../../components/dropdown";
import { CustomDatePicker, FullCalendar } from "../../components/calender";

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
  const [internalId, setInternalId] = useState("");
  const [groupName, setGroupName] = useState("Tourist Visa");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  // ***************passport photo*****************
  const [occupation, setOccupation] = useState("");
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="relative">
                <CustomSelect className={'py-4'} label={"Visa Type"} options={Visa} />

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

            <div>
              <Input
                label="Internal Id"
                onChange={() => {}}
                placeholder="Internal Id"
                labelClassName="block text-sm font-medium text-gray-700 mb-1"
                InputClassName="shadow-sm py-5 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 text-gray-500 bg-white"
              />
            </div>

            <div>
              <Input
                label="Group Name"
                onChange={() => {}}
                placeholder="Internal Id"
                labelClassName="block text-sm font-medium text-gray-700 mb-1"
                InputClassName="shadow-sm py-5 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 text-gray-500 bg-white"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  // Front passport page component

  const sexOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "O", label: "Other" },
  ];
  const Metiral = [
    { value: "s", label: "single" },
    { value: "m", label: "married" },
  ];
  const FrontPassportForm = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [dob, setDob] = useState("");

    return (
      <div className="w-full mx-auto py-4 px-4 md:py-8 md:px-8">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-blue-600 mb-2">
          Traveler 1
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-4">
          Upload Traveler's Front Passport Page
        </h2>
        <p className="text-xs md:text-sm text-gray-600">
          Vietnam requires a scan of the traveler's passport. Upload a clear
          passport image and your details will be filled automatically. All
          fields with (*) are mandatory. Please review the information before
          submitting to ensure there are no mistakes.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col lg:flex-row w-full gap-x-4 lg:gap-x-8 gap-y-6">
            <div className="w-full lg:w-[50%]">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passport Front Page Image
                  <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
                  <input
                    type="file"
                    className="hidden"
                    id="passport-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="passport-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400" />
                    <span className="text-xs md:text-sm text-gray-600">
                      Choose a file or drag & drop it here
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      JPEG, PNG, PDF and NPF formats, up to 50 MB
                    </span>
                    <button
                      type="button"
                      className="mt-3 px-3 py-1 md:px-4 md:py-2 bg-white border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Browse File
                    </button>
                  </label>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[50%]">
              <div className="mb-4 md:mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passport Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Passport Number"
                  className="mb-1 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4 md:mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="mb-4 md:mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nationality"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sex<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select</option>
                    {sexOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4 md:mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place of Birth<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4 md:mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place of Issue<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="placeOfIssue"
                  value={formData.placeOfIssue}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marital Status
                  </label>
                  <select
                    name="Maritalstatus"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select</option>
                    {Metiral.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Issue<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfIssue"
                    value={formData.dateOfIssue}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Expiry<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfExpiry"
                    value={formData.dateOfExpiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    );
  };

  const BackPassportForm = () => {
    return (
      <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Upload Traveler's Back Passport Page
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Vietnam requires a scan of the traveler's passport. Upload a clear
            passport image and your details will be filled automatically. AI
            has built its own OCR which is 99.9% accurate. However, it is
            mandatory to review the information before submitting to ensure
            there are no mistakes.
          </p>
        </div>

        <div className="shadow rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* File Upload Column */}
            <div className="p-4 sm:p-6 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="space-y-3 md:space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Passport Back Page Image<span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 sm:space-y-2 text-center">
                    <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                    <div className="flex flex-col sm:flex-row items-center justify-center text-xs sm:text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Choose a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/jpeg,image/png,image/gif"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1 mt-1 sm:mt-0">or drag & drop it here.</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      JPEG, PNG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Input label="Father's Name" required={true} />
                </div>

                <div>
                  <Input label="Mother's Name" required={true} />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };

  const UploadTravelerPhoto = () => {
    const Occupations= [
      {value:1,label:'developer'},
      {value:2,label:'enginear'},
      {value:3,label:'docter'}



    ]
    return (
      <div className="mb-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">Upload Traveler Photo</h1>

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

            {/* Right side - Upload box */}
            <div className="w-full md:flex-1">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 text-center bg-gray-50">
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  Choose a file or drag & drop it here.
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  JPG, PNG, and MIME formats, up to 10 MB
                </p>

                <label className="inline-block">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-blue-500 text-white text-xs sm:text-sm cursor-pointer hover:bg-blue-600 transition-colors">
                    Browse File
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
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
      <div className=" ">
        <div className="max-w-6xl   overflow-hidden">
          <form onSubmit={handleSubmitTicketBooking} className="">
            <div className="w-full ">
              <div className="w-full  flex gap-5 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="w-[50%]">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Round Trip Flight Ticket
                  </h2>
                  <p className="text-sm text-gray-600 mb-8">
                    Ensure all round trip tickets (both onward and return).
                    Highlight the passenger's name clearly.
                  </p>
                </div>
                <div className="relative w-[50%]">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors">
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
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4 text-sm text-gray-600">
                        {documents.flightTicket
                          ? documents.flightTicket.name
                          : "Choose a file or drag & drop it here."}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        JPEG, PNG, PDF, and MP4 formats, up to 50 MB
                      </p>
                      {!documents.flightTicket && (
                        <button
                          type="button"
                          className="mt-4 px-4 py-2 text-sm text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50"
                        >
                          Browse File
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Section */}
              <div className="w-full flex  gap-5 p-8">
                <div className="w-[50%]">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Hotel Booking
                  </h2>
                  <p className="text-sm text-gray-600 mb-8">
                    Hotel booking should be for the same day as the passenger's
                    arrival in Dubai. Highlight the passenger's name clearly.
                  </p>
                </div>
                <div className=" w-[50%] relative">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors">
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
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4 text-sm text-gray-600">
                        {documents.hotelBooking
                          ? documents.hotelBooking.name
                          : "Choose a file or drag & drop it here."}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        JPEG, PNG, PDF, and MP4 formats, up to 50 MB
                      </p>
                      {!documents.hotelBooking && (
                        <button
                          type="button"
                          className="mt-4 px-4 py-2 text-sm text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50"
                        >
                          Browse File
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-[70%]">
                  <div className="flex py-5 border-t-1 border-[#868C98] gap-5">
                    <button className="bg-blue-600  w-[220px] text-[14px] font-[400] text-white rounded-md px-4 py-2">
                      Add Another Traveller
                    </button>
                    <button className="bg-blue-600   w-[220px] text-[14px] font-[400] text-white rounded-md px-4 py-2">
                      Review & Save
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
  // Sidebar component
  function Sidebar() {
    return (
      <div className="w-full">
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <button className="w-full text-left px-4 py-2.5 text-gray-500 hover:bg-white/50 rounded-lg flex items-center">
              <span>Internal ID</span>
              <div className="ml-auto w-2 h-2 rounded-full border border-gray-300"></div>
            </button>
            <button className="w-full text-left px-4 py-2.5 text-gray-500 hover:bg-white/50 rounded-lg flex items-center">
              <span>Group Name</span>
              <div className="ml-auto w-2 h-2 rounded-full border border-gray-300"></div>
            </button>
            <button className="w-full text-left px-4 py-2.5 text-blue-600 bg-white/80 rounded-lg flex items-center">
              <span>Traveller 1</span>
              <div className="ml-auto w-2 h-2 rounded-full bg-blue-600"></div>
            </button>
            <button className="w-full text-left px-4 py-2.5 text-blue-600 hover:bg-white/50 rounded-lg">
              Passport
            </button>
            <button className="w-full text-left px-4 py-2.5 text-gray-500 hover:bg-white/50 rounded-lg flex items-center">
              <span>Traveller Photo</span>
              <div className="ml-auto w-2 h-2 rounded-full border border-gray-300"></div>
            </button>
            <button className="w-full text-left px-4 py-2.5 text-gray-500 hover:bg-white/50 rounded-lg flex items-center">
              <span>Review</span>
              <div className="ml-auto w-2 h-2 rounded-full border border-gray-300"></div>
            </button>
            <button className="w-full text-left px-4 py-2.5 text-gray-500 hover:bg-white/50 rounded-lg flex items-center">
              <span>Submit</span>
              <div className="ml-auto w-2 h-2 rounded-full border border-gray-300"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${MainBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />

        <div className="max-w-[1300px] w-full mx-auto p-4 rounded-lg">
          {/* Search Form */}
          <div className="flex gap-5 w-full">
            <div className="flex gap-3 justify-center w-[50%] flex-col">
              <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row">
                <div className="w-full">
                  <div className="flex items-center p-3">
                    <span
                      className={`mr-2 cursor-pointer ${
                        citizenIsFocused ? "opacity-100" : "opacity-20"
                      }`}
                      onClick={handleCitizenIconClick}
                    >
                      <img src={Home} alt="Home icon" />
                    </span>
                    <input
                      style={{ border: "none" }}
                      ref={citizenInputRef}
                      type="text"
                      placeholder="Citizen Of"
                      className="w-full bg-transparent outline-none"
                      onFocus={() => setCitizenIsFocused(true)}
                      onBlur={() => setCitizenIsFocused(false)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center p-3">
                    <span
                      className={`mr-2 cursor-pointer ${
                        goingToIsFocused ? "opacity-100" : "opacity-20"
                      }`}
                      onClick={handleGoingToIconClick}
                    >
                      <img src={Flight} alt="Flight icon" />
                    </span>
                    <input
                      style={{ border: "none" }}
                      ref={goingToInputRef}
                      type="text"
                      placeholder="Going to"
                      className="w-full bg-transparent outline-none"
                      onFocus={() => setGoingToIsFocused(true)}
                      onBlur={() => setGoingToIsFocused(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end"></div>
            </div>
            <div className="flex gap-3 w-[50%] flex-col">
              <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row">
                <div className="w-full">
                  <div className="flex items-center p-3">
                    <span
                      className={`mr-2 cursor-pointer ${
                        TravellingDateFocused ? "opacity-100" : "opacity-20"
                      }`}
                    >
                      <img src={CalenderUp} alt="Calendar up icon" />
                    </span>
                    <input
                      style={{ border: "none" }}
                      type="text"
                      placeholder="Travel Date"
                      className="w-full bg-transparent outline-none"
                      onFocus={() => setTravellingDateFocused(true)}
                      onBlur={() => setTravellingDateFocused(false)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center p-3">
                    <span
                      className={`mr-2 cursor-pointer ${
                        TravellingDateEndFocused ? "opacity-100" : "opacity-20"
                      }`}
                    >
                      <img src={CalenderDown} alt="Calendar down icon" />
                    </span>
                    <input
                      style={{ border: "none" }}
                      type="text"
                      placeholder="Return Date"
                      className="w-full bg-transparent outline-none"
                      onFocus={() => setTravellingDateEndFocused(true)}
                      onBlur={() => setTravellingDateEndFocused(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-white py-2 px-5 rounded-xl bg-[#375DFB] border text-[16px]">
                Search
              </button>
            </div>
          </div>

          {/* Form section */}
          <UploadForm />

          {/* Main content with sidebar */}
          <div className="flex bg-gradient-to-br">
            <div className="w-[30%]">
              <Sidebar />
            </div>

            {/* Passport upload section */}
            <div className="w-[70%]">
              <FrontPassportForm />
              <BackPassportForm />
              <UploadTravelerPhoto />
              <TicketBooking />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelVisaBooking;
