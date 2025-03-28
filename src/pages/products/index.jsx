import React, { useState } from "react";
import Header from "../../components/header";
import { Flight, Home, CalenderDown, CalenderUp, Search } from "../../assets";
const index = () => {
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [citizenInputRef, setCitizenInputRef] = useState(null);
  const [goingToIsFocused, setGoingToIsFocused] = useState(false);
  const [goingToInputRef, setGoingToInputRef] = useState(null);
  
  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };
  const handleGoingToIconClick = () => {
    goingToInputRef.current.focus();
  };

  return (

    <div>
      <Header />
      <div className="w-full flex justify-center">
        <div className="max-w-[1300px] w-full flex justify-center">
          <div className="w-[80%] flex items-center m-15 bg-amber-200 justify-center">

        <div className="flex gap-3  w-full flex-col ">
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
      </div>
      </div>
    </div>
  );
};

export default index;
