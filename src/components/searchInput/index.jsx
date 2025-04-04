import React, { useState, useRef } from "react";
import { Search, CalenderUp, CalenderDown, Home, Flight } from "../../assets";


const SearchinputText = ({Dropdown}) => {
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const citizenInputRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [goingToIsFocused, setGoingToIsFocused] = useState(false);
    const dropdownRef = useRef(null);
    const goingToInputRef = useRef(null);

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };
  const handleInputFocus = () => {
    setCitizenIsFocused(true);
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setCitizenIsFocused(false);
    // Don't immediately hide dropdown to allow for clicks on dropdown items
    // setTimeout(() => setShowDropdown(false), 100);
  };
  const handleGoingToIconClick = () => {
    goingToInputRef.current.focus();
  };
  const handleOptionSelect = (option) => {
    if (citizenInputRef.current) {
      citizenInputRef.current.value = option;
    }
    setShowDropdown(false);
  };
  return (
    <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl md:flex-row ">
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
                      {Dropdown.map((option) => (
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
  );
};

const SearchinputDate = () => {
  const [travelDateIsFocused, setTravelDateIsFocused] = useState(false);
  const [returnDateIsFocused, setReturnDateIsFocused] = useState(false);
  const travelDateInputRef = useRef(null);
  const returnDateInputRef = useRef(null);

  const handleTravelDateIconClick = () => {
    travelDateInputRef.current.focus();
  };

  const handleReturnDateIconClick = () => {
    returnDateInputRef.current.focus();
  };

  return (
    <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl md:flex-row">
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
  );
};

export { SearchinputText, SearchinputDate };