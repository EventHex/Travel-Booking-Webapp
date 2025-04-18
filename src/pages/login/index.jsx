import React, { useState, useEffect } from "react";
import { Phone, Mail, ChevronDown } from "lucide-react";
import { Logo, LoginBackgorund } from "../../assets";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        console.log("Fetching countries...");
        const response = await fetch("http://localhost:8078/api/v1/country");
        const data = await response.json();
        console.log("API Response:", data);

        if (data.success && Array.isArray(data.data)) {
          setCountries(data.data);
          console.log("Countries set:", data.data);
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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8078/api/v1/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
            authenticationType: "phone",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsOtpSent(true);
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("OTP error:", err);
      setError("Failed to connect to server");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8078/api/v1/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
            otp,
            authenticationType: "phone",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Failed to connect to server");
    }
  };

  const handleReset = () => {
    setPhoneNumber("");
    setOtp("");
    setError("");
    setIsOtpSent(false);
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

      <div className="h-[70vh] md:h-screen w-full md:w-[40%] flex flex-col">
        <div className="h-4/5 flex justify-center items-center">
          <div className="flex flex-col w-[90%] sm:w-[80%] md:w-[85%] lg:w-[70%] px-4 md:px-0">
            <div>
              <h1 className="text-[28px] md:text-[32px] font-[600] text-blue-500 mb-4 md:mb-8">
                Login to CNN
              </h1>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            <form
              onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}
              className="space-y-5 md:space-y-6"
            >
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm md:text-base font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryList(!showCountryList)}
                      className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-700 text-sm"
                    >
                      {selectedCountry.code}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showCountryList && (
                      <div className="absolute left-10 top-full mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {loading ? (
                          <div className="px-3 py-2 text-sm text-gray-500">
                            Loading...
                          </div>
                        ) : countries.length === 0 ? (
                          <div className="px-3 py-2 text-sm text-gray-500">
                            No countries available
                          </div>
                        ) : (
                          countries.map((country) => (
                            <button
                              key={country.key}
                              type="button"
                              onClick={() => {
                                console.log("Selected country:", country);
                                setSelectedCountry(country);
                                setShowCountryList(false);
                              }}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                            >
                              <span className="font-medium">
                                {country.code}
                              </span>
                              <span className="text-gray-600">
                                {country.countryName}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-24 w-full p-3 bg-white border border-gray-300 rounded-xl text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isOtpSent}
                  />
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

              <div className="flex w-[full] justify-center gap-1 md:gap-4 mt-14">
                <button
                  type="submit"
                  className="py-3 w-[65%] px-4 text-[14px] font-[400] bg-blue-500 hover:bg-blue-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isOtpSent ? "Verify OTP" : "Send OTP"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="border-[#375DFB] w-[30%] flex-none py-3 px-4 md:px-6 bg-white border text-[14px] font-[400] hover:bg-gray-50 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="h-1/5 flex justify-center items-center">
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
