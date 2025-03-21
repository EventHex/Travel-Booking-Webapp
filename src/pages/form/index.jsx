import React, { useState,useEffect, useRef } from "react";
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
import FormSideBar from "../form/formSidebar";
const TravelVisaBooking = () => {
  const citizenInputRef = useRef(null);
  const goingToInputRef = useRef(null);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

  // Track focus state for all four inputs
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [goingToIsFocused, setGoingToIsFocused] = useState(false);
// const [TrvellingDateFo]
  // Track which input is focused

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
          <div className=" flex gap-5  w-full">
            <div className="flex gap-3  justify-center    w-[50%]  flex-col ">
              <div className="flex   bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
                <div className="w-full ">
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
            <div className="flex gap-3  w-[50%]  flex-col ">
              <div className="flex   bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
                <div className="w-full ">
                  <div className="flex items-center p-3">
                    <span
                      className={`mr-2 cursor-pointer ${
                        citizenIsFocused ? "opacity-100" : "opacity-20"
                      }`}
                      onClick={handleCitizenIconClick}
                    >
                      <img src={CalenderUp} alt="Home icon" />
                    </span>
                    <input
                      style={{ border: "none" }}
                      ref={citizenInputRef}
                      type="text"
                      placeholder="Travel Date"
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
                      <img src={CalenderDown} alt="Flight icon" />
                    </span>
                    <input
                      style={{ border: "none" }}
                      ref={goingToInputRef}
                      type="text"
                      placeholder="Return Date"
                      className="w-full bg-transparent outline-none"
                      onFocus={() => setGoingToIsFocused(true)}
                      onBlur={() => setGoingToIsFocused(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button className=" text-white py-2 px-5 rounded-xl bg-[#375DFB] border text-[16px]">
                Search
              </button>
            </div>
          </div>
          {/* ************text form **************** */}
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
          {/* ****************************** */}
          <div className="w-full mt-10 flex gap-1 md:gap-4">
              {/* Sidebar container - fixed 20% width on larger screens */}
              <div
                className={`${
                  isNarrowScreen ? "w-[50px]" : "w-[20%]"
                } min-w-[50px]   mb-6 md:mb-0 transition-all duration-300`}
              >
                <FormSideBar isNarrow={isNarrowScreen} />
              </div>
              
              <div 
                className={`${
                  isNarrowScreen ? "w-[calc(100%-60px)]" : "w-[80%]"
                } px-2 transition-all duration-300`}
              >
                <div className="w-full">
                
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default TravelVisaBooking;
