import React, { useState } from "react";
import { Mail, Eye, EyeOff, Building, User } from "lucide-react";
import { Logo, LoginBackgorund } from "../../assets";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!otpSent) {
        // First click - show OTP field
        setOtpSent(true);
        return;
      }

      // Second click - verify OTP
      const response = await fetch("http://localhost:8078/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          authenticationType: "email",
          otp: otp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.customMessage || data.message || "Signup failed");
      }
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
                        className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

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
                        className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

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
                        className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[16px] font-medium text-gray-900">
                      Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
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
                    placeholder="Enter OTP sent to your email"
                    className="w-full p-3 bg-white border border-gray-300 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full p-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {otpSent ? "Verify OTP" : "Sign up"}
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