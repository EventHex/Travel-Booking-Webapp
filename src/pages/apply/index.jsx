import React, { useState, useEffect, useRef } from "react";
import { Search, AlertTriangle, Shield } from "lucide-react";
import { Calendar, Info, MapPin, Plane, ArrowRight } from "lucide-react";
import Instance from "../../instance";
import Header from "../../components/header";
import {
  Flight,
  Home,
  CalenderUp,
  CalenderDown,
  MainBackground,
} from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { SearchInputDate, SearchInputText } from "../../components/searchInput";
import { useLocation } from "react-router-dom";

const TravelVisaBooking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    destination: "",
    goingTo: "",
    travelDate: "",
    returnDate: "",
  });

  console.log(searchParams.get("travelDate"));
  const [visaOptions, setVisaOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [citizenOptions, setCitizenOptions] = useState([]);
  const [dropDownPlace, setDropDownPlace] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8078/api/v1/country');
        const data = await response.json();
        
        if (data.success && data.response) {
          const countryOptions = data.response.map(country => ({
            icon: <MapPin size={14} className="text-[gray]" />,
            title: country.countryName,
            id: country._id
          }));
          setCitizenOptions(countries);
          setDropDownPlace(countries);
          // setCountries(countryOptions);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError('Failed to load countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Get URL parameters and set them to state
    setFormData({
      destination: searchParams.get("destination") || "",
      goingTo: searchParams.get("goingTo") || "",
      travelDate: searchParams.get("travelDate") || "",
      returnDate: searchParams.get("returnDate") || "",
    });
  }, [searchParams]);

  useEffect(() => {
    const fetchVisaData = async () => {
      try {
        setIsSearching(true);
        const response = await Instance.get("visa");
        
        if (response.data.success && response.data.response) {
          const visaDataArray = response.data.response;
          const destination = searchParams.get("destination")?.toLowerCase() || "";
          const goingTo = searchParams.get("goingTo")?.toLowerCase() || "";
          const travelDate = searchParams.get("travelDate") || "";
          const returnDate = searchParams.get("returnDate") || "";

          let filteredData = visaDataArray;
          if (destination || goingTo || travelDate || returnDate) {
            filteredData = visaDataArray.filter((visa) => {
              const fromCountryMatch = !destination || 
                visa.country?.value?.toLowerCase() === destination.toLowerCase() 
                // (destination.toLowerCase() === "dubai" && visa.country?.value?.toLowerCase() === "uae") ||
                // (destination.toLowerCase() === "uae" && visa.country?.value?.toLowerCase() === "dubai");

              const toCountryMatch = !goingTo || 
                visa.toCountry?.value?.toLowerCase() === goingTo.toLowerCase() 
                // (goingTo.toLowerCase() === "dubai" && visa.toCountry?.value?.toLowerCase() === "uae") ||
                // (goingTo.toLowerCase() === "uae" && visa.toCountry?.value?.toLowerCase() === "dubai");

              let dateMatch = true;
              if (travelDate || returnDate) {
                try {
                  const normalizeDate = (dateStr) => {
                    if (!dateStr) return null;
                    const date = new Date(dateStr);
                    date.setHours(0, 0, 0, 0);
                    return date;
                  };

                  const searchStart = normalizeDate(travelDate);
                  const searchEnd = normalizeDate(returnDate);
                  const visaStart = normalizeDate(visa.fromDate);
                  const visaEnd = normalizeDate(visa.toDate);

                  if (searchStart && visaStart && visaEnd) {
                    dateMatch = searchStart >= visaStart && searchStart <= visaEnd;
                  }

                  if (searchEnd && visaStart && visaEnd) {
                    const endDateMatch = searchEnd >= visaStart && searchEnd <= visaEnd;
                    dateMatch = dateMatch && endDateMatch;
                  }
                } catch (error) {
                  console.error("Date comparison error:", error);
                  dateMatch = true;
                }
              }

              return fromCountryMatch && toCountryMatch && dateMatch;
            });
          }

          const visaData = filteredData.map((visa) => ({
            title: visa.title,
            status: visa.status === "Active" ? "approved" : "warning",
            message: `Estimated visa arrival by ${new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toLocaleDateString()}`,
            details: {
              entry: visa.entry,
              validity: visa.validity,
              duration: visa.duration,
              processingTime: visa.processingTime,
              absconding: "AED 5,000",
            },
            price: {
              original: visa.publicPrice,
              discounted: visa.publicOfferPrice,
              savings: "Save up to 39%",
            },
            variant: visa.status === "Active" ? "green" : "blue",
          }));

          setVisaOptions(visaData);
        } else {
          setError("Failed to fetch visa data");
        }
      } catch (err) {
        console.error("Error fetching visa data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    };

    fetchVisaData();
  }, [searchParams]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setShowDropdown(true);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (formData.destination) params.set("destination", formData.destination);
    if (formData.goingTo) params.set("goingTo", formData.goingTo);
    if (formData.travelDate) params.set("travelDate", formData.travelDate);
    if (formData.returnDate) params.set("returnDate", formData.returnDate);

    navigate(`?${params.toString()}`);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleCountrySelect = (country) => {
    setFormData(prev => ({
      ...prev,
      destination: country.title
    }));
    setShowDropdown(false);
  };

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className=""
        style={{
          backgroundImage: `url(${MainBackground})`,
          backgroundSize: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          height: visaOptions.length === 0 ? "700px " : "",
          minHeight: "700px",
          width: "100%",
        }}
      >
        <Header />

        <div className="max-w-[1300px] w-full mx-auto p-4 rounded-lg">
          {/* Search Form */}
          <div className="flex gap-5 flex-col justify-between md:flex-row p-5 w-full">
            <div className="flex gap-3">
              <div className="relative">
                <SearchInputText
                  dropDownPlace={dropDownPlace}
                  dropDownData={citizenOptions}
                  value={{
                    destination: formData.destination,
                    goingTo: formData.goingTo
                  }}
                  onInputChange={(field, value) => handleInputChange(field, value)}
                />
                {showDropdown && countries.length > 0 && (
                  <div 
                    ref={dropdownRef}
                    className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
                  >
                    {/* {countries
                      .filter(country => 
                        country.title.toLowerCase().includes(formData.destination.toLowerCase())
                      )
                      .map((country) => (
                        <div
                          key={country.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          onClick={() => handleCountrySelect(country)}
                        >
                          {country.icon}
                          {country.title}
                        </div>
                      ))} */}
                       {dropDownPlace.map((option) => (
              <div
                key={option.id}
                className="flex items-start px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  handleOptionSelect(option, goingToInputRef, false)
                }
              >
                <div className="flex">
                  <p className="flex items-center text-[14px] gap-2">
                    {option.icon}
                    <span>{option.title}</span>
                  </p>
                </div>
              </div>
            ))}
          
                  </div>
                )}
              </div>
            </div>
            <div>
              <SearchInputDate
                data={formData}
                onDateChange={handleInputChange}
              />
            </div>

            <div className="flex items-center">
              <button
                className="text-white py-2 px-5 rounded-xl bg-[#375DFB] border text-[16px] disabled:opacity-50"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Visa Options Section */}
          <main className="max-w-7xl mx-auto py-4 sm:py-6   sm:px-6 lg:px-8">
            <div className="space-y-4 md:space-y-6">
              {visaOptions.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    No visa options match your search criteria
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your search parameters.
                  </p>
                </div>
              ) : (
                visaOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-white to-gray-50/80 rounded-[20px] shadow-sm overflow-hidden`}
                  >
                    <div
                      className={`px-4 sm:px-6 py-3 sm:py-4 text-white font-medium ${
                        option.status === "warning"
                          ? "bg-gradient-to-r from-orange-500 to-orange-400"
                          : option.variant === "green"
                          ? "bg-gradient-to-r from-green-500 to-green-400"
                          : "bg-gradient-to-r from-blue-600 to-blue-500"
                      }`}
                    >
                      {option.title}
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start space-x-3 mb-4 sm:mb-6">
                        {option.status === "warning" ? (
                          <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <Info className="h-4 w-4 text-orange-500" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Shield className="h-4 w-4 text-blue-500" />
                          </div>
                        )}
                        <p
                          className={`text-sm ${
                            option.status === "warning"
                              ? "text-orange-600"
                              : option.variant === "green"
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          {option.message}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-6">
                        {Object.entries(option.details).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-xs sm:text-sm font-medium text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                            <div className="mt-1">
                              {key === "documents" ? (
                                <a
                                  href="#"
                                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                  View Here
                                </a>
                              ) : (
                                <span className="text-xs sm:text-sm text-gray-600">
                                  {value}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-gray-400 line-through">
                              {option.price.original}
                            </span>
                            <span className="text-xl font-semibold text-gray-900">
                              {option.price.discounted}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              {option.price.savings}
                            </span>
                            <button className="text-gray-400 hover:text-gray-500">
                              <Info className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-xs text-gray-400">
                            (Includes Discounted Visa & Insurance)
                          </span>
                        </div>
                        <Link
                          to="/form"
                          className="flex justify-end sm:justify-start"
                        >
                          <button className="px-4 sm:px-6 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-700 hover:text-white transition-colors whitespace-nowrap">
                            Select
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default TravelVisaBooking;
