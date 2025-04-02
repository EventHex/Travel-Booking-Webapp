import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "./sideBar";
import { PhoneCall, AlertTriangle } from 'lucide-react';

const Index = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("profile"); // Default option
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
      setIsNarrowScreen(window.innerWidth < 880); // Set the new state based on width
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Handle the option selection from sidebar
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    console.log("Selected option:", optionId); // For debugging
    
    // You can add additional logic here based on the selected option
  };
  
  // Render different content based on selected option
  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
    
       

  return (
    <div className="flex  bg-red-300 flex-col md:flex-row gap-4 w-full max-w-6xl mx-auto p-4">
      {/* Emergency Hotline Card */}
      <div className="bg-gray-100 rounded-xl p-6 flex-1 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="text-red-500" size={24} />
          <h2 className="font-bold text-lg text-gray-800">Atlys Emergency 24x7 Hotline:</h2>
          <a 
            href="tel:+91 22 48934242" 
            className="text-blue-600 font-bold"
          >
            +91 22 48934242
          </a>
        </div>
        <p className="text-gray-700 ml-1">
          Please only call if it's a real emergency or 
          escalation. For everything else, please create a 
          support ticket.
        </p>
      </div>

      {/* Product Questions Card */}
      <div className="bg-gray-100 rounded-xl p-6 flex-1 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <PhoneCall className="text-gray-700" size={24} />
          <h2 className="font-bold text-lg text-gray-800">Have questions about the product?</h2>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full font-medium transition duration-200">
            Join product demo call
          </button>
        </div>
      </div>
    </div>
  );

         ;
      case "Transactions":
        return <div><h2 className="text-xl font-bold mb-4">Transactions</h2><p>View your transaction history</p></div>;
      case "LoadWallet":
        return <div><h2 className="text-xl font-bold mb-4">Load Wallet</h2><p>Add funds to your wallet</p></div>;
      case "Overstay":
        return <div><h2 className="text-xl font-bold mb-4">Overstay Management</h2><p>Manage overstay information</p></div>;
      case "Training":
        return <div><h2 className="text-xl font-bold mb-4">Training</h2><p>Access training materials</p></div>;
      case "changepassword":
        return <div><h2 className="text-xl font-bold mb-4">Change Password</h2><p>Update your account password</p></div>;
      case "passport":
        return <div><h2 className="text-xl font-bold mb-4">Passport Details</h2><p>View and update passport information</p></div>;
      case "traveller-photo":
        return <div><h2 className="text-xl font-bold mb-4">Traveller Photo</h2><p>Manage your traveller photos</p></div>;
      case "Signout":
        // Handle sign out logic here
        return <div><h2 className="text-xl font-bold mb-4">Signing Out...</h2></div>;
      default:
        return <div><h2 className="text-xl font-bold mb-4">Dashboard</h2><p>Welcome to your dashboard</p></div>;
    }
  };

  return (
    <div>
      <Header />
      
      <div className="flex justify-center">
        <div className="max-w-[1300px] w-full">
          <div className="w-full bg-gray-100 p-4 flex-col flex">
            <div className="flex items-center space-x-4">
              {/* Avatar/Logo Circle */}
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">
                  CNN HOLIDAYS LLP
                </h1>
                <p className="text-gray-600">admin@cnnholidays.com</p>
              </div>
            </div>
            
            <div className="flex mt-10">
              <div className="w-auto pr-3 mt-3 md:w-[20%]">
                <div
                  className={`${
                    isNarrowScreen ? "w-[50px]" : "w-full"
                  } min-w-[50px] mb-6 md:mb-0 transition-all duration-300`}
                >
                  {/* Pass the callback function to Sidebar */}
                  <Sidebar isNarrow={isNarrowScreen} onOptionSelect={handleOptionSelect} />
                </div>
              </div>
              <div className="w-full md:w-[70%] border-l border-[#868C98] flex flex-col ">
                <div className="p-2 md:p-5">
                  {/* Render content based on selected option */}
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;