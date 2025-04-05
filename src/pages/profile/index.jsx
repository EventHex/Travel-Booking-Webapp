import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "./sideBar";
import Transaction from "./transaction";
import Overstay from "./Overstay";
import Training from "./Training";
import Password from "./password";
import Loadwallet from "./LaodWallet";
import { PhoneCall, AlertTriangle, Upload, Save } from "lucide-react";
import { MainBackground } from "../../assets";
import Input from "../../components/input";
import { CustomSelect } from "../../components/dropdown";
import FileComponent from "../../components/file";
const Index = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("profile"); // Default option
  const [country, setCountry] = useState("India");
  const [addressLine1, setAddressLine1] = useState(
    "LII-5350, CNN HOLIDAYS, KANNUR, Kannur, Kannur, Kerala, 670001"
  );
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("Kannur");
  const [state, setState] = useState("KL");
  const [zipCode, setZipCode] = useState("670001");
  const [name, setName] = useState("Siraju Keloth");
  const [aadharNumber, setAadharNumber] = useState("911438326566");
  const [address, setAddress] = useState(
    "Keloth House, Cherumavilayi, Mavilayi PO, Mundalur, Kannur, Kannur, Kerala, India, Mundalur"
  );

  const countryOptions = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "Australia", label: "Australia" },
  ];

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
      case "Profile":
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
              <div className="bg-gray-100 rounded-xl  p-6 flex-1 shadow-sm">
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

            <div className="w-full  mx-auto bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="  relative">
       
                <div className=" p-4">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Agency Information
                  </h1>

                  <div className="w-full border-t border-gray-200 mb-8"></div>

                  <div className="flex flex-col  gap-4">
                    <div className="flex flex-col md:flex-row items-center w-[70%] gap-4">
                      <div className="  md:w-[50%] w-full py-1">
                        <CustomSelect
                          options={countryOptions}
                          name="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          label="Country"
                          placeholder={"Select Country"}
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
                    <div className="flex w-[70%]  gap-4">
                      <div className="w-[100%]">
                        <div className="  md:w-[50%] w-full py-1">
                          <Input
                            label="Agency Name"
                            placeholder={"Enter Agency Name"}
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
                  <div className="w-full flex flex-col  border-b  border-gray-300 pb-10 gap-4 p-4">
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
<div><Input label="Address Line 1" placeholder={"Address Line 1"}/></div>
<div><Input label="Address Line 2" placeholder={"Address Line 2"}/></div>


<div className="flex gap-4 w-full ">
  <div className="w-[33.3%] ">

  <Input label="City" placeholder={"City"}/>
  </div>
  <div className="w-[33.3%] ">
  <Input label="State" placeholder={"State"}/>
  </div>
  <div className="w-[33.3%] ">
  <Input label="Zip Code" placeholder={"Zip Code"}/>
  </div>
</div>
<div className="w-full flex justify-end p-4">
  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-full  text-[16px] font-[400] transition duration-200">
    Save  
  </button>
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
        return <Password />;
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
          <div>
            <h2 className="text-xl font-bold mb-4">Signing Out...</h2>
          </div>
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

      <div className="flex justify-center">
        <div className="max-w-[1300px] w-full">
          <div className="w-full  relative  flex-col flex">
            <div className="flex items-center   pt-10 space-x-4">
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
                <h1 className="text-xl font-medium text-gray-900">
                  CNN HOLIDAYS LLP
                </h1>
                <p className="text-gray-600">admin@cnnholidays.com</p>
              </div>
            </div>

            <div className="flex  justify-between overflow-x-hidden mt-10">
              <div className="w-auto  mt-3 mb-10 md:w-[16%]">
                <div
                  className={`${
                    isNarrowScreen
                      ? "sticky  top-5 w-[50px]"
                      : "sticky top-5 w-full"
                  } min-w-[50px] mb-16  pb-10 md:mb-0 transition-all duration-300`}
                >
                  {/* Pass the callback function to Sidebar */}
                  <Sidebar
                    isNarrow={isNarrowScreen}
                    onOptionSelect={handleOptionSelect}
                  />
                </div>
              </div>
              <div className="w-[85%]     sm:w-[90%] md:w-[80%]  p-2  flex flex-col ">
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
