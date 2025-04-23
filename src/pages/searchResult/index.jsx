import React, { useState, useEffect, useRef } from "react";
import { Search, AlertTriangle, Shield } from "lucide-react";
import { Calendar, Info, MapPin, Plane, ArrowRight } from "lucide-react";
import instance from "../../instance";
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

  const [searchResults, setSearchResults] = useState([]);
  const [filteredVisaOptions, setFilteredVisaOptions] = useState([]);
  const [visaOptions, setVisaOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [citizenOptions, setCitizenOptions] = useState([]);
  const [dropDownPlace, setDropDownPlace] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  // Fetch countries on component mount
// Fetch country data from API
useEffect(() => {
  const fetchCountries = async () => {
    try {
      setIsLoading(true);
      const response = await instance.get("/country?limit=0");
      console.log(response, "response country");
      const data = await response.data;

      if (data.success && data.response) {
        const countries = data.response.map((country) => ({
          icon: <MapPin size={14} className="text-[gray]" />,
          title: country.countryName,
          id: country.key,
        }));

        setCitizenOptions(countries);
        setDropDownPlace(countries);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setIsLoading(false);
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
        const response = await instance.get(`/get-visa?origin_country=${searchParams.get("destination")}&destination_country=${searchParams.get("goingTo")}&travel_date=${searchParams.get("returnDate")}`);

        console.log(response, "response");
        if (response.data.success && response.data.response) {
          const visaDataArray = response.data.response.visa_types;
          
          const visaData = visaDataArray.map((visa) => ({
            title: visa.process_name,
            purpose: visa.purpose,
            status: "approved",
            message: `Estimated visa arrival by ${new Date(visa.eta_timestamp * 1000).toLocaleDateString()}`,
            details: {
              entry: visa.process_details.is_multiple_entry ? "Multiple Entry" : "Single Entry",
              validity: `${visa.process_details.entry_validity.amount} ${visa.process_details.entry_validity.units}`,
              duration: `${visa.process_details.entry_length_stay.amount} ${visa.process_details.entry_length_stay.units}`,
              processingTime: `${visa.processing_time.duration} ${visa.processing_time.unit}`,
              absconding: "AED 5,000",
            },
            price: {
              original: `${visa.visa_fee.amount} ${visa.visa_fee.currency}`,
              discounted: `${visa.visa_fee.amount + visa.service_fee.amount} ${visa.visa_fee.currency}`,
              savings: "Save up to 39%",
            },
            variant: "green",
            required_documents: visa.required_documents || [],
            required_components: visa.required_components || []
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "destination" || field === "goingTo") {
      if (!showDropdown) return; // Only filter if dropdown is shown

      setActiveField(field);
      if (value.trim() === "") {
        setSearchResults(countries);
      } else {
        const filtered = countries.filter((country) =>
          country.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filtered);
      }
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (formData.destination) params.set("destination", formData.destination);
    if (formData.goingTo) params.set("goingTo", formData.goingTo);
    if (formData.travelDate) params.set("travelDate", formData.travelDate);
    if (formData.returnDate) params.set("returnDate", formData.returnDate);

    navigate(`?${params.toString()}`);
  };

  const handleInputFocus = (field) => {
    setIsInputFocused(true);
    setActiveField(field);
    setShowDropdown(true);

    // Show filtered results if there's existing input, otherwise show all countries
    if (formData[field]?.trim()) {
      const filtered = countries.filter((country) =>
        country.title.toLowerCase().includes(formData[field].toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(countries);
    }
  };

  const handleInputBlur = () => {
    // Use setTimeout to allow click events on dropdown items to fire first
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsInputFocused(false);
        setShowDropdown(false);
        setSearchResults([]);
        setActiveField(null);
      }
    }, 150);
  };

  const handleCountrySelect = (country, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: country.title,
    }));
    // Immediately hide dropdown and clear states
    setShowDropdown(false);
    setActiveField(null);
    setSearchResults([]);
    setIsInputFocused(false);
  };

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setActiveField(null);
        setSearchResults([]);
        setIsInputFocused(false);
      }
    };

    const handleInputChange = (field, value) => {
      console.log("hii");
      console.log(value, "value");
      setSearchData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
      
      console.log(searchData, "searchData");
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      <div
        className=""
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
                    goingTo: formData.goingTo,
                  }}
                  onInputChange={handleInputChange}
                  // onInputChange={(field, value) =>
                  //   handleInputChange(field, value)
                  // }
                  onFocus={(field) => handleInputFocus(field)}
                  onBlur={handleInputBlur}
                  inputRef={inputRef}
                />
                {showDropdown && searchResults.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
                  >
                    {searchResults.map((country) => (
                      <div
                        key={country.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() =>
                          handleCountrySelect(country, activeField)
                        }
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {country.icon}
                        {country.title}
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
          <main className="max-w-7xl mx-auto py-4 sm:py-6 sm:px-6 lg:px-8">
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
                        option.variant === "green"
                          ? "bg-gradient-to-r from-green-500 to-green-400"
                          : "bg-gradient-to-r from-blue-600 to-blue-500"
                      }`}
                    >
                      {option.title}
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start space-x-3 mb-4 sm:mb-6">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-sm text-blue-600">
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
                              <span className="text-xs sm:text-sm text-gray-600">
                                {value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {option.required_documents.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Required Documents:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {option.required_documents.map((doc, idx) => (
                              <li key={idx}>{doc.label}</li>
                            ))}
                          </ul>
                        </div>
                      )}

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
                          to={`/form?purpose=${option.purpose}&process_name=${encodeURIComponent(option.title)}`}
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
