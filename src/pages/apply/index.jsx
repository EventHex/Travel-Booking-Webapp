import React, { useState, useRef } from "react";
import { Search, AlertTriangle, Shield } from "lucide-react";
import { Calendar, Info, MapPin, Plane, ArrowRight } from 'lucide-react';

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

  const [applicationType, setApplicationType] = useState('individual');
  const [visaType, setVisaType] = useState('Tourist Visa');
  const [internalId, setInternalId] = useState('');
  const [groupName, setGroupName] = useState('Tourist Visa');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const visaOptions = [
    'Tourist Visa',
    'Business Visa',
    'Student Visa',
    'Work Visa',
    'Transit Visa'
  ];

  const visaOption = [
    {
      title: 'Combo offer ⭐: Vietnam E-Visa + Reliance Travel Insurance',
      status: 'warning',
      message: 'Your visa will not come in time before your departure date. Your visa will be delivered on 6th Mar, 2025',
      details: {
        entry: 'Single',
        validity: '30 Days',
        duration: '30 Days',
        processingTime: '7 business days',
        absconding: 'AED 5,000',
      },
      price: {
        original: '₹5,013',
        discounted: '₹3,891',
        savings: 'Save up to 39%'
      },
      variant: 'blue'
    },
    {
      title: 'Combo offer ⭐: Vietnam E-Visa + Reliance Travel Insurance',
      status: 'approved',
      message: 'Estimated visa arrival by 4th Mar, 2025',
      details: {
        entry: 'Single',
        validity: '30 Days',
        duration: '30 Days',
        processingTime: '7 business days',
        absconding: 'AED 5,000',
      },
      price: {
        original: '₹5,013',
        discounted: '₹3,891',
        savings: 'Save up to 39%'
      },
      variant: 'green'
    },
    {
      title: 'Combo offer ⭐: Vietnam E-Visa + Reliance Travel Insurance',
      status: 'approved',
      message: 'Estimated visa arrival by 4th Mar, 2025',
      details: {
        entry: 'Single',
        validity: '30 Days',
        duration: '30 Days',
        processingTime: '7 business days',
        absconding: 'AED 5,000',
      },
      price: {
        original: '₹5,013',
        discounted: '₹3,891',
        savings: 'Save up to 39%'
      },
      variant: 'blue'
    },
    {
      title: 'UAE 30 Days Single Entry Super Fast Express(24 Working Hours)',
      status: 'approved',
      message: 'Estimated visa arrival by 4th Mar, 2025',
      details: {
        entry: 'Single',
        validity: '30 Days',
        duration: '30 Days',
        processingTime: '7 business days',
        absconding: 'AED 5,000',
      },
      price: {
        original: '₹5,013',
        discounted: '₹3,891',
        savings: 'Save up to 39%'
      },
      variant: 'blue'
    }
  ];


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
{/* ************text **************** */}
<div className="w-full p-6 rounded-3xl shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Are You Applying For</h1>
      </div>
      
      <div className="flex justify-end mb-6">
        <div className="rounded-xl p-1 border border-gray-300">
          <button
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
              applicationType === 'individual' ? 'bg-blue-600 text-white' : 'text-gray-700'
            }`}
            onClick={() => setApplicationType('individual')}
          >
            Individual
          </button>
          <button
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
              applicationType === 'group' ? 'bg-blue-600 text-white' : 'text-gray-700'
            }`}
            onClick={() => setApplicationType('group')}
          >
            Group
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label htmlFor="visa-type" className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
          <div className="relative">
            <button
              type="button"
              id="visa-type"
              className="relative w-full bg-white border py-5 border-gray-300 rounded-md pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="block truncate text-gray-500">{visaType}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {visaOptions.map((option) => (
                  <div
                    key={option}
                    className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
                    onClick={() => {
                      setVisaType(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span className="block truncate text-gray-500">{option}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="internal-id" className="block text-sm font-medium text-gray-700 mb-1">Internal Id</label>
          <input
            type="text"
            id="internal-id"
            className="shadow-sm py-5 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 text-gray-500 bg-white"
            placeholder="Internal Id"
            value={internalId}
            onChange={(e) => setInternalId(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="group-name" className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
          <input
  type="text"
  id="group-name"
  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-5 px-3 text-gray-500 bg-white transition duration-200 ease-in-out hover:border-blue-300"
  placeholder="Group Name"
  value={groupName}
  onChange={(e) => setGroupName(e.target.value)}
/>
        </div>
      </div>
    </div>
    {/* ****************************** */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Citizen Of"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Going to"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Travel Date"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Return Date"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>
        <button className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Search
        </button>
      </div> */}

      <div className="space-y-4">
        {visaOption.map((option, index) => (
          <div 
            key={index} 
            className={`bg-gradient-to-br from-white to-gray-50/80 rounded-[20px] shadow-sm overflow-hidden`}
          >
            <div 
              className={`px-6 py-4 text-white font-medium ${
                option.status === 'warning' 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400' 
                  : option.variant === 'green' 
                    ? 'bg-gradient-to-r from-green-500 to-green-400' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-500'
              }`}
            >
              {option.title}
            </div>
            <div className="p-6">
              <div className="flex items-start space-x-3 mb-6">
                {option.status === 'warning' ? (
                  <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <Info className="h-4 w-4 text-orange-500" />
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-500" />
                  </div>
                )}
                <p className={`text-sm ${
                  option.status === 'warning' 
                    ? 'text-orange-600' 
                    : option.variant === 'green' 
                      ? 'text-green-600' 
                      : 'text-blue-600'
                }`}>
                  {option.message}
                </p>
              </div>

              <div className="grid grid-cols-6 gap-4 mb-6">
                {Object.entries(option.details).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-sm font-medium text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="mt-1">
                      {key === 'documents' ? (
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">View Here</a>
                      ) : (
                        <span className="text-sm text-gray-600">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-400 line-through">{option.price.original}</span>
                    <span className="text-xl font-semibold text-gray-900">{option.price.discounted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {option.price.savings}
                    </span>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">(Includes Discounted Visa & Insurance)</span>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
    </div>
      </div>
    </>
  );
};

export default TravelVisaBooking;
