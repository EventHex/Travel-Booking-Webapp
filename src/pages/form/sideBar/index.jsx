import React, { useState, useEffect, useRef } from "react";
import { Star, TicketsPlane, Plane, Users , SendHorizontal, IdCard } from "lucide-react";
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
  const [selectedOption, setSelectedOption] = useState("Review"); // Default selected option changed to "Review"
  const sidebarRef = useRef(null);

  const filterOptions = [
    { id: "InternalID", label: "Internal ID", icon: <IdCard /> },
    { id: "GroupName", label: "Group Name", icon: <Users /> },
    { id: "Traveller1", label: "Traveller 1", icon: <Plane /> },
    { id: "Passport", label: "Passport", icon: <TicketsPlane /> },
    { id: "Review", label: "Review", icon: <Star />},
    { id: "Submit", label: "Submit", icon:<SendHorizontal /> },

  ];

  // const filterOption = [
  //   // { id: "InternalID", label: "Internal ID", icon: Visa },
  //   // { id: "GroupName", label: "Group Name", icon: Date },
  //   // { id: "Traveller1", label: "Traveller 1", icon: Location },
  //   { id: "Review", label: "Review", icon: Acitivty },
  //   { id: "Submit", label: "Submit", icon: Inurance },
  //   // { id: "Submit1", label: "Submit1", icon: Inurance },
  //   // { id: "Submit2", label: "Submit2", icon: Inurance },
  //   // { id: "Submit3", label: "Submit3", icon: Inurance },
  //   // { id: "Submit4", label: "Submit4", icon: Inurance },
  //   // { id: "Submit5", label: "Submit5", icon: Inurance },
  // ];

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

  // Custom radio button renderer for the options
  const renderRadioButton = (optionId) => (
    <div
      className={`flex h-5 w-5 items-center justify-center rounded-full border ${selectedOption === optionId
          ? "border-blue-500 bg-blue-500"
          : "border-gray-300"
        }`}
    >
      {selectedOption === optionId && (
        <div className="h-2 w-2 rounded-full bg-white"></div>
      )}
    </div>
  );

  // Custom blue link renderer
  const renderBlueLink = (text) => (
    <div className="p-3 flex">
      <span className="text-blue-500 font-[400] cursor-pointer">{text}</span>
    </div>
  );

  // If clicked to expand from narrow mode
  if (isNarrow && (isClicksideBar || isClosing)) {
    return (
      <div
        ref={sidebarRef}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing sidebar
        className="w-[200px] max-w-md rounded-xl overflow-hidden z-10 bg-white shadow-lg"
        style={{
          animation: isClosing
            ? 'slideOut 0.3s ease-in forwards'
            : 'slideIn 0.3s ease-out forwards'
        }}
      >
        <div className="rounded-xl bg-gradient-to-b">
          {/* Filter options - Internal ID, Group Name, Traveller 1 */}
          {filterOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${selectedOption === option.id
                  ? "bg-white shadow-sm"
                  : "hover:bg-white/50"
                }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 font-medium text-sm">
                  {option.label}
                </span>
              </div>
              {renderRadioButton(option.id)}
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-gradient-to-b">
          {/* Blue links section */}
          {renderBlueLink("passport")}
          {renderBlueLink("Traveller Photo")}

          {/* Review and Submit options */}
          {filterOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${selectedOption === option.id
                  ? "bg-white shadow-sm"
                  : "hover:bg-white/50"
                }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 font-medium text-sm">
                  {option.label}
                </span>
              </div>
              {renderRadioButton(option.id)}
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

          </div>
          {filterOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`flex cursor-pointer items-center justify-center rounded-lg p-3 transition-colors ${selectedOption === option.id
                  ? "bg-white shadow-sm"
                  : "hover:bg-white/50"
                }`}
            >
              <div className="flex items-center">
                <div className="text-gray-500">
                  {option.icon ? (
                    option.icon
                  ) : (
                    <img src={option.image} alt={option.label} className="w-5 h-5" /> // Render image
                  )}
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
    <div className="w-full flex flex-col gap-4 rounded-xl overflow-hidden">
      <div className="rounded-xl bg-gradient-to-b">
        {/* Filter options - Internal ID, Group Name, Traveller 1 */}
        {filterOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${selectedOption === option.id
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
              }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-gray-600 font-medium text-sm">
                {option.label}
              </span>
            </div>
            {renderRadioButton(option.id)}
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-gradient-to-b">
        {/* Blue links section */}
        {/* {renderBlueLink("passport")}
        {renderBlueLink("Traveller Photo")} */}

        {/* Review and Submit options */}
        {/* {filterOptions.map((option) => (
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
              <span className="text-gray-600 font-medium text-sm">
                {option.label}
              </span>
            </div>
            {renderRadioButton(option.id)}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Index;