import React, { useState, useRef } from 'react'
import {
    Search
} from "../../assets";

const index = () => {
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const citizenInputRef = useRef(null);

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };

  return (
    <div>
        <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-1 sm:py-2 md:flex-row">
                <div className="w-full">
                  <div className="flex items-center p-2 sm:p-3">
                    <span
                      className={`mr-2 cursor-pointer ${
                        citizenIsFocused ? "opacity-100" : "opacity-20"
                      }`}
                      onClick={handleCitizenIconClick}
                    >
                      <img src={Search} alt="Home icon" className="w-4 sm:w-auto" />
                    </span>
                    <input
                      style={{ border: "none" }}
                      ref={citizenInputRef}
                      type="text"
                      placeholder="Search for Activities ( eg. Burje Khalifa, Universal Studio)"
                      className="w-full bg-transparent outline-none text-sm sm:text-base"
                      onFocus={() => setCitizenIsFocused(true)}
                      onBlur={() => setCitizenIsFocused(false)}
                    />
                  </div>
                </div>
              </div>
    </div>
  )
}

export default index