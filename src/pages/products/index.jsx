import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

import Header from "../../components/header";
import {
  Flight,
  Home,
  CalenderDown,
  CalenderUp,
  Search,
  MainBackground,
  Allicon,
  Tour,
  Transport,
  Luggage,
  Restaurant,
  Billi,
  Landscape,
  FlightIcon,
  Ship,
} from "../../assets";
const index = () => {
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [citizenInputRef, setCitizenInputRef] = useState(null);

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };
  const navItems = [
    { icon: Allicon, text: "Tickets" },
    { icon: Tour, text: "Tours" },
    { icon: Transport, text: "Transportation" },
    { icon: Luggage, text: "Travel Services" },
    { icon: Restaurant, text: "Food & Drink" },
    { icon: Billi, text: "Entertainment" },
    { icon: Landscape, text: "Adventure" },
    { icon: FlightIcon, text: "Aerial Sightseeing" },
    { icon: Ship, text: "Cruises" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Popularity");

  const options = [
    "Popularity",
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Rating",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${MainBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <div className="w-full flex justify-center">
        <div className="max-w-[1300px] w-full flex-col   flex justify-center">
          <div className="w-full flex items-center   justify-center">
            <div className="flex gap-3   w-[80%] mt-15 mb-15 flex-col ">
              <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
                <div className="w-full">
                  <div className="flex items-center p-3">
                    <span
                      className={`mr-2 cursor-pointer ${
                        citizenIsFocused ? "opacity-100" : "opacity-20"
                      }`}
                      onClick={handleCitizenIconClick}
                    >
                      <img src={Search} alt="Home icon" />
                    </span>
                    <input
                      style={{ border: "none" }}
                      ref={citizenInputRef}
                      type="text"
                      placeholder="Search for Activities ( eg. Burje Khalifa, Universal Studio)"
                      className="w-full bg-transparent outline-none"
                      onFocus={() => setCitizenIsFocused(true)}
                      onBlur={() => setCitizenIsFocused(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* *************tabs***************** */}
          <div>
            <div className="w-full bg-[#F6F8FA]  rounded-xl  border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <nav className="flex items-center justify-start overflow-x-auto py-4 no-scrollbar">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md mr-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <span className="mr-2">
                        {" "}
                        <img src={item.icon} alt="tabs" />{" "}
                      </span>
                      <span>{item.text}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {/* *********************cards****************** */}
          <div className="w-full mt-10 md:mt-24 ">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="p-4">
                {" "}
                <h1 className="text-[32px] font-[600]">Select Your Experiences</h1>
              </div>
              <div className="p-4">
                {" "}
                <div className="relative p-3  border-[#CDD0D5] rounded-[10px] flex flex-col border w-56">
                  <div className="text-xs  text-gray-500 mb-1">
                    Sort Activities by
                  </div>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-between w-full  text-sm text-gray-900    focus:outline-none"
                  >
                    <span>{selectedOption}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {isOpen && (
                    <div className="absolute z-10 w-full mt-10 bg-white border border-gray-200 rounded-md shadow-lg">
                      <ul className="py-1">
                        {options.map((option) => (
                          <li
                            key={option}
                            onClick={() => selectOption(option)}
                            className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                          >
                            <span className="flex-grow">{option}</span>
                            {selectedOption === option && (
                              <Check className="w-4 h-4 text-blue-600" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
