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
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, MapPin } from "lucide-react";

import Header from "../../components/header";
import { SearchInputText, SearchInputDate } from "../../components/searchInput";
import instance from "../../instance";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("Visas");
  const [citizenOptions, setCitizenOptions] = useState([]);
  const [dropDownPlace, setDropDownPlace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const location = useLocation();
  const [searchParams, setSearchParams] = useState({
    destination: "",
    goingTo: "",
    travelDate: "",
    returnDate: "",
  });
  const tabs = [
    { id: "Visas", icon: Visa },
    { id: "Activities", icon: Acitivty },
    { id: "Insurance", icon: Inurance },
    { id: "Flights", icon: Flight },
  ];

  // Fetch country data from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await instance.get("/country?limit=0");
        console.log(response, "response country");
        const data = await response.data;

        if (data.success && data.response) {
          const countries = data.response.map((country) => ({
            icon: <MapPin size={14} className="text-[gray]" />,
            title: country.countryName,
            id: country.key,
          }));

          setCitizenOptions(countries);
          setDropDownPlace(countries);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

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

    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showGoingToDropdown, setShowGoingToDropdown] = useState(false);
    const fromDropdownRef = useRef(null);
    const goingToDropdownRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const searchDropdownRef = useRef(null);
    const handleFromInputFocus = () => {
      setCitizenIsFocused(true);
      setShowFromDropdown(true);
      setShowGoingToDropdown(false);
    };

    const handleGoingToFocus = () => {
      setGoingToIsFocused(true);
      setShowGoingToDropdown(true);
      setShowFromDropdown(false);
    };

    const handleFromInputBlur = () => {
      setCitizenIsFocused(false);
    };

    const handleGoingToBlur = () => {
      setGoingToIsFocused(false);
    };

    const handleOptionSelect = (option, inputRef, isFromInput) => {
      if (inputRef.current) {
        inputRef.current.value = option.title;
      }
      if (isFromInput) {
        setShowFromDropdown(false);
      } else {
        setShowGoingToDropdown(false);
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          fromDropdownRef.current &&
          !fromDropdownRef.current.contains(event.target) &&
          citizenInputRef.current &&
          !citizenInputRef.current.contains(event.target)
        ) {
          setShowFromDropdown(false);
        }
        if (
          goingToDropdownRef.current &&
          !goingToDropdownRef.current.contains(event.target) &&
          goingToInputRef.current &&
          !goingToInputRef.current.contains(event.target)
        ) {
          setShowGoingToDropdown(false);
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
    const [searchData, setSearchData] = useState({
      destination: "",
      goingTo: "",
      travelDate: "",
      returnDate: "",
    });

    const handleInputChange = (field, value) => {
      console.log("hii");
      console.log(value, "value");
      setSearchData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
      
      console.log(searchData, "searchData");
    };

    // Add this function to handle search button click
    const handleSearchClick = (e) => {
      // Validate required fields
      if (
        !searchData.destination ||
        !searchData.goingTo ||
        !searchData.travelDate
      ) {
        e.preventDefault();
        // You can add a toast or alert here if needed
        return;
      }
      // Log the search data to console
      // console.log("Search Data:", searchData);
    };

    console.log(searchData.destination, "destination");


    const User = "user-icon-placeholder";
    const handleSearchOptionSelect = (option) => {
      setSearchQuery(option.title);
      setShowSearchDropdown(false);
      // Add any additional actions you want to perform when an option is selected
    };


    // const dropDownData = [
    //   {
    //     image: Placeholder,
    //     subtitle: "united arab emirates",
    //     title: "UAE",
    //     id: 1,
    //   },
    //   {
    //     image: Placeholder,
    //     subtitle: "Chhatrapati Shivaji Maharaj International Airport",
    //     title: "Mumbai",
    //     id: 2,
    //   },
    //   {
    //     image: Placeholder,
    //     subtitle: "Cochin International Airport",
    //     title: "Kochin",
    //     id: 3,
    //   },
    //   {
    //     image: Placeholder,
    //     subtitle: "muzhappiland beach",
    //     title: "Kannur",
    //     id: 4,
    //   },
    //   {
    //     image: Placeholder,
    //     subtitle: "Goa beach",
    //     title: "Goa",
    //     id: 5,
    //   },
    //   {
    //     image: Placeholder,
    //     subtitle: "hilte business park",
    //     title: "kozhikode",
    //     id: 6,
    //   },
    // ];
    switch (activeTab) {
      case "Visas":
        return (
          <>
            <div className="flex gap-3 flex-col">
              <SearchInputText
                dropDownPlace={dropDownPlace}
                dropDownData={citizenOptions}
                onInputChange={handleInputChange}
                value={{
                  destination: searchData.destination,
                  goingTo: searchData.goingTo,
                  
                }}
                isLoading={isLoading}
              />
              <SearchInputDate
                onDateChange={handleInputChange}
                value={{
                  travelDate: searchData.travelDate,
                  returnDate: searchData.returnDate,
                }}
              />
              <div className="flex justify-end">
                <Link
                  to={{
                    pathname: "/searchResult",
                    search: `?destination=${encodeURIComponent(
                      searchData.destination
                    )}&goingTo=${encodeURIComponent(
                      searchData.goingTo
                    )}&travelDate=${encodeURIComponent(
                      searchData.travelDate
                    )}&returnDate=${encodeURIComponent(searchData.returnDate)}`,
                  }}
                >
                  <button
                    className={`text-white py-2 px-5 rounded-xl bg-[#000099] border text-[16px] ${
                      !searchData.destination ||
                      !searchData.goingTo ||
                      !searchData.travelDate
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#0000cc]"
                    }`}
                    onClick={handleSearchClick}
                    disabled={
                      !searchData.destination ||
                      !searchData.goingTo ||
                      !searchData.travelDate
                    }
                  >
                    Search
                  </button>
                </Link>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setShowSearchDropdown(false)}
            />

            {showSearchDropdown && (
              <div
                ref={searchDropdownRef}
                className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
              >
                {dropDownData.map((option) => (
                  <div
                    key={option.id}
                    className="flex gap-5  px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSearchOptionSelect(option)}
                  >
                    <div className="flex">
                      <img className="w-[70px] " src={option.image} alt="" />
                    </div>
                    <div className="flex  w-full ">
                      <p className="flex flex-col text-[16px] gap-2">
                        <span>{option.title}</span>
                        <span className="text-[gray] text-[14px]">
                          {option.subtitle}
                        </span>
                      </p>
                    </div>
                    <div></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "Insurance":
        return (
          <>
            <div className="flex gap-3  flex-col ">
              <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl md:flex-row ">
                <div className="w-full relative">
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
                      value={""}
                      placeholder="Going to"
                      className="w-full bg-transparent outline-none"
                      onFocus={handleGoingToFocus}
                      onBlur={handleGoingToBlur}
                    />
                  </div>

                  {showGoingToDropdown && (
                    <div
                      ref={goingToDropdownRef}
                      className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                    >
                      {dropDownPlace.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-start px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                          onClick={() =>
                            handleOptionSelect(option, goingToInputRef, false)
                          }
                        >
                          <div className="flex">
                            <p className="flex items-center text-[14px] gap-2">
                              {option.icon}
                              <span>{option.title}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* <SearchInputText
                dropDownPlace={dropDownPlace}
                dropDownData={citizenOptions}
              /> */}
              <SearchInputDate />
            </div>
          </>
        );
      case "Flights":
        return (
          <>
            <div className="flex gap-3  flex-col ">
              <SearchInputText
                dropDownPlace={dropDownPlace}
                dropDownData={citizenOptions}
              />
              <SearchInputDate />
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
        {/* ****************footer**************************** */}
        <div className="w-full flex justify-center rounded-t-[30px] py-6 sm:py-8 md:py-10 items-center bg-gradient-to-r from-[#1C1C82] to-[#24186C]">
          <div className="max-w-[1300px] flex flex-col md:flex-row px-4 sm:px-5 w-full justify-center items-center">
            <div className="w-full md:w-[50%] mb-4 md:mb-0 flex justify-center md:justify-start">
              {/* Responsive logo size */}
              <Link to="/">
                <img className="w-[100px]" src={Logo} alt="" />
              </Link>
            </div>
            <div className="w-full md:w-[50%] flex flex-col md:flex-row md:justify-end items-center md:items-end space-y-2 md:space-y-0 md:space-x-4">
              <div className="text-center md:text-right">
                <p className="text-[#B3B3B3] text-[12px] sm:text-[13px] md:text-[14px] font-[400]">
                  CNN Holidays, ZAIKAS EF COMPLEX,{" "}
                </p>
                <p className="text-[#B3B3B3] text-[12px] sm:text-[13px] md:text-[14px] font-[400]">
                  Fort Road, Cannanore, Kannur - 670001
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[#B3B3B3] text-[12px] sm:text-[13px] md:text-[14px] font-[400]">
                  CNN Holidays, ZAIKAS EF COMPLEX,{" "}
                </p>
                <p className="text-[#B3B3B3] text-[12px] sm:text-[13px] md:text-[14px] font-[400]">
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