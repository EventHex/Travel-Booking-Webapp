import React, { useState,useEffect, useRef } from "react";
import { Search, AlertTriangle, Shield } from "lucide-react";
import { Calendar, Info, MapPin, Plane, ArrowRight } from 'lucide-react';
import axios from 'axios';

import Header from "../../components/header";
import { Flight, Home,CalenderUp,CalenderDown, MainBackground } from "../../assets";
import { Link } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { SearchInputDate, SearchInputText } from "../../components/searchInput";

const TravelVisaBooking = () => {
  const [searchParams] = useSearchParams();
  const goingTo = searchParams.get('goingTo') || '';
  const destination = searchParams.get('destination') || '';
  const travelDate = searchParams.get('travelDate') || '';
  const returnDate = searchParams.get('returnDate') || '';
  const [visaOptions, setVisaOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchData = {
    goingTo,
    destination,
    travelDate,
    returnDate,
  };
  
  useEffect(() => {
    console.log('Received search data:', searchData);
  }, [goingTo, destination, travelDate,returnDate]);

  useEffect(() => {
    const fetchVisaData = async () => {
      try {
        const response = await axios.get('http://localhost:8078/api/v1/visa');
        
        if (response.data.success && response.data.response) {
          const visaData = response.data.response.map(visa => ({
            title: visa.title,
            status: visa.status === 'Active' ? 'approved' : 'warning',
            message: `Estimated visa arrival by ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
            details: {
              entry: visa.entry,
              validity: visa.validity,
              duration: visa.duration,
              processingTime: visa.processingTime,
              absconding: 'AED 5,000',
            },
            price: {
              original: visa.publicPrice,
              discounted: visa.publicOfferPrice,
              savings: 'Save up to 39%'
            },
            variant: visa.status === 'Active' ? 'green' : 'blue'
          }));
          setVisaOptions(visaData);
        } else {
          setError('Failed to fetch visa data');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVisaData();
  }, []);

  const citizenInputRef = useRef(null);
  const goingToInputRef = useRef(null);
  const TravellingInputDateRef = useRef(null);
const TrvellingInputEndDateRef = useRef (null); 

  // Track focus state for all four inputs
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [goingToIsFocused, setGoingToIsFocused] = useState(false);
  const [TravellingFocuse, setTravellingFocuse] = useState(false);
const [TrvellingEndFocus,setTrvellingEndFocus] = useState(false);

  // Track which input is focused

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };

  const handleGoingToIconClick = () => {
    goingToInputRef.current.focus();
  };

  const handleTrevellingIconClick = () => {
    TravellingInputDateRef.current.focus ();
  }

  const handleTravellingEndIconClick = () =>{
    TrvellingEndFocus.current.focus ();
  }
  
  

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

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
     
        <div className="flex gap-5 flex-col  justify-between md:flex-row p-5 w-full">
            <div className="flex gap-3">

         <SearchInputText    data={{ destination, goingTo  }}  />
         <SearchInputDate   data={{  travelDate, returnDate }} />
            </ div>
           
            <div className="flex items-center">
              <button className="text-white py-2 px-5 rounded-xl bg-[#375DFB] border text-[16px]">
                Search
              </button>
         
          </div>
    </div>
    {/* *************  ticket section ***************** */}
    <main className="max-w-7xl mx-auto py-4 sm:py-6   sm:px-6 lg:px-8">
      <div className="space-y-4 md:space-y-6">
        {visaOptions.map((option, index) => (
          <div 
            key={index} 
            className={`bg-gradient-to-br from-white to-gray-50/80 rounded-[20px] shadow-sm overflow-hidden`}
          >
            <div 
              className={`px-4 sm:px-6 py-3 sm:py-4 text-white font-medium ${
                option.status === 'warning' 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400' 
                  : option.variant === 'green' 
                    ? 'bg-gradient-to-r from-green-500 to-green-400' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-500'
              }`}
            >
              {option.title}
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex items-start space-x-3 mb-4 sm:mb-6">
                {option.status === 'warning' ? (
                  <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Info className="h-4 w-4 text-orange-500" />
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
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

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-6">
                {Object.entries(option.details).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs sm:text-sm font-medium text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="mt-1">
                      {key === 'documents' ? (
                        <a href="#" className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:underline">View Here</a>
                      ) : (
                        <span className="text-xs sm:text-sm text-gray-600">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
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
                <Link to='/form' className="flex justify-end sm:justify-start">
                  <button className="px-4 sm:px-6 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-700 hover:text-white transition-colors whitespace-nowrap">
                    Select
                  </button>
                </Link>
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