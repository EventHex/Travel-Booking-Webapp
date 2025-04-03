import React, { useState, useEffect, useRef } from "react";
import Calander from "../../ui/calander";
import { ChevronDown } from "lucide-react";

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
  User,
  Placeholder,
} from "../../assets";
import { ChevronRight } from "lucide-react";

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

    const citizenOptions = [
      {
        image: Placeholder,
        type: "location",
        title: "Dubai",
        subtitle: "United Arab Emirates",
        id: 1,
      },
      {
        image: Placeholder,
        type: "location",
        title: "Singapore",
        subtitle: "Singapore",
        id: 2,
      },
      {
        image: Placeholder,
        type: "attraction",
        title:
          "Combo: Burj Khalifa At The Top SKY (Level 148) + Sky Views Observatory Entry Tickets",
        subtitle: "Dubai, United Arab Emirates",
        id: 3,
      },
      {
        image: Placeholder,
        type: "attraction",
        title: "Andamanda Phuket Water Park Ticket With Transfers",
        subtitle: "Phuket, Thailand",
        id: 4,
      },
      {
        image: Placeholder,
        type: "attraction",
        title: "Dubai Frame Tickets",
        subtitle: "Dubai, United Arab Emirates",
        id: 5,
      },
    ];

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

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleInputFocus = () => {
      setCitizenIsFocused(true);
      setShowDropdown(true);
    };

    const handleInputBlur = () => {
      setCitizenIsFocused(false);
      // Don't immediately hide dropdown to allow for clicks on dropdown items
      // setTimeout(() => setShowDropdown(false), 100);
    };

    const handleOptionSelect = (option) => {
      if (citizenInputRef.current) {
        citizenInputRef.current.value = option;
      }
      setShowDropdown(false);
    };

    const [tripType, setTripType] = useState("oneWay");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [cabinClass, setCabinClass] = useState("Economy");

    const cabinOptions = [
      "Economy",
      "Premium Economy",
      "Business",
      "First Class",
    ];

    const handleTripTypeChange = (type) => {
      setTripType(type);
    };

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const selectCabinClass = (option) => {
      setCabinClass(option);
      setIsDropdownOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          citizenInputRef.current &&
          !citizenInputRef.current.contains(event.target)
        ) {
          setShowDropdown(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const [showSelector, setShowSelector] = useState(false);
    const [passengers, setPassengers] = useState({
      adults: 1,
      children: 0,
      infants: 0,
    });
    const selectorRef = useRef(null);

    // Close the dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          selectorRef.current &&
          !selectorRef.current.contains(event.target)
        ) {
          setShowSelector(false);
        }
      }

      if (showSelector) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showSelector]);

    const handleIncrement = (type) => {
      setPassengers((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    };

    const handleDecrement = (type) => {
      if (passengers[type] > 0) {
        setPassengers((prev) => ({
          ...prev,
          [type]: prev[type] - 1,
        }));
      }
    };

    const handleDone = () => {
      setShowSelector(false);
    };

    // Import would be handled in your actual project
    // This is just a placeholder for the component demonstration
    const User = "user-icon-placeholder";

    // Calculate total travelers
    const totalTravelers =
      passengers.adults + passengers.children + passengers.infants;
    const travelerText =
      totalTravelers === 1 ? "1 Traveler" : `${totalTravelers} Travelers`;
    switch (activeTab) {
      case "Visas":
        return (
          <>
            <div className="flex gap-3  flex-col ">
              <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
                <div className="w-full relative">
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
                      placeholder="Search destinations, attractions..."
                      className="w-full bg-transparent outline-none"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>

                  {showDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                    >
                      {citizenOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-start px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleOptionSelect(option)}
                        >
                          <div className="flex-shrink-0 mr-3">
                            <img
                              src={option.image}
                              alt={option.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">
                              {option.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {option.subtitle}
                            </div>
                            <div className="text-xs text-blue-500 mt-1 capitalize">
                              {option.type}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                      type="date"
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
                      type="date"
                      placeholder="Return Date"
                      className="w-full bg-transparent outline-none"
                      onFocus={() => setReturnDateIsFocused(true)}
                      onBlur={() => setReturnDateIsFocused(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className=" text-white py-2 px-5 rounded-xl bg-[#000099] border text-[16px]">
                  Search
                </button>
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
          <>
            <div className="flex gap-3  flex-col ">
              <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
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
              <div className="">
                <div className=" w-[80%]">
                  <button className="flex py-3  rounded-2xl gap-5 text-[14px] bg-white/40 px-5 shadow-lg">
                    <img src={User} alt="" /> <span> 1 Traveler</span>{" "}
                    <span>
                      {" "}
                      <ChevronRight className="text-[#7a7a7f]" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case "Flights":
        return (
          <>
            <div className="flex gap-3 flex-col ">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-2  ">
                {/* Trip Type Toggle */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center cursor-pointer">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        tripType === "oneWay"
                          ? "border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {tripType === "oneWay" && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={tripType === "oneWay"}
                      onChange={() => handleTripTypeChange("oneWay")}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      One Way
                    </span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        tripType === "roundTrip"
                          ? "border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {tripType === "roundTrip" && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      checked={tripType === "roundTrip"}
                      onChange={() => handleTripTypeChange("roundTrip")}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Round Trip
                    </span>
                  </label>
                </div>

                {/* Cabin Class Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center justify-between w-48 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    <span>{cabinClass}</span>
                    <ChevronDown size={16} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                      {cabinOptions.map((option) => (
                        <div
                          key={option}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectCabinClass(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
                <div className="w-full relative">
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
                      placeholder="Search destinations, attractions..."
                      className="w-full bg-transparent outline-none"
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>

                  {showDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                    >
                      {citizenOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-start px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleOptionSelect(option)}
                        >
                          <div className="flex-shrink-0 mr-3">
                            <img
                              src={option.image}
                              alt={option.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">
                              {option.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {option.subtitle}
                            </div>
                            <div className="text-xs text-blue-500 mt-1 capitalize">
                              {option.type}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                      type="date"
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
                      type="date"
                      placeholder="Return Date"
                      className="w-full bg-transparent outline-none"
                      onFocus={() => setReturnDateIsFocused(true)}
                      onBlur={() => setReturnDateIsFocused(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className=" w-[30%] ">
                  <div className="relative max-w-md mx-auto" ref={selectorRef}>
                    <div
                      className="bg-white/40 px-5 rounded-2xl shadow-lg flex justify-center items-center cursor-pointer"
                      onClick={() => setShowSelector(!showSelector)}
                    >
                      <button className="flex py-3 w-full text-[14px]">
                        <img src={User} alt="" /> <span> {travelerText}</span>{" "}
                      </button>
                      <p>
                        {" "}
                        <ChevronRight className="text-[#7a7a7f]" />
                      </p>
                    </div>
                    {showSelector && (
                      <div className="absolute maw-w-[500px] left-0 bottom-10 right-0 z-10 bg-white rounded-lg shadow-lg ">
                        <div className="p-2">
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h2 className="text-[14px] font-medium text-gray-800">
                                  Adults
                                </h2>
                                <p className="text-[12px] text-gray-500">
                                  Age 12 and above
                                </p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDecrement("adults");
                                  }}
                                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold"
                                >
                                  −
                                </button>
                                <span className="w-6 text-center">
                                  {passengers.adults}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleIncrement("adults");
                                  }}
                                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Children */}
                            <div className="flex items-center justify-between">
                              <div>
                                <h2 className="text-[14px] font-medium text-gray-800">
                                  Children
                                </h2>
                                <p className="text-[12px] text-gray-500">
                                  Age 2 to 11
                                </p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDecrement("children");
                                  }}
                                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold"
                                >
                                  −
                                </button>
                                <span className="w-6 text-center">
                                  {passengers.children}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleIncrement("children");
                                  }}
                                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Infants */}
                            <div className="flex items-center justify-between">
                              <div>
                                <h2 className="text-[14px]font-medium text-gray-800">
                                  Infants
                                </h2>
                                <p className="text-[12px] text-gray-500">
                                  younger than 2 years
                                </p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDecrement("infants");
                                  }}
                                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold"
                                >
                                  −
                                </button>
                                <span className="w-6 text-center">
                                  {passengers.infants}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleIncrement("infants");
                                  }}
                                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="mt-8">
                            <button
                              onClick={handleDone}
                              className="w-full py-3 text-[12px] bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button className=" text-white py-2 px-5 rounded-xl bg-[#000099] border text-[16px]">
                  Search
                </button>
              </div>
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
          <div className="max-w-[1300px] md:pb-32 flex flex-col md:flex-row px-4 sm:px-5 w-full justify-center items-center">
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
