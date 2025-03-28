import React, { useState } from "react";
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
  const [goingToInputRef, setGoingToInputRef] = useState(null);

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };
  const navItems = [
    { icon: Allicon, text: 'Tickets' },
    { icon: Tour, text: 'Tours' },
    { icon: Transport, text: 'Transportation' },
    { icon: Luggage, text: 'Travel Services' },
    { icon: Restaurant, text: 'Food & Drink' },
    { icon: Billi, text: 'Entertainment' },
    { icon: Landscape, text: 'Adventure' },
    { icon:FlightIcon, text: 'Aerial Sightseeing' },
    { icon: Ship, text: 'Cruises' }
  ];
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
              <span className="mr-2">  <img src={item.icon} alt="tabs" /> </span>
              <span>{item.text}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
