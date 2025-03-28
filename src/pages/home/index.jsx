import React, { useState, useRef } from "react";
import { TabMenu } from "../../components/tabs";
import {
  Men,
  MainBackground,
  Arrow,
  Visa,
  Acitivty,
  Inurance,
  Flight,
  Search,
  Logo,
  Home,
  CalenderDown,
  CalenderUp,
} from "../../assets";
import Header from "../../components/header";
import SearchInput from "../../components/searchInput";
const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("Visas");
  const tabs = [
    { id: "Visas", icon: Visa },
    { id: "Activities", icon: Acitivty },
    { id: "Insurance", icon: Inurance },
    { id: "Flights", icon: Flight },
  ];

  // Function to render different content based on active tab
  const renderTabContent = () => {
    const citizenInputRef = useRef(null);
    const goingToInputRef = useRef(null);
    const travelDateInputRef = useRef(null);
    const returnDateInputRef = useRef(null);

    // Track focus state for all four inputs
    const [citizenIsFocused, setCitizenIsFocused] = useState(false);
    const [goingToIsFocused, setGoingToIsFocused] = useState(false);
    const [travelDateIsFocused, setTravelDateIsFocused] = useState(false);
    const [returnDateIsFocused, setReturnDateIsFocused] = useState(false);

    // Track which input is focused

    const handleCitizenIconClick = () => {
      citizenInputRef.current.focus();
    };

    const handleGoingToIconClick = () => {
      goingToInputRef.current.focus();
    };

    const handleTravelDateIconClick = () => {
      travelDateInputRef.current.focus();
    };

    const handleReturnDateIconClick = () => {
      returnDateInputRef.current.focus();
    };
    switch (activeTab) {
      case "Visas":
        return (
          <>
          <div className="flex gap-3  flex-col ">
            <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
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
            <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
              <div className="w-full">
                <div className="flex items-center p-3">
                  <span
                    className={`mr-2 cursor-pointer ${
                      travelDateIsFocused ? "opacity-100" : "opacity-20"
                    }`}
                    onClick={handleTravelDateIconClick}
                  >
                    <img src={CalenderUp} alt="Calendar icon" />
                  </span>
                  <input
                    style={{ border: "none" }}
                    ref={travelDateInputRef}
                    type="text"
                    placeholder="Travel Date"
                    className="w-full bg-transparent outline-none"
                    onFocus={() => setTravelDateIsFocused(true)}
                    onBlur={() => setTravelDateIsFocused(false)}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center p-3">
                  <span
                    className={`mr-2 cursor-pointer ${
                      returnDateIsFocused ? "opacity-100" : "opacity-20"
                    }`}
                    onClick={handleReturnDateIconClick}
                  >
                    <img src={CalenderDown} alt="Calendar icon" />
                  </span>
                  <input
                    style={{ border: "none" }}
                    ref={returnDateInputRef}
                    type="text"
                    placeholder="Return Date"
                    className="w-full bg-transparent outline-none"
                    onFocus={() => setReturnDateIsFocused(true)}
                    onBlur={() => setReturnDateIsFocused(false)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
            <button className=" text-white py-2 px-5 rounded-xl bg-[#000099] border text-[16px]">Search</button>
            </div>
            </div>
          </>
        );
      case "Activities":
        return (
          <div className="relative mb-24 w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <img src={Search} alt="" />
            </div>
            <input
              type="text"
              placeholder={`Search for ${activeTab} (e.g. Burj Khalifa, Universal Studio)`}
              className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white border border-[#A6BFFF82] border-solid rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base text-gray-600 placeholder-gray-400 transition-all duration-300 delay-150 hover:border-blue-500"
            />
          </div>
        );
      case "Insurance":
        return (
          <div className="flex gap-3  flex-col ">
          <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
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
          <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
            <div className="w-full">
              <div className="flex items-center p-3">
                <span
                  className={`mr-2 cursor-pointer ${
                    travelDateIsFocused ? "opacity-100" : "opacity-20"
                  }`}
                  onClick={handleTravelDateIconClick}
                >
                  <img src={CalenderUp} alt="Calendar icon" />
                </span>
                <input
                  style={{ border: "none" }}
                  ref={travelDateInputRef}
                  type="text"
                  placeholder="Travel Date"
                  className="w-full bg-transparent outline-none"
                  onFocus={() => setTravelDateIsFocused(true)}
                  onBlur={() => setTravelDateIsFocused(false)}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center p-3">
                <span
                  className={`mr-2 cursor-pointer ${
                    returnDateIsFocused ? "opacity-100" : "opacity-20"
                  }`}
                  onClick={handleReturnDateIconClick}
                >
                  <img src={CalenderDown} alt="Calendar icon" />
                </span>
                <input
                  style={{ border: "none" }}
                  ref={returnDateInputRef}
                  type="text"
                  placeholder="Return Date"
                  className="w-full bg-transparent outline-none"
                  onFocus={() => setReturnDateIsFocused(true)}
                  onBlur={() => setReturnDateIsFocused(false)}
                />
              </div>
            </div>
          </div>
          <div className="flex  justify-between">
            <div className="w-[80%]">

<SearchInput/>
            </div>
            <div className="w-[20%] justify-end   flex">

          <button className=" text-white  px-10 rounded-xl bg-[#000099] border text-[16px]">Search</button>
            </div>
          </div>
          </div>
        );
      case "Flights":
        return (
          <>
            <div className="relative mb-24 w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <img src={Search} alt="" />
              </div>
              <input
                type="text"
                placeholder={`Search for ${activeTab} (e.g. Burj Khalifa, Universal Studio)`}
                className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white border border-[#A6BFFF82] border-solid rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base text-gray-600 placeholder-gray-400 transition-all duration-300 delay-150 hover:border-blue-500"
              />
            </div>
           
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${MainBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full flex items-center justify-center"
    >
      <div className="w-full">
        <Header />
        {/* *******************sectionhero ****************** */}

        <div className="flex justify-center w-full">
          <div className="w-full max-w-[1300px] px-4 sm:px-5 flex flex-col">
            <div className="w-full flex flex-col md:flex-row">
              {/* Left content section */}
              <div className="w-full md:w-[60%] flex flex-col justify-between  pt-14  px-0 md:pr-4">
                <div>
                  <h1 className="font-[300] text-[28px] sm:text-[32px] md:text-[42px] lg:text-[56px] leading-tight">
                    Book 3000+ Handpicked
                  </h1>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                  <h1 className="text-[#00963C] text-[28px] sm:text-[32px] md:text-[42px] lg:text-[56px] font-[500] leading-tight">
                    Experiences <br className="hidden sm:block" />
                    Worldwide
                  </h1>
                  <img
                    src={Arrow}
                    alt="arrow"
                    className="mt-2  hidden md:block"
                  />
                </div>

                {/* Search Box */}
                <div className="w-full max-w-3xl mt-4 bg-gradient-to-r  p-3 sm:p-4 rounded-lg ">
                  {/* Navigation Tabs */}
                  <div className="flex justify-between md:justify-between max-w-xl overflow-x-auto border-b border-[#868C98] no-scrollbar mb-4">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center  sm: sm:px-4 py-2 whitespace-nowrap text-[14px] sm:text-[16px] md:text-[18px] font-[500] transition-colors
                      ${
                        activeTab === tab.id
                          ? "text-blue-600 border-b-2 "
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      >
                        <span className="mr-1 sm:mr-2">
                          <img src={tab.icon} alt="icons" />
                        </span>
                        {tab.id}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content with Search Bar included in each tab */}
                  {renderTabContent()}
                </div>
                <div className="mb-8">
                  <p className="  tracking-[1px] text-[12px]">
                    👍 Book with confidence. For any assistance while booking
                    Insurance or Activities, contact us{" "}
                    <span className="text-[#375DFB]">
                      atb2b-assistance@atlys.com
                    </span>{" "}
                  </p>
                </div>
              </div>

              {/* Right image section - hidden on mobile */}
              <div className="w-full md:w-[40%] justify-center flex items-end  md:justify-end  mt-6 ">
                <img
                  src={Men}
                  alt="image"
                  className="w-full max-w-xs md:max-w-md h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        {/* *****************footer***************************** */}
        <div className="w-full flex justify-center rounded-t-[30px] py-10 items-center bg-gradient-to-r from-[#1C1C82] to-[#24186C]">
          <div className="max-w-[1300px] flex flex-col md:flex-row px-4 sm:px-5 w-full justify-center items-center">
            <div className="w-full md:w-[50%] mb-4 md:mb-0 flex justify-center md:justify-start">
              <img src={Logo} alt="Logo" className="max-w-full h-auto" />
            </div>
            <div className="w-full md:w-[50%] flex flex-col md:flex-row md:justify-end items-center md:items-end space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-center md:text-right">
                <p className="text-[#B3B3B3] text-[14px] font-[400]">
                  CNN Holidays, ZAIKAS EF COMPLEX,{" "}
                </p>
                <p className="text-[#B3B3B3] text-[14px] font-[400]">
                  Fort Road, Cannanore, Kannur - 670001
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[#B3B3B3] text-[14px] font-[400]">
                  CNN Holidays, ZAIKAS EF COMPLEX,{" "}
                </p>
                <p className="text-[#B3B3B3] text-[14px] font-[400]">
                  Fort Road, Cannanore, Kannur - 670001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
