import React, { useState, useEffect, useRef } from "react";
import { Phone, Mail, ChevronDown, Search } from "lucide-react";
import { Logo, LoginBackgorund } from "../../assets";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../../instance";
import { useAuth } from "../../context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    countryName: "India",
    code: "+91",
    key: "IN",
  });
  const [showCountryList, setShowCountryList] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        console.log("Fetching countries...");
        const response = await instance.get("/country?limit=245");
        const data = response.data;

        if (data.success && Array.isArray(data.response)) {
          setCountries(data.response);
        } else {
          console.error("Invalid data structure:", data);
          setError("Invalid country data received");
        }
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Failed to load countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showCountryList && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showCountryList]);

  const filteredCountries = countries.filter(
    (country) =>
      country.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryList(false);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await instance.post("/account/send-otp", {
        phoneNumber,
        authenticationType: "phone",
      });
      
      if (response.data && response.data.success) {
        setIsOtpSent(true);
      } else {
        setError(response.data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.response?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    try {
      const response = await instance.post("/account/login", {
        phoneNumber,
        otp,
        authenticationType: "phone",
      });
      
      if (response.data && response.data.success) {
        login(response.data);
        
        // Redirect to the page they tried to access, or dashboard
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(error.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleReset = () => {
    setPhoneNumber("");
    setOtp("");
    setError("");
    setIsOtpSent(false);
  };
  return (
    <div className="w-full p-4  md:p-0 justify-center items-center pt-[50%] md:pt-0   flex flex-col md:flex-row">
      <div
        style={{
          backgroundImage: `url(${LoginBackgorund})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full md:w-[60%] h-[30vh] md:h-[100vh] hidden md:flex items-center py-10 bg-[#375Dfd] flex-col"
      >
        <div className="w-full  md:w-[80%]">
          <div>
            <img src={Logo} alt="Logo" className="w-32 md:w-40 lg:w-48" />
          </div>
          <div className="text-white">
            <h1 className="text-2xl font-manrope md:text-4xl lg:text-5xl xl:text-[56px] font-[300] leading-tight">
              Book 3000+ Handpicked
            </h1>
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-[56px] font-[500] leading-tight">
              Experiences
              <br className="hidden md:block" />
              Worldwide
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[40%] flex shadow-sm md:shadow-none   flex-col gap-10 ">
        <div className="flex justify-center items-center ">
          <div className="flex flex-col w-[90%] sm:w-[80%] md:w-[85%] lg:w-[70%] px-4 md:px-0">
            <div>
              <h1 className="text-[18px]  text-center md:text-[32px] font-[600] text-blue-500 mb-4 md:mb-8">
                Login to CNN
              </h1>
            </div>

            {error && (
              <div className=" border border-red-400 text-red-700 px-4 py-3 rounded  ">
                {error}
              </div>
            )}
            <form
              onSubmit={isOtpSent ? handleVerifyOTP : handleSendOtp}
              className="flex flex-col gap-5"
            >
              <div className="">
                <label
                  htmlFor="phone"
                  className="block  mb-2 text-sm md:text-base font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="flex items-center w-full md:py-4 py-2 px-3  bg-white border border-gray-300 rounded-full">
                    <div className="flex items-center min-w-[90px]">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <button
                        type="button"
                        onClick={() => setShowCountryList(!showCountryList)}
                        className="flex items-center gap-1 text-gray-700 text-sm"
                      >
                        {selectedCountry?.code || "+91"}
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="w-px  h-6 bg-gray-300 mx-3"></div>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="234567890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 text-sm md:text-base text-gray-700 focus:outline-none bg-transparent"
                      disabled={isOtpSent}
                    />
                  </div>
                  {showCountryList && (
                    <div ref={dropdownRef} className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-[320px] overflow-hidden">
                      <div className="p-2 border-b border-gray-200">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search country"
                            className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto max-h-[250px]">
                        {loading ? (
                          <div className="px-4 py-2 text-sm text-gray-500">
                            Loading...
                          </div>
                        ) : filteredCountries.length === 0 ? (
                          <div className="px-4 py-2 text-sm text-gray-500">
                            No countries found
                          </div>
                        ) : (
                          filteredCountries.map((country) => (
                            <button
                              key={country.key}
                              type="button"
                              onClick={() => {
                                handleCountrySelect(country);
                                setSearchQuery("");
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                            >
                              <span className="text-gray-600">
                                {country.countryName}
                              </span>
                              <span className="text-gray-900 font-medium">
                                {country.code}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isOtpSent && (
                <div className="space-y-2">
                  <label
                    htmlFor="otp"
                    className="block text-sm md:text-base font-medium text-gray-900"
                  >
                    OTP
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-xl text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex w-[full] justify-center gap-12 md:gap-4 ">
                <button
                  type="submit"
                  className="   md:py-3 w-[65%]   md:px-4 text-[14px] font-[400] bg-blue-500 hover:bg-blue-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isOtpSent ? "Verify OTP" : "Send OTP"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="border-[#375DFB] w-[30%] flex-none py-2 md:px-6 bg-white border text-[14px] font-[400] hover:bg-gray-50 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className=" flex justify-center mb-10 items-center">
          <p className="text-gray-800 text-sm md:text-base">
            Don't have an Account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#375DFB] cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;