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
              <div className="w-[85%] sm:w-[90%] md:w-[80%] p-2 flex flex-col ">
                <div className="">
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
