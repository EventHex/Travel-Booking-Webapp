import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Logo, LoginBackgorund } from "../../assets";

const index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

            <form className="space-y-5 md:space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm md:text-base font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="admin@cnnholidays.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-xl text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm md:text-base font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Placeholder text..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-xl text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <a
                  href="#"
                  className="block text-xs md:text-sm text-blue-500 hover:underline mt-1"
                >
                  Reset My Password
                </a>
              </div>

              <div className="flex  w-[full]   justify-center gap-1 md:gap-4 mt-14">
                <button
                  type="submit"
                  className="py-3  w-[65%] px-4 text-[14px] font-[400]  bg-blue-500 hover:bg-blue-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className="border-[#375DFB]   w-[30%]  flex-none py-3 px-4 md:px-6 bg-white border text-[14px] font-[400] hover:bg-gray-50 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
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
            <span className="text-[#375DFB] cursor-pointer"> Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;