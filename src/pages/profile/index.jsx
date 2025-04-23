import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "./sideBar";
import Transaction from "./transaction";
import Overstay from "./Overstay";
import Training from "./Training";
import   PasswordChangeDialog  from "./password";
import Signout from "./signout";
import FileComponent from "../../components/file";
import Loadwallet from "./LaodWallet";
import { PhoneCall, AlertTriangle, Upload, Save } from "lucide-react";
import { MainBackground } from "../../assets";
import instance from "../../instance";
import Input from "../../components/input";
import { CustomSelect } from "../../components/dropdown";
import Loader from "../../components/loader";
const Index = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signOut, setSignOut] = useState(false);

  // Agency state
  const [agencyData, setAgencyData] = useState({
    title: "",
    country: "",
    accountType: "",
    contactNumber: "",
    gst: "",
    pan: "",
    gstCertificate: "",
    cancelledCheque: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
    nameAsPerAadhar: "",
    aadharNumber: "",
    address: "",
    officePhoto: "",
    transactions: [],
  });

  // Fetch agency data
  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        setLoading(true);
        const response = await instance.get("/agency", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (
          response.data.success &&
          response.data.response &&
          response.data.response.length > 0
        ) {
          const agency = response.data.response[0];
          setAgencyData({
            title: agency.title || "",
            country: agency.country || "",
            accountType: agency.accountType || "",
            contactNumber: agency.contactNumber || "",
            gst: agency.gst || "",
            pan: agency.pan || "",
            gstCertificate: agency.gstCertificate || "",
            cancelledCheque: agency.cancelledCheque || "",
            addressLine1: agency.addressLine1 || "",
            addressLine2: agency.addressLine2 || "",
            city: agency.city || "",
            state: agency.state || "",
            zipcode: agency.zipcode || "",
            nameAsPerAadhar: agency.nameAsPerAadhar || "",
            aadharNumber: agency.aadharNumber || "",
            address: agency.address || "",
            transactions: agency.transactions || [],
          });
        } else {
          setError("No agency data found");
        }
      } catch (error) {
        console.error("Error fetching agency data:", error);
        setError(
          error.response?.data?.message || "Failed to fetch agency data"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAgencyData();
  }, []);
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

  // Handle save
  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await instance.post("/agency", agencyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        // Show success message
        console.log("Agency data saved successfully");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error saving agency data:", error);
      setError(error.response?.data?.message || "Failed to save agency data");
    } finally {
      setLoading(false);
    }
  };

  // Update form field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgencyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Render different content based on selected option
  const renderContent = () => {
    switch (selectedOption) {
      case "profile":
        return (
          // <div className=" w-full">
          //   <div className="flex   flex-col   md:flex-row gap-4 w-full max-w-6xl   mb-10">
          //     <div className="bg-gray-100 rounded-xl p-6 flex-1 shadow-sm">
          //       <div className="flex items-center gap-2 mb-3">
          //         <AlertTriangle className="text-red-500" size={24} />
          //         <h2 className="font-[600] text-md text-gray-800">
          //           Atlys Emergency 24x7 Hotline:
          //         </h2>
          //         <a
          //           href="tel:+91 22 48934242"
          //           className="text-blue-600 font-medium"
          //         >
          //           +91 22 48934242
          //         </a>
          //       </div>
          //       <p className="text-black/90   leading-6 ml-1">
          //         Please only call if it's a real emergency or escalation. For
          //         everything else, please create a support ticket.
          //       </p>
          //     </div>

          //     <div className="bg-gray-100 rounded-xl  p-6 flex-1 shadow-sm">
          //       <div className="flex items-center    gap-2 mb-4">
          //         <PhoneCall className="text-gray-700" size={20} />
          //         <h2 className="font-medium text-md text-gray-800">
          //           Have questions about the product?
          //         </h2>
          //       </div>
          //       <div className="flex ">
          //         <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-xl  text-[16px] font-[400] transition duration-200">
          //           Join product demo call
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          //   {/* ************form ********** */}

          //   <div className="w-full  mx-auto bg-white rounded-xl overflow-hidden shadow-sm">
          //     <div className="relative">
          //       {/* Background Gradient */}
          //       <div className="absolute top-0 right-0 w-1/2 h-full  rounded-bl-full z-0"></div>

          //       {/* Content Container */}
          //       <div className="relative z-10 p-8">
          //         <h1 className="text-xl font-bold text-gray-900 mb-8">
          //           Agency Information
          //         </h1>

          //         <div className="flex  flex-col  w-full  ">
          //           <div className="flex   gap-4 w-full">
          //           <div className="w-[50%]">
          //             {" "}
          //             <Input label="Account Type" />
          //           </div>
          //           <div className="w-[50%]">
          //             {" "}
          //             <Input label="Contact Number" />
          //           </div>
          //           </div>
          //           <div>
          //             <CustomSelect
          //               labelClass={"12px"}
          //               className={""}
          //               placeholder={"Tourist Visa"}
          //               label={"Country"}
          //               // options={Visa}
          //             />
          //           </div>
          //         </div>

          //         {/* GST Certificate */}
          //         <div className="mt-8 space-y-2">
          //           <label className="block text-sm font-medium text-gray-900">
          //             GST Certificate
          //           </label>
          //           <p className="text-sm text-gray-600">
          //             GST Input Credit will not be available if GST certificate
          //             is not uploaded
          //           </p>

          //           <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8">
          //             <div className="flex flex-col items-center justify-center text-center">
          //               <p className="text-gray-500 text-lg">
          //                 Drag and drop files to upload
          //               </p>
          //               <p className="text-gray-400 mt-2">or</p>
          //               <button className="mt-4 px-6 py-2 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          //                 Select file
          //               </button>
          //               <p className="text-gray-400 text-sm mt-4">
          //                 Supports PDF.
          //               </p>
          //               <p className="text-gray-400 text-sm">
          //                 Max file size 5MB
          //               </p>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //     <div className="w-full p-8">
          //       <div className="space-y-6 ">
          //         {/* Cancelled Cheque Section */}
          //         <div>
          //           <h2 className="text-lg font-medium text-gray-900 mb-4">
          //             Cancelled Cheque
          //           </h2>

          //           {/* Upload Box */}
          //           <div className="border-2 border-dashed border-gray-300 rounded-lg  p-8">
          //             <div className="flex flex-col items-center justify-center text-center">
          //               <p className="text-gray-500">
          //                 Drag and drop files to upload
          //               </p>
          //               <p className="text-gray-400 mt-2">or</p>
          //               <button className="mt-4 px-6 py-2 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          //                 Select file
          //               </button>
          //               <p className="text-gray-400 text-sm mt-4">
          //                 Supports JPEG, JPG, PDF, PNG.
          //               </p>
          //               <p className="text-gray-400 text-sm">
          //                 Max file size 5MB
          //               </p>
          //             </div>
          //           </div>
          //         </div>

          //         {/* Divider */}
          //         <div className="w-full border-t border-gray-200"></div>

          //         {/* Address Form */}
          //         <div className="space-y-6">
          //           {/* Address Line 1 */}
          //           <div>
          //             <label
          //               htmlFor="address-line-1"
          //               className="block text-sm font-medium text-gray-700 mb-1"
          //             >
          //               Address Line 1
          //             </label>
          //             <input
          //               type="text"
          //               id="address-line-1"
          //               className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          //               name="addressLine1"
          //               value={agencyData.addressLine1}
          //               onChange={handleInputChange}
          //             />
          //           </div>

          //           {/* Address Line 2 */}
          //           <div>
          //             <label
          //               htmlFor="address-line-2"
          //               className="block text-sm font-medium text-gray-700 mb-1"
          //             >
          //               Address Line 2
          //             </label>
          //             <input
          //               type="text"
          //               id="address-line-2"
          //               className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          //               name="addressLine2"
          //               value={agencyData.addressLine2}
          //               onChange={handleInputChange}
          //             />
          //           </div>

          //           {/* City, State, Zip Grid */}
          //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          //             {/* City */}
          //             <div>
          //               <label
          //                 htmlFor="city"
          //                 className="block text-sm font-medium text-gray-700 mb-1"
          //               >
          //                 City
          //               </label>
          //               <input
          //                 type="text"
          //                 id="city"
          //                 className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          //                 name="city"
          //                 value={agencyData.city}
          //                 onChange={handleInputChange}
          //               />
          //             </div>

          //             {/* State */}
          //             <div>
          //               <label
          //                 htmlFor="state"
          //                 className="block text-sm font-medium text-gray-700 mb-1"
          //               >
          //                 State
          //               </label>
          //               <input
          //                 type="text"
          //                 id="state"
          //                 className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          //                 name="state"
          //                 value={agencyData.state}
          //                 onChange={handleInputChange}
          //               />
          //             </div>

          //             {/* Zip Code */}
          //             <div>
          //               <label
          //                 htmlFor="zip-code"
          //                 className="block text-sm font-medium text-gray-700 mb-1"
          //               >
          //                 Zip Code
          //               </label>
          //               <input
          //                 type="text"
          //                 id="zip-code"
          //                 className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          //                 name="zipcode"
          //                 value={agencyData.zipcode}
          //                 onChange={handleInputChange}
          //               />
          //             </div>
          //           </div>
          //         </div>

          //         {/* Save Button */}
          //         <div className="flex justify-end mt-6">
          //           <button
          //             onClick={handleSave}
          //             disabled={loading}
          //             className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center disabled:opacity-50"
          //           >
          //             <Save className="w-5 h-5 mr-2" />
          //             {loading ? "Saving..." : "Save"}
          //           </button>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          //   <div className="w-full  mx-auto pt-5">
          //     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          //       {/* Heading */}
          //       <h1 className="text-2xl font-bold text-gray-900 mb-6">
          //         Aadhar details
          //       </h1>

          //       {/* Divider */}
          //       <div className="w-full border-t border-gray-200 mb-8"></div>

          //       {/* Form Fields */}
          //       <div className="space-y-8">
          //         {/* Name and Aadhar Number Row */}
          //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          //           {/* Name Field */}
          //           <div className="">
          //             <label
          //               htmlFor="aadhar-name"
          //               className="block text-base text-gray-700"
          //             >
          //               Name as per Aadhar
          //             </label>
          //             <input
          //               type="text"
          //               id="aadhar-name"
          //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          //               name="nameAsPerAadhar"
          //               value={agencyData.nameAsPerAadhar}
          //               onChange={handleInputChange}
          //             />
          //           </div>

          //           {/* Aadhar Number Field */}
          //           <div className="">
          //             <label
          //               htmlFor="aadhar-number"
          //               className="block text-base text-gray-700"
          //             >
          //               Aadhar number
          //             </label>
          //             <input
          //               type="text"
          //               id="aadhar-number"
          //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          //               name="aadharNumber"
          //               value={agencyData.aadharNumber}
          //               onChange={handleInputChange}
          //             />
          //           </div>
          //         </div>

          //         {/* Address Field */}
          //         <div className="space-y-2">
          //           <label
          //             htmlFor="address"
          //             className="block text-base text-gray-700"
          //           >
          //             Address
          //           </label>
          //           <input
          //             type="text"
          //             id="address"
          //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          //             name="address"
          //             value={agencyData.address}
          //             onChange={handleInputChange}
          //           />
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          //   <div className="w-full  mx-auto mt-10">
          //     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          //       {/* Heading */}
          //       <h1 className="text-2xl font-bold text-gray-900 mb-6">
          //         Office Photo
          //       </h1>

          //       {/* Divider */}
          //       <div className="w-full border-t border-gray-200 mb-8"></div>

          //       {/* Upload Section */}
          //       <div className="space-y-2">
          //         <label className="block text-base text-gray-700 mb-2">
          //           Office photo
          //         </label>

          //         {/* Drag and Drop Area */}
          //         <div
          //           className="border-2 border-dashed border-gray-300 rounded-lg p-8"
          //           onDrop={handleDrop}
          //           onDragOver={handleDragOver}
          //         >
          //           <div className="flex flex-col items-center justify-center text-center">
          //             <p className="text-gray-500">
          //               Drag and drop files to upload
          //             </p>
          //             <p className="text-gray-400 mt-2">or</p>

          //             {/* File Input Button */}
          //             <label className="mt-4 px-6 py-2 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
          //               <span>Select file</span>
          //               <input
          //                 type="file"
          //                 className="hidden"
          //                 onChange={handleFileChange}
          //                 accept=".jpeg,.jpg,.pdf,.png"
          //               />
          //             </label>

          //             {/* File Type Info */}
          //             <p className="text-gray-400 text-sm mt-4">
          //               Supports JPEG, JPG, PDF, PNG.
          //             </p>
          //             <p className="text-gray-400 text-sm">Max file size 5MB</p>

          //             {/* Show selected file if any */}
          //             {file && (
          //               <div className="mt-4 text-sm text-indigo-600">
          //                 Selected file: {file.name}
          //               </div>
          //             )}
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>



          <div className=" w-full">
          <div className="flex   flex-col   md:flex-row gap-4 w-full max-w-6xl   mb-10">
            {/* Emergency Hotline Card */}
            <div className="bg-gray-100 rounded-xl p-6 flex-1 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="text-red-500" size={24} />
                <h2 className="font-[600] text-md text-gray-800">
                  Atlys Emergency 24x7 Hotline:
                </h2>
                <a
                  href="tel:+91 22 48934242"
                  className="text-blue-600 font-medium"
                >
                  +91 22 48934242
                </a>
              </div>
              <p className="text-black/90   leading-6 ml-1">
                Please only call if it's a real emergency or escalation. For
                everything else, please create a support ticket.
              </p>
            </div>

            {/* Product Questions Card */}
            <div className="  rounded-xl  p-6 flex-1 shadow-sm">
              <div className="flex items-center    gap-2 mb-4">
                <PhoneCall className="text-gray-700" size={20} />
                <h2 className="font-medium text-md text-gray-800">
                  Have questions about the product?
                </h2>
              </div>
              <div className="flex ">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-xl  text-[16px] font-[400] transition duration-200">
                  Join product demo call
                </button>
              </div>
            </div>
          </div>
          {/* ************form ********** */}
<div className="w-full flex flex-col gap-5" >
          <div className="w-full  mx-auto rounded-xl overflow-hidden shadow-sm">
            <div className="  ">
              <div className=" p-4">
                <h1 className="text-xl font-bold text-gray-900 mb-8">
                  Agency Information
                </h1>

                <div className="w-full border-t border-gray-200 mb-8"></div>

                <div className="flex flex-col  gap-4">
                  <div className="flex flex-col md:flex-row items-center w-full gap-4">
                    <div className="  md:w-[50%] w-full py-1">
                    <Input
                          label="Agency Name"
                          placeholder={"Enter Agency Name"}
                        />
                    </div>
                    <div className="  md:w-[50%] w-full py-1">
                      <Input
                        className=""
                        label="Agency Name"
                        placeholder={"Enter Agency Name"}
                      />
                    </div>
                  </div>
                  <div className="flex w-full gap-4">
                    <div className="w-[100%]">
                      <div className="  md:w-[50%] w-full py-1">
                      <CustomSelect
                        // options={countryOptions}
                        name="country"
                        // value={country}
                        // onChange={(e) => setCountry(e.target.value)}
                        label="Country"
                        placeholder={"Select Country"}
                      />
                      </div>
                    </div>
                  </div>
                  <div className="w-full  flex  md:flex-row flex-col gap-4 ">
                    <div className="  md:w-[50%] w-full py-1">
                      <Input label="GST Number" placeholder={"GST Number"} />
                    </div>
                    <div className="  md:w-[50%] w-full py-1">
                      <Input label="PAN Number" placeholder={"PAN Number"} />
                    </div>
                  </div>
                </div>

                {/* GST Certificate */}
                <div className="w-full flex flex-col  border-b  border-gray-300 pb-10 gap-4 ">
                  <div>
                    <FileComponent head={"GST Certificate"} />
                  </div>
                  <div>
                    <FileComponent head={"Cancelled Cheque"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-4">
              <div>
                <Input
                  label="Address Line 1"
                  placeholder={"Address Line 1"}
                />
              </div>
              <div>
                <Input
                  label="Address Line 2"
                  placeholder={"Address Line 2"}
                />
              </div>

              <div className="flex gap-4 w-full ">
                <div className="w-[33.3%] ">
                  <Input label="City" placeholder={"City"} />
                </div>
                <div className="w-[33.3%] ">
                  <Input label="State" placeholder={"State"} />
                </div>
                <div className="w-[33.3%] ">
                  <Input label="Zip Code" placeholder={"Zip Code"} />
                </div>
              </div>
              <div className="w-full flex justify-end p-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-full  text-[16px] font-[400] transition duration-200">
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="w-full p-4  shadow-sm rounded-xl ">
            <div className="md:py-7 py-4  w-full border-b border-gray-300">
              <h1 className="text-xl font-bold text-gray-900">
                Aadhar details
              </h1>
            </div>

            <div className="md:py-7 py-4 w-full flex-col flex gap-4">
              <div className="md:flex-row flex-col flex gap-4 w-full">
                <div className="md:w-[50%] w-full">
                  <Input
                    label="Name as per Aadhar"
                    placeholder={"Name as per Aadhar"}
                  />
                </div>
                <div className="md:w-[50%] w-full">
                  <Input
                    label="Aadhar Number"
                    placeholder={"Aadhar Number"}
                  />
                </div>
              </div>
              <div className=" w-full">
                <Input
                  label="Address"
                  placeholder={
                    "abc House,  PO,abc, Kannur, Kannur, Kerala, India"
                  }
                />
              </div>
            </div>
          </div>
          <div>
          <div className="w-full  shadow-sm rounded-xl p-4">
          <div className="md:py-7 py-4  w-full border-b border-gray-300">
              <h1 className="text-xl font-bold text-gray-900">
              Office Photo
              </h1>
            </div>
            <div>
              <FileComponent head={"Office Photo"} />
            </div>
            </div>
          </div>
        </div>
        </div>
        );
      case "Transactions":
        return <Transaction />;
      case "LoadWallet":
        return <Loadwallet />;
      case "Overstay":
        return <Overstay />;
      case "Training":
        return <Training />;
      case "changepassword":
        return <PasswordChangeDialog />;
      case "passport":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Passport Details</h2>
            <p>View and update passport information</p>
          </div>
        );
      case "traveller-photo":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Traveller Photo</h2>
            <p>Manage your traveller photos</p>
          </div>
        );
      case "Signout":
        // Handle sign out logic here
        return (
          <Signout />

        );
      default:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
            <p>Welcome to your dashboard</p>
          </div>
        );
    }
  };

  return (
    <div
      style={{
        backgroundImage: ` url(${MainBackground})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        width: "100%",
      }}
    >
      <Header />

      {loading && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
       <Loader />
      </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-center">
        <div className="max-w-[1300px] w-full">
          <div className="w-full  relative  flex-col flex">
          

            <div className="flex    justify-between overflow-x-hidden mt-10">
              <div className="w-auto  mt-3 mb-10 md:w-[16%]">
                <div
                  className={`${
                    isNarrowScreen
                      ? "sticky  top-5 w-[50px]"
                      : "sticky top-5 w-full"
                  } min-w-[50px] mb-34  pb-10 md:mb-0 transition-all duration-300`}
                >
                  {/* Pass the callback function to Sidebar */}
                  <Sidebar
                    isNarrow={isNarrowScreen}
                    onOptionSelect={handleOptionSelect}
                  />
                </div>
              </div>
              <div className="w-[85%]    sm:w-[90%] md:w-[80%]  p-2  flex flex-col ">
                <div className="">
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
