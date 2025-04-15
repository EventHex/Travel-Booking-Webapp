import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Logo, LoginBackgorund } from "../../assets";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (!isOtpSent) {
        // First step: Send OTP
        const response = await fetch("http://localhost:8078/api/v1/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (data.success) {
          setIsOtpSent(true);
          setSuccess("OTP has been sent to your email");
        } else {
          setError(data.message || "Failed to send OTP");
        }
      } else {
        // Second step: Verify OTP and update password
        const response = await fetch("http://localhost:8078/api/v1/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setSuccess("Password reset successful!");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError(data.message || "Password reset failed");
        }
      }
    } catch (err) {
      console.error("Reset password error:", err);
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
              Reset Your Password
            </h1>
          </div>
        </div>
      </div>

      <div className="h-[70vh] md:h-screen w-full md:w-[40%] flex flex-col">
        <div className="h-4/5 flex justify-center items-center">
          <div className="flex flex-col w-[90%] sm:w-[80%] md:w-[85%] lg:w-[70%] px-4 md:px-0">
            <div>
              <h1 className="text-[28px] md:text-[32px] font-[600] text-blue-500 mb-4 md:mb-8">
                {isOtpSent ? "Reset Password" : "Forgot Password"}
              </h1>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="space-y-2">
                <label className="block text-sm md:text-base font-medium text-gray-900">
                  Email
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isOtpSent}
                  />
                </div>
              </div>

              {isOtpSent && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm md:text-base font-medium text-gray-900">
                      OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm md:text-base font-medium text-gray-900">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isOtpSent ? "Reset Password" : "Send OTP"}
                </button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-800 text-sm md:text-base">
                Remember your password?{" "}
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

export default ResetPassword; 