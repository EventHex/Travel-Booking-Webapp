import React, { useState, useRef } from "react";
import { Search, AlertTriangle, Shield } from "lucide-react";
import Header from "../../components/header";
import { Flight, Home,CalenderUp,CalenderDown, MainBackground } from "../../assets";
const TravelVisaBooking = () => {
  const citizenInputRef = useRef(null);
  const goingToInputRef = useRef(null);


  // Track focus state for all four inputs
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [goingToIsFocused, setGoingToIsFocused] = useState(false);


  // Track which input is focused

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };

  const handleGoingToIconClick = () => {
    goingToInputRef.current.focus();
  };

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

            <button className=" text-white py-2 px-5 rounded-xl bg-[#375DFB] border text-[16px]">Search</button>
            </div>

          </div>

          
   <h1>sdfsd</h1>
      </div>
      </div>
    </>
  );
};

export default TravelVisaBooking;
