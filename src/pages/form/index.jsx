import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import { FrontPassportForm } from "./passportFrontForm";
import { BackPassportForm } from "./passportBackForm";
import { SearchInputText, SearchInputDate } from "../../components/searchInput";
import File from "../../components/file";
import { useSearchParams } from "react-router-dom";
import { SingleSelect } from "../../components/dropdown";
import { FlightHotelBooking } from "./FlightHotalBooking";
import { UploadTravelerPhoto } from "./travelBooking";
import {
  Flight,
  Home,
  CalenderUp,
  CalenderDown,
  MainBackground,
  UserAdd,
  Saveline,
} from "../../assets";
import {
  Upload,
  Info,
  Clock,
  X,
  Edit2,
  Crop,
  RotateCw,
  FlipHorizontal2,
} from "lucide-react";
import Input from "../../components/input";
import { CustomSelect } from "../../components/dropdown";
import { CustomDatePicker, FullCalendar } from "../../components/calender";
import SideBar from "./sideBar";

const TravelVisaBooking = () => {
  const [searchParams] = useSearchParams();
  const goingTo = searchParams.get("goingTo") || "";
  const destination = searchParams.get("destination") || "";
  const travelDate = searchParams.get("travelDate") || "";
  const returnDate = searchParams.get("returnDate") || "";

  const searchData = {
    goingTo,
    destination,
    travelDate,
    returnDate,
  };

  useEffect(() => {
    console.log("Received search data:", searchData);
  }, [goingTo, destination, travelDate, returnDate]);

  const citizenInputRef = useRef(null);
  const goingToInputRef = useRef(null);

  const [frontImage, setFrontImage] = useState(null);
  // const [backImageUrl, setBackImageUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [goingToIsFocused, setGoingToIsFocused] = useState(false);
  const [TravellingDateFocused, setTravellingDateFocused] = useState(false);
  const [TravellingDateEndFocused, setTravellingDateEndFocused] =
    useState(false);

  // Add state for all form data
  const [frontFormData, setFrontFormData] = useState({
    passportNumber: "",
    firstName: "",
    lastName: "",
    nationality: "",
    sex: "",
    dateOfBirth: "",
    placeOfBirth: "",
    placeOfIssue: "",
    maritalStatus: "",
    dateOfIssue: "",
    dateOfExpiry: "",
  });


  const [backFormData, setBackFormData] = useState({
    fathersName: "",
    mothersName: "",
  });

  

  const [travelerPhoto, setTravelerPhoto] = useState(null);
  const [flightTicket, setFlightTicket] = useState(null);
  const [hotelBooking, setHotelBooking] = useState(null);

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };

  const handleGoingToIconClick = () => {
    goingToInputRef.current.focus();
  };

  const [applicationType, setApplicationType] = useState("individual");
  const [visaType, setVisaType] = useState("Tourist Visa");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const visaOptions = [
    "Tourist Visa",
    "Business Visa",
    "Student Visa",
    "Work Visa",
    "Transit Visa",
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

  // ***************passport photo*****************
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // *********************ticketBooking******************************
  const [documents, setDocuments] = useState({
    flightTicket: null,
    hotelBooking: null,
  });


  const handleFileChangeTicketBooking = (type, file) => {
    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const handleSubmitTicketBooking = async (e) => {
    e.preventDefault();
    // try {
      const formData = new FormData();
      formData.append("travellerInformation", travelerId);
      formData.append("visaFor", "Individual");
      formData.append("visaType", visaType);
      formData.append("visaCountry", destination);
      formData.append("travelDateFrom", travelDate);
      formData.append("travelDateTo", returnDate);
      formData.append("dateOfApply", new Date().toISOString());
      formData.append("status", "Submitted");
      formData.append("applicationDetails", "Application Complete");

      if (documents.flightTicket) {
        formData.append("roundTripFlightTicket", documents.flightTicket);
      }
      if (documents.hotelBooking) {
        formData.append("hotelBooking", documents.hotelBooking);
      }

      // const response = await fetch(
      //   "http://localhost:8078/api/v1/visa-application",
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to submit documents");
      // }

      // const result = await response.json();
      // console.log("Documents submitted successfully:", result);
    // } catch (error) {
      // console.error("Error submitting documents:", error);
      // alert("Failed to submit documents. Please try again.");
    // }
  };

  const handleSubmit = async () => {
    console.log(frontFormData, "frontFormData");
    console.log(backFormData, "backFormData");

    const travelerDatas = {
      ...frontFormData,
      ...backFormData,
    };

    console.log(travelerDatas, "travelerData");

    try {
      const passportInfo = new FormData();

      passportInfo.append("passportNumber", frontFormData.passportNumber);
      passportInfo.append("firstName", frontFormData.firstName);
      passportInfo.append("lastName", frontFormData.lastName);
      passportInfo.append("nationality", frontFormData.nationality);
      passportInfo.append("sex", frontFormData.sex);
      passportInfo.append("dateOfBirth", frontFormData.dateOfBirth);
      passportInfo.append("placeOfBirth", frontFormData.placeOfBirth);
      passportInfo.append("placeOfIssue", frontFormData.placeOfIssue);
      passportInfo.append("dateOfIssue", frontFormData.dateOfIssue);
      passportInfo.append("dateOfExpiry", frontFormData.dateOfExpiry);
      passportInfo.append("maritalStatus", frontFormData.maritalStatus);
      passportInfo.append("fathersName", backFormData.fathersName);
      passportInfo.append("mothersName", backFormData.mothersName);
      // passportInfo.append("indianPanCard", frontFormData.indianPanCard);

            

 // Add all files
 if (frontImage) {
  passportInfo.append("passportImageFront", frontImage);
}
if (previewUrl) {
  passportInfo.append("passportImageBack", previewUrl);
}

      // First create the traveler document
      const travelerResponse = await fetch(
        "http://localhost:8078/api/v1/traveller-information",
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: passportInfo,
        }
      );

      if (!travelerResponse.ok) {
        throw new Error("Failed to create traveler");
      }

      const travelerData = await travelerResponse.json();
      const travelerId = travelerData.data._id;

      // Get the full traveler information
      const fullTravelerInfo = await getTravelerInfo(travelerId);
      console.log("Full traveler information:", fullTravelerInfo);

      // Create FormData for visa application
      const formData = new FormData();

      // Add traveler information
      formData.append("travellerInformation", travelerId);

      


      // Add visa details
      formData.append("visaFor", "Individual");
      formData.append("visaType", visaType);
      formData.append("visaCountry", destination);
      formData.append("travelDateFrom", travelDate);
      formData.append("travelDateTo", returnDate);
      formData.append("dateOfApply", new Date().toISOString());
      formData.append("status", "Submitted");
      formData.append("applicationDetails", "Application Complete");

      // Add all files
      if (travelerPhoto) {
        formData.append("travelerPhoto", travelerPhoto);
      }
      if (flightTicket) {
        formData.append("roundTripFlightTicket", flightTicket);
      }
      if (hotelBooking) {
        formData.append("hotelBooking", hotelBooking);
      }

      // Submit to visa application API
      const response = await fetch(
        "http://localhost:8078/api/v1/visa-application",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to submit visa application"
        );
      }

      
      const result = await response.json();
      console.log("Visa application submitted successfully:", result);

      // Show success message or redirect
      alert("Visa application submitted successfully!");
    } catch (error) {
      console.error("Error submitting visa application:", error);
      alert(
        error.message || "Failed to submit visa application. Please try again."
      );
    }
  };

  // Add this new function
  const getTravelerInfo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8078/api/v1/traveller-information?id=${id}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch traveler information");
      }
      
      const data = await response.json();
      return data.response; // Assuming the API returns the data in response field
    } catch (error) {
      console.error("Error fetching traveler information:", error);
      throw error;
    }
  };

  const UploadForm = () => {
    const Visa = [
      { value: 1, label: "goldern visa" },
      { value: 2, label: "job visa" },
      { value: 3, label: "visiting visa" },
    ];

    // console.log(frontFormData);
    // console.log(backFormData);

    console.log(travelerPhoto);
    console.log(flightTicket);
    console.log(hotelBooking);

    return (
      <>
        <div className="w-full p-6 rounded-3xl shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Are You Applying For
            </h1>
          </div>

          <div className="flex justify-end mb-6">
            <div className="rounded-xl p-1 border border-gray-300">
              <button
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                  applicationType === "individual"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setApplicationType("individual")}
              >
                Individual
              </button>
              <button
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                  applicationType === "group"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setApplicationType("group")}
              >
                Group
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="relative mb-4 md:mb-5">
                <CustomSelect
                  labelClass={"12px"}
                  className={"py-[11px]"}
                  placeholder={"Tourist Visa"}
                  label={"Visa Type"}
                  options={Visa}
                />

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {visaOptions.map((option) => (
                      <div
                        key={option}
                        className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
                        onClick={() => {
                          setVisaType(option);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <span className="block truncate text-gray-500">
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 md:mb-5">
              <Input placeholder={"Internal Id"} label={"Internal Id"} />
            </div>

            <div className="mb-4 md:mb-5">
              <Input 
                placeholder={"Tourist Visa"} 
                label={"Group Name"}
                required={applicationType === "group"}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  // Front passport page component

  const VisaInformation = () => {
    return (
      <div className=" flex items-center  border rounded-[26px] border-[#CDD0D5] justify-center p-4">
        <div className="w-full  rounded-2xl  overflow-hidden">
          {/* Visa Information Section */}
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-r p-5 border-[#868C98]">
                <h2 className="text-[32px] font-[600] text-gray-800 mb-4">
                  Visa Information
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-600">Vietnam - Vietnam E-Visa</p>
                  <p className="text-gray-600">Vietnam - Vietnam E-Visa</p>
                  <div className="mt-4">
                    <p className="text-gray-600">Travelers: 2</p>
                    <p className="text-gray-600">
                      Travel Dates: Feb 27, 2025 - Feb 27, 2025
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Expected Visa Approval
                  </h3>
                  <div className="flex items-center text-blue-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>3/7/25, if submitted now!</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-[32px] font-[600] text-gray-900 mb-8">
                  Know Before You Pay
                </h2>
                <div className="relative pl-8 space-y-12">
                  {/* Timeline line */}
                  <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

                  {/* Auto-validation item */}
                  <div className="relative">
                    <div className="absolute -left-8 mt-1.5">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Auto-validation upon submission
                      </h4>
                      <p className="mt-1 text-gray-600">
                        Atlys performs automated validation after submission. We
                        will let you know if there are any problems with the
                        application.
                      </p>
                    </div>
                  </div>

                  {/* Visa processed item */}
                  <div className="relative">
                    <div className="absolute -left-8 mt-1.5">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Visa processed within 30 seconds
                      </h4>
                      <p className="mt-1 text-gray-600">
                        Atlys automatically processes your visa.
                      </p>
                    </div>
                  </div>

                  {/* Non-refundable item */}
                  <div className="relative">
                    <div className="absolute -left-8 mt-1.5">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Non-refundable after you pay
                      </h4>
                      <p className="mt-1 text-gray-600">
                        If canceled after payment, you will not be refunded.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Details Section */}
            <div className="mt-8 border-[#CDD0D5] border  rounded-[21px]  p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Price Details
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2 border-[#868C98] items-center">
                  <span className="text-gray-600">Traveller 1</span>
                  <span className="text-gray-800">₹13,519</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 border-[#868C98] font-medium">
                  <span className="text-gray-800">Total</span>
                  <span className="text-gray-800">₹13,519</span>
                </div>
                <div className="flex justify-betweenitems-center text-sm">
                  <span className="text-gray-600">Current Wallet Balance</span>
                  <span className="text-gray-800">₹13,519</span>
                </div>
              </div>
              <div className="  flex justify-end">
                <button className="mt-6  w-full  md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg font-[400] text-[14px] hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Info className="w-4 h-4 mr-2" />
                  Select Insurance date
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Define all states at the top of your component
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Your existing handleImageChange function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${MainBackground})`,
          backgroundSize: "100%",
          backgroundPosition: "center",
          width: "100%",
        }}
      >
        <Header />
        <div className="max-w-[1300px] w-full mx-auto rounded-lg">
          <div className="flex gap-5 flex-col flex-wrap justify-between md:flex-row p-5 w-full">
            {/* <div className="flex md:flex-row flex-col gap-3">
              <SearchInputText data={{ destination, goingTo }} />
              <SearchInputDate data={{ travelDate, returnDate }} />
            </div>

            <div className="flex items-center">
              <button className="text-white py-2 px-5 rounded-xl bg-[#375DFB] border text-[16px]">
                Search
              </button>
            </div> */}
          </div>
          <UploadForm />
          <div className="flex mt-10">
            <div className="w-auto pr-3 mt-3 md:w-[20%]">
              <div
                className={`${
                  isNarrowScreen ? "w-[50px]" : "w-full"
                } min-w-[50px] mb-6 md:mb-0 transition-all duration-300`}
              >
                <SideBar isNarrow={isNarrowScreen} />
              </div>
            </div>
            <div className="w-full md:w-[70%] border-l border-[#bbbdc2] flex flex-col justify-center">
              <div className="md:p-5">
                <FrontPassportForm
                  frontImage={frontImage}
                  setFrontImage={setFrontImage}
                  formData={frontFormData}
                  setFormData={setFrontFormData}
                />
                <BackPassportForm
                  formData={backFormData}
                  setFormData={setBackFormData}
                  previewUrl={previewUrl}
                  setPreviewUrl={setPreviewUrl}
                />
                <UploadTravelerPhoto
                  photo={travelerPhoto}
                  setPhoto={setTravelerPhoto}
                />
                <FlightHotelBooking
                  flightTicket={flightTicket}
                  setFlightTicket={setFlightTicket}
                  hotelBooking={hotelBooking}
                  setHotelBooking={setHotelBooking}
                />
                <VisaInformation />

                {/* Add submit button */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelVisaBooking;



