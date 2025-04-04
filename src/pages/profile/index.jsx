import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "./sideBar";
import Transaction from "./transaction";
import Overstay from "./Overstay";
import Training from "./Training";
import Password from "./password";
import Loadwallet from "./LaodWallet";
import { PhoneCall, AlertTriangle,Upload,Save } from 'lucide-react';
import { MainBackground } from "../../assets";

const Index = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("profile"); // Default option
  const [country, setCountry] = useState('India');
  const [addressLine1, setAddressLine1] = useState('LII-5350, CNN HOLIDAYS, KANNUR, Kannur, Kannur, Kerala, 670001');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('Kannur');
  const [state, setState] = useState('KL');
  const [zipCode, setZipCode] = useState('670001');
  const [name, setName] = useState('Siraju Keloth');
  const [aadharNumber, setAadharNumber] = useState('911438326566');
  const [address, setAddress] = useState('Keloth House, Cherumavilayi, Mavilayi PO, Mundalur, Kannur, Kannur, Kerala, India, Mundalur');

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

  const [file, setFile] = useState(null);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  // Render different content based on selected option
  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
    
       

  return (
    <div className=" w-full">
    <div className="flex   flex-col   md:flex-row gap-4 w-full max-w-6xl   mb-10">
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
    {/* ************form ********** */}

    <div className="w-full  mx-auto bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full  rounded-bl-full z-0"></div>
        
        {/* Content Container */}
        <div className="relative z-10 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Agency Information</h1>
          
          <div className="w-full border-t border-gray-200 mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Country */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-500">Country</label>
              <div className="relative">
                <select 
                  className="w-full p-3 border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Account Type */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-500">Account Type</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="b2b"
                defaultValue="b2b"
              />
            </div>
            
            {/* Contact Number */}
            <div className="space-y-2 md:col-span-1">
              <label className="block text-sm text-gray-500">Contact Number</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="+919072951259"
                defaultValue="+919072951259"
              />
            </div>
            
            <div className="md:col-span-1"></div>
            
            {/* GST Number */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-500">GST Number</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="32AATFC0952A1ZV"
                defaultValue="32AATFC0952A1ZV"
              />
            </div>
            
            {/* PAN Card */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-500">PAN Card</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder=""
              />
            </div>
          </div>
          
          {/* GST Certificate */}
          <div className="mt-8 space-y-2">
            <label className="block text-sm font-medium text-gray-900">GST Certificate</label>
            <p className="text-sm text-gray-600">GST Input Credit will not be available if GST certificate is not uploaded</p>
            
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 text-lg">Drag and drop files to upload</p>
                <p className="text-gray-400 mt-2">or</p>
                <button className="mt-4 px-6 py-2 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Select file
                </button>
                <p className="text-gray-400 text-sm mt-4">Supports PDF.</p>
                <p className="text-gray-400 text-sm">Max file size 5MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        {/* Cancelled Cheque Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Cancelled Cheque</h2>
          
          {/* Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-gray-500">Drag and drop files to upload</p>
              <p className="text-gray-400 mt-2">or</p>
              <button className="mt-4 px-6 py-2 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Select file
              </button>
              <p className="text-gray-400 text-sm mt-4">Supports JPEG, JPG, PDF, PNG.</p>
              <p className="text-gray-400 text-sm">Max file size 5MB</p>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full border-t border-gray-200"></div>
        
        {/* Address Form */}
        <div className="space-y-6">
          {/* Address Line 1 */}
          <div>
            <label htmlFor="address-line-1" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1
            </label>
            <input
              type="text"
              id="address-line-1"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
          </div>
          
          {/* Address Line 2 */}
          <div>
            <label htmlFor="address-line-2" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              id="address-line-2"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />
          </div>
          
          {/* City, State, Zip Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            
            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                id="state"
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            
            {/* Zip Code */}
            <div>
              <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                id="zip-code"
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center">
            <Save className="w-5 h-5 mr-2" />
            Save
          </button>
        </div>
      </div>
    </div>
    </div>
    <div className="w-full  mx-auto pt-5">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Aadhar details</h1>
        
        {/* Divider */}
        <div className="w-full border-t border-gray-200 mb-8"></div>
        
        {/* Form Fields */}
        <div className="space-y-8">
          {/* Name and Aadhar Number Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="aadhar-name" className="block text-base text-gray-700">
                Name as per Aadhar
              </label>
              <input
                type="text"
                id="aadhar-name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            {/* Aadhar Number Field */}
            <div className="">
              <label htmlFor="aadhar-number" className="block text-base text-gray-700">
                Aadhar number
              </label>
              <input
                type="text"
                id="aadhar-number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
              />
            </div>
          </div>
          
          {/* Address Field */}
          <div className="space-y-2">
            <label htmlFor="address" className="block text-base text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="w-full  mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Office Photo</h1>
        
        {/* Divider */}
        <div className="w-full border-t border-gray-200 mb-8"></div>
        
        {/* Upload Section */}
        <div className="space-y-2">
          <label className="block text-base text-gray-700 mb-2">
            Office photo
          </label>
          
          {/* Drag and Drop Area */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-gray-500">Drag and drop files to upload</p>
              <p className="text-gray-400 mt-2">or</p>
              
              {/* File Input Button */}
              <label className="mt-4 px-6 py-2 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
                <span>Select file</span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".jpeg,.jpg,.pdf,.png"
                />
              </label>
              
              {/* File Type Info */}
              <p className="text-gray-400 text-sm mt-4">Supports JPEG, JPG, PDF, PNG.</p>
              <p className="text-gray-400 text-sm">Max file size 5MB</p>
              
              {/* Show selected file if any */}
              {file && (
                <div className="mt-4 text-sm text-indigo-600">
                  Selected file: {file.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );

         ;
      case "Transactions":
        return <Transaction/>
      case "LoadWallet":
        return <Loadwallet/>
      case "Overstay":
        return <Overstay/>
      case "Training":
        return <Training/>
      case "changepassword":
        return <Password/>
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
    <div
    style={{
          
      backgroundImage: `url(${MainBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    >
      <Header />
      
      <div className="flex justify-center">
        <div className="max-w-[1300px] w-full">
          <div className="w-full   flex-col flex">
            <div className="flex items-center   p-2 space-x-4">
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
              <div className="w-auto pr-3 mt-3 mb-10 md:w-[16%]">
                <div
                  className={`${
                    isNarrowScreen ? "sticky  top-5 w-[50px]" : "sticky top-5 w-full"
                  } min-w-[50px] mb-6 md:mb-0 transition-all duration-300`}
                >
                  {/* Pass the callback function to Sidebar */}
                  <Sidebar isNarrow={isNarrowScreen} onOptionSelect={handleOptionSelect} />
                </div>
              </div>
              <div className="w-full md:w-[80%]   flex flex-col ">
                <div className="p-2 md:p-1">
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