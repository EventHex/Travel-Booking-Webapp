import React, { useState, useEffect, useRef } from "react";
import { Ticket, Calendar, MapPin, Flag } from "lucide-react";
import {
  Filter,
  Date,
  Destination,
  Search,
  Location,
  Visa,
  MainBackground,
  Acitivty,
  Inurance,
  Flight,
  SearchGray,
} from "../../../assets";

const Index = ({ isNarrow, onClose }) => {
  const [isClicksideBar, setClicksideBar] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("departure");
  const sidebarRef = useRef(null);

  const filterOptions = [
    { id: "visas", label: "Visas Only", icon: Visa },
    { id: "created", label: "Date Created On", icon: Date },
    { id: "departure", label: "Departure Date", icon: Location },
    {
      id: "destination",
      label: "Destination Country",
      icon: Destination,
    },
  ];
  
  const filterOption = [
    { id: "Activities", label: "Activities", icon: Acitivty },
    { id: "Insurance", label: "Insurance", icon: Inurance },
    { id: "flight", label: "flight", icon: Flight },
  ];

  const sidebarOpen = (e) => {
    // Stop propagation to prevent immediate closing
    e.stopPropagation();
    
    if (isNarrow) {
      // Only toggle if in narrow mode
      if (isClicksideBar) {
        // If sidebar is open, set closing state and wait for animation
        setIsClosing(true);
        setTimeout(() => {
          setClicksideBar(false);
          setIsClosing(false);
        }, 300); // Match animation duration
      } else {
        // If sidebar is closed, open it
        setClicksideBar(true);
      }
    }
  };
  
  // Add event listeners to detect clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only run if sidebar is expanded in narrow mode
      if (isNarrow && isClicksideBar && sidebarRef.current) {
        if (!sidebarRef.current.contains(event.target)) {
          // Apply closing animation
          setIsClosing(true);
          setTimeout(() => {
            setClicksideBar(false);
            setIsClosing(false);
          }, 300); // Match animation duration
        }
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isNarrow, isClicksideBar]);
  
  // Add CSS animation for the sliding effect
  React.useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    // Define the keyframes animation
    const animationCSS = `
      @keyframes slideIn {
        0% { transform: translateX(-100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        0% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(-100%); opacity: 0; }
      }
    `;
    
    styleEl.innerHTML = animationCSS;
    document.head.appendChild(styleEl);
    
    // Clean up
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // If clicked to expand from narrow mode
  if (isNarrow && (isClicksideBar || isClosing)) {
    return ( 
      <div
        ref={sidebarRef}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing sidebar
        className="w-[200px]  max-w-md rounded-xl overflow-hidden  z-10 bg-white shadow-lg"
        style={{
          animation: isClosing 
            ? 'slideOut 0.3s ease-in forwards' 
            : 'slideIn 0.3s ease-out forwards'
        }}
      >
        <div className="relative">
          <input
            className="rounded-[14px] border border-[#E2E4E9] py-3 pl-16 w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none hover:shadow-md transition-all duration-300 ease-in-out"
            type="text"
            placeholder="Search..."
            onClick={(e) => e.stopPropagation()} // Prevent sidebar from closing
          />
          <div 
            className="absolute left-8 top-1/2 transform -translate-y-1/2"
            onClick={(e) => e.stopPropagation()} // Prevent sidebar from closing
          >
            <img src={SearchGray} alt="Search" />
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-b">
          <div className="space-y-1">
            <div className="p-3 flex gap-3 text-gray-500">
              <img src={Filter} alt="" /> <span>Popular filters</span>
            </div>
          </div>
          {filterOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${
                selectedOption === option.id
                  ? "bg-white shadow-sm"
                  : "hover:bg-white/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-gray-500">
                  <img src={option.icon} alt="" />
                </div>
                <span className="text-gray-600 font-medium text-sm">
                  {option.label}
                </span>
              </div>

              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  selectedOption === option.id
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedOption === option.id && (
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-gradient-to-b">
          <div className="space-y-1">
            <div className="p-3 flex gap-3 text-gray-500">
              <img src={Filter} alt="" /> <span>Booking</span>
            </div>
          </div>
          {filterOption.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${
                selectedOption === option.id
                  ? "bg-white shadow-sm"
                  : "hover:bg-white/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-gray-500">
                  <img src={option.icon} alt="" />
                </div>
                <span className="text-gray-600 font-medium text-sm">
                  {option.label}
                </span>
              </div>

              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  selectedOption === option.id
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedOption === option.id && (
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Narrow sidebar with only icons
  if (isNarrow) {
    return (
      <div 
        onClick={(e) => sidebarOpen(e)}
        className="w-full rounded-xl overflow-hidden cursor-pointer"
      >
        <div className="rounded-xl bg-gradient-to-b">
          <div className="space-y-1">
            <div className="p-3 flex justify-center text-gray-500">
              <img src={Search} alt="" className="mx-auto" /> 
            </div>
          </div>
          <div className="space-y-1">
            <div className="p-3 flex justify-center text-gray-500">
              <img src={Filter} alt="" className="mx-auto" /> 
            </div>
          </div>
          {filterOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`flex cursor-pointer items-center justify-center rounded-lg p-3 transition-colors ${
                selectedOption === option.id
                  ? "bg-white shadow-sm"
                  : "hover:bg-white/50"
              }`}
            >
              <div className="flex items-center">
                <div className="text-gray-500">
                  <img src={option.icon} alt={option.label} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-gradient-to-b">
          <div className="space-y-1">
            <div className="p-3 flex justify-center text-gray-500">
              <img src={Filter} alt="" className="mx-auto" /> 
            </div>
          </div>
          {filterOption.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`flex cursor-pointer items-center justify-center rounded-lg p-3 transition-colors ${
                selectedOption === option.id
                  ? "bg-white shadow-sm"
                  : "hover:bg-white/50"
              }`}
            >
              <div className="flex items-center">
                <div className="text-gray-500">
                  <img src={option.icon} alt={option.label} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Normal/expanded sidebar with text and icons
  return (
    <div className="w-full  flex flex-col gap-10  rounded-xl overflow-hidden">
      <div className=" relative">
        <input
          className="rounded-[14px] border border-[#E2E4E9] py-3 pl-16 w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none hover:shadow-md transition-all duration-300 ease-in-out"
          type="text"
          placeholder="Search..."
          onClick={(e) => e.stopPropagation()} // Prevent sidebar from closing when clicking the search input
        />
        <div 
          className="absolute left-8 top-1/2 transform -translate-y-1/2"
          onClick={(e) => e.stopPropagation()} // Prevent sidebar from closing when clicking the search icon
        >
          <img src={SearchGray} alt="Search" />
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-b">
        <div className="space-y-1">
          <div className="p-3 flex gap-3 text-gray-500">
            <img src={Filter} alt="" /> <span>Popular filters</span>
          </div>
        </div>
        {filterOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${
              selectedOption === option.id
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-gray-500">
                <img src={option.icon} alt="" />
              </div>
              <span className="text-gray-600 font-medium text-sm">
                {option.label}
              </span>
            </div>

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                selectedOption === option.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }`}
            >
              {selectedOption === option.id && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl mb-10 bg-gradient-to-b">
        <div className="space-y-1">
          <div className="p-3 flex gap-3 text-gray-500">
            <img src={Filter} alt="" /> <span>Booking</span>
          </div>
        </div>
        {filterOption.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${
              selectedOption === option.id
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-gray-500">
                <img src={option.icon} alt="" />
              </div>
              <span className="text-gray-600 font-medium text-sm">
                {option.label}
              </span>
            </div>

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                selectedOption === option.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }`}
            >
              {selectedOption === option.id && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;