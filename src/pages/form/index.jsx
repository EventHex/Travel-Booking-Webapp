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
import { Upload, Calendar, Info } from 'lucide-react';
// import FormSideBar from "../form/formSidebar";

const TravelVisaBooking = () => {
  const citizenInputRef = useRef(null);
  const goingToInputRef = useRef(null);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

  // Track focus state for all four inputs
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [goingToIsFocused, setGoingToIsFocused] = useState(false);
  const [TravellingDateFocused, setTravellingDateFocused] = useState(false);
  const [TravellingDateEndFocused, setTravellingDateEndFocused] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    passportNumber: '',
    firstName: '',
    lastName: '',
    nationality: '',
    sex: '',
    dateOfBirth: '',
    placeOfBirth: '',
    placeOfIssue: '',
    maritalStatus: '',
    dateOfIssue: '',
    dateOfExpiry: '',
    fathersName: '',
    mothersName: '',
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Application type form component
  const UploadForm = () => {
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
              <label
                htmlFor="visa-type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Visa Type
              </label>
              <div className="relative">
                <button
                  type="button"
                  id="visa-type"
                  className="relative w-full bg-white border py-5 border-gray-300 rounded-md pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="block truncate text-gray-500">
                    {visaType}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>

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
              <label
                htmlFor="internal-id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Internal Id
              </label>
              <input
                type="text"
                id="internal-id"
                className="shadow-sm py-5 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 text-gray-500 bg-white"
                placeholder="Internal Id"
                value={internalId}
                onChange={(e) => setInternalId(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="group-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Group Name
              </label>
              <input
                type="text"
                id="group-name"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-5 px-3 text-gray-500 bg-white transition duration-200 ease-in-out hover:border-blue-300"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  // Front passport page component
  const FrontPassportForm = () => {
    return (
      <div className="w-full mx-auto py-8 px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-blue-600 mb-2">Traveler 1</h1>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Upload Traveler's Front Passport Page</h2>
          <p className="text-sm text-gray-600">
            Vietnam requires a scan of the traveler's passport. Upload a clear passport image and your details will be filled
            automatically. All fields with (*) are mandatory. Please review the information before submitting to ensure there are no mistakes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passport Front Page Image<span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                  <Calendar className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Choose a file or drag & drop it here</span>
                  <span className="text-xs text-gray-400 mt-1">JPEG, PNG, PDF and NPF formats, up to 50 MB</span>
                  <button
                    type="button"
                    className="mt-3 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Browse File
                  </button>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passport Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
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
                  <option value="">Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="col-span-2">
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

            <div className="col-span-2">
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

            <div className="grid grid-cols-3 gap-4 col-span-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status<span className="text-red-500">*</span>
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
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
        </form>
      </div>
    );
  };
  
  // Back passport page component
  const BackPassportForm = () => {
    return (
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Upload Traveler's Back Passport Page</h1>
            <p className="mt-2 text-sm text-gray-600">
              Vietnam requires a scan of the traveler's passport. Upload a clear passport image and your details will be filled
              automatically. AI has built its own OCR which is 99.9% accurate. However, it is mandatory to review the information
              before submitting to ensure there are no mistakes.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              {/* File Upload Column */}
              <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Passport Back Page Image*
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-2 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
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
                        <p className="pl-1">or drag & drop it here.</p>
                      </div>
                      <p className="text-xs text-gray-500">JPEG, PNG, GIF up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="fathersName" className="block text-sm font-medium text-gray-700">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      name="fathersName"
                      id="fathersName"
                      value={formData.fathersName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="mothersName" className="block text-sm font-medium text-gray-700">
                      Mother's Name
                    </label>
                    <input
                      type="text"
                      name="mothersName"
                      id="mothersName"
                      value={formData.mothersName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelVisaBooking;