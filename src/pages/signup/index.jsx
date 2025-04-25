import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Eye,
  EyeOff,
  Building,
  User,
  Phone,
  ChevronDown,
  Search,
} from "lucide-react";
import { Logo, LoginBackgorund } from "../../assets";
import { useNavigate } from "react-router-dom";
import instance from "../../instance";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    name: "",
    phoneNumber: "",
    userType: "",
  });
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
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
  const [dropdownRef, setDropdownRef] = useState(null);
  const [userTypes, setUserTypes] = useState([]);

  useEffect(() => {
    const fetchUserTypes = async () => {
      const response = await instance.get("/user-type/select");
      const data = response.data;
      console.log(data, "data");
      setUserTypes(data);
    
    };
    fetchUserTypes();
  },[] );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
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
      if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  const handleChange = (e) => {
    console.log(e.target.value, "e.target.value");
    console.log(e.target.name, "e.target.name");
    console.log(e.target.id, "e.target.id");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      // userType: userTypes.find(type => type.value === e.target.value)?.id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!otpSent) {
        // First click - send OTP
        const postData = {
          phoneNumber: formData.phoneNumber,
          phoneCode: selectedCountry.code,
          authenticationType: "phone",
          // otpType: "signup",
          userType: formData.userType,
          name: formData.name,
          companyName: formData.companyName,
          email: formData.email,
          registerType: "signup",
        }
        console.log(postData, "postData");
        const response = await instance.post("account/send-otp", postData);

        // console.log(response, "response");
        const data = response.data;
        if (data.success) {
          setOtpSent(true);
        } else {
          setError(data.message || "Failed to send OTP");
        }
        return;
      }

      // Second click - verify OTP and signup
      const verifyResponse = await instance.post("account/register", {
        phoneNumber: formData.phoneNumber,
        phoneCode: selectedCountry.code,
        userType: formData.userType,
        name: formData.name,
        companyName: formData.companyName,
        email: formData.email,
        otp: otp,
        authenticationType: "phone",
      });
      console.log(verifyResponse,"verifyResponse");

      const verifyData = verifyResponse.data;
      if (!verifyData.success) {
        setError(verifyData.message || "Invalid OTP");
        return;
      } else {
        navigate("/login");
      }

      // // If OTP is verified, proceed with signup
      // const signupResponse = await instance.post("/auth/signup-with-otp", {
      //   ...formData,
      //   phoneCode: selectedCountry.code,
      // });

      // const signupData = signupResponse.data;
      // if (signupData.success) {
      //   localStorage.setItem("token", signupData.token);
      //   localStorage.setItem("refreshToken", signupData.refreshToken);
      //   localStorage.setItem("user", JSON.stringify(signupData.user));
      //   navigate("/dashboard");
      // } else {
      //   setError(signupData.message || "Signup failed");
      // }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div
        style={{
          backgroundImage: `url(${LoginBackgorund})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full md:w-[60%] h-[30vh] md:h-[100vh] hidden md:flex items-center py-10 bg-[#375Dfd] flex-col"
      >
        <div className="w-full md:w-[80%]">
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

      <div className="h-screen w-full md:w-[40%] flex flex-col">
        <div className="flex-1 flex justify-center items-center pt-6 md:pt-10">
          <div className="flex flex-col w-[90%] sm:w-[80%] md:w-[85%] lg:w-[70%] px-4 md:px-0">
            <div className="mb-6">
              <h1 className="text-[28px] md:text-[32px] font-[600] text-blue-500">
                {otpSent ? "Enter OTP" : "Sign up to CNN"}
              </h1>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!otpSent ? (
                <>
                  <div className="space-y-1">
                    <label className="block text-[16px] font-medium text-gray-900">
                      User Type
                    </label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border border-gray-300 rounded-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select User Type</option>
                      {userTypes.map((type) => (
                        type.value !== "Admin" && (
                          <option id={type.id} key={type.id} value={type.id}>
                            {type.value}
                          </option>
                        )
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[16px] font-medium text-gray-900">
                      Full Name
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {formData.userType === "agent" && (
                    <div className="space-y-1">
                      <label className="block text-[16px] font-medium text-gray-900">
                        Company Name
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Company Name"
                          className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-[16px] font-medium text-gray-900">
                      Email
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[16px] font-medium text-gray-900">
                      Phone Number
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <div className="flex items-center w-full p-4 bg-white border border-gray-300 rounded-[14px]">
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
                        <div className="w-px h-6 bg-gray-300 mx-3"></div>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="234567890"
                          className="flex-1 text-sm md:text-base text-gray-700 focus:outline-none bg-transparent"
                          required
                        />
                      </div>
                      {showCountryList && (
                        <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-300 rounded-[14px]shadow-lg z-50 max-h-[320px] overflow-hidden">
                          <div className="p-2 border-b border-gray-200">
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search country"
                                className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-[14px] focus:outline-none focus:border-blue-500"
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
                </>
              ) : (
                <div className="space-y-1">
                  <label className="block text-[16px] font-medium text-gray-900">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP sent to your phone"
                    className="w-full p-3 bg-white border border-gray-300 rounded-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full p-3 bg-blue-500 text-white rounded-[14px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {otpSent ? "Verify OTP & Sign Up" : "Get OTP "}
                </button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-800 text-sm md:text-base">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-[#375DFB] cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
