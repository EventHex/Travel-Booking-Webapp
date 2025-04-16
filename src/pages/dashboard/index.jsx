import { useState, useRef, useEffect } from "react";
import Header from "../../components/header";
import SideBar from "../../components/sideBar";
import Axiosinstance from "../../instance/index";
import {
  MainBackground,
  Allicon,
  Aproved,
  Rejection,
  Refuse,
  Pending,
  Submit,
  SeccessTrue,
  CloseIcon,
} from "../../assets";
import Ticket from "../../components/ticket";
import {SuccessIcon,PendingIcon,RejectIcon} from '../../assets'
import axios from "axios";
import { SearchInputText, SearchInputDate } from "../../components/searchInput";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const tabsRef = useRef(null);
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);
  const [submittedApplications, setSubmittedApplications] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [refundedApplications, setRefundedApplications] = useState([]);

  const [visaApplications, setVisaApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState({
    destination: "",
    goingTo: "",
    travelDate: "",
    returnDate: ""
  });

  // Add dropdown options
  const dropDownPlace = [
    { id: 1, title: "Dubai", icon: "🇦🇪" },
    { id: 2, title: "Abu Dhabi", icon: "🇦🇪" }
  ];

  const citizenOptions = [
    { id: 1, title: "UAE", icon: "🇦🇪" },
    { id: 2, title: "India", icon: "🇮🇳" }
  ];

  useEffect(() => {
    const fetchVisaApplications = async () => {
      try {
        const response = await Axiosinstance.get('/visa-application');
        setVisaApplications(response.data);
        
        // Set search data from first visa application
        if (response.data && response.data[0]) {
          const visa = response.data[0];
          const formattedData = {
            destination: visa.visaCountry || "",
            goingTo: visa.travellerInformation || "",
            travelDate: visa.travelDateFrom ? new Date(visa.travelDateFrom).toISOString().split('T')[0] : "",
            returnDate: visa.travelDateTo ? new Date(visa.travelDateTo).toISOString().split('T')[0] : ""
          };
          console.log('Setting form data:', formattedData); // Debug log
          setSearchData(formattedData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    fetchVisaApplications();
  }, []);

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to scroll to active tab
  const scrollToActiveTab = () => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector(
        `button[data-id="${activeTab}"]`
      );
      if (activeTabElement) {
        const scrollContainer = tabsRef.current;
        const scrollContainerRect = scrollContainer.getBoundingClientRect();
        const activeTabRect = activeTabElement.getBoundingClientRect();

        // Calculate the scroll position
        const scrollLeft =
          activeTabElement.offsetLeft -
          scrollContainerRect.width / 2 +
          activeTabRect.width / 2;

        // Scroll smoothly to the active tab
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  // Scroll to active tab when it changes
  useEffect(() => {
    scrollToActiveTab();
  }, [activeTab]);

  // Handle responsive layout
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

  const tabs = [
    { id: "all", label: "All", icon: Allicon, count: null },
    { id: "approved", label: "Approved", icon: Aproved, count: null },
    { id: "rejected", label: "Rejected", icon: Rejection, count: null },
    { id: "submitted", label: "Submitted", icon: Submit, count: null },
    { id: "pending", label: "Pending Payment", icon: Pending, count: null },
    { id: "refunded", label: "Refunded", icon: Refuse, count: null },
  ];

  useEffect(()=>{
    const getVisaApplication = async () => {
      try {
        const response = await axios.get("http://localhost:8078/api/v1/visa-application");
        const applications = response.data.response;
        
        // Transform the API data into the required format
        const transformedApplications = applications.map(app => {
          const status = app.status;
          
          // Define the order of application details statuses
          const statusOrder = [
            "Errors Fixed",
            "Application Complete",
            "Application Paid",
            "Submitted to Sponsor",
            "Visa Approved"
          ];
          
          // Get the current status index
          const currentStatusIndex = statusOrder.indexOf(app.applicationDetails);
          
          // Create details object based on status progression
          const details = {
            errorFixed: currentStatusIndex >= 0,
            applicationComplete: currentStatusIndex >= 1,
            applicationPaid: currentStatusIndex >= 2,
            submittedToSponsor: currentStatusIndex >= 3,
            visaApproved: currentStatusIndex >= 4
          };

          const statusMessage = {
            title: `Visa ${status}`,
            description: getStatusDescription(status),
            icon: getStatusIcon(status),
            iconBg: getStatusIconBg(status),
            iconColor: getStatusIconColor(status),
            cardBg: getStatusCardBg(status),
            borderColor: getStatusBorderColor(status)
          };

          return {
            name: app.travellerInformation?.value || "Unknown",
            submittedOn: new Date(app.dateOfApply).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            submittedAt: new Date(app.dateOfApply).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            passportNumber: app.travellerInformation?.passport || "N/A",
            country: app.visaCountry,
            visa: app.visaType,
            travelDates: `${new Date(app.travelDateFrom).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} — ${new Date(app.travelDateTo).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`,
            status: status,
            image: getStatusImage(status),
            details: details,
            statusMessage: statusMessage,
            expectedVisaApprovalDate: app.expectedVisaApprovalDate,
            deliveredDate: app.deliveredDate
          };
        });

        // Helper functions for status-related data
        function getStatusDescription(status) {
          switch(status) {
            case "Approved":
              return "Your visa has been approved and is ready for collection.";
            case "Rejected":
              return "Unfortunately, your visa application has been rejected.";
            case "Pending Payment":
              return "We are reviewing your application. This usually takes 2-3 business days.";
            case "Submitted":
              return "Your application has been submitted successfully.";
            case "Refunded":
              return "Your application fee has been refunded.";
            default:
              return "";
          }
        }

        function getStatusIcon(status) {
          switch(status) {
            case "Approved":
              return SuccessIcon;
            case "Rejected":
              return RejectIcon;
            case "Pending Payment":
            case "Submitted":
            case "Refunded":
              return PendingIcon;
            default:
              return PendingIcon;
          }
        }

        function getStatusIconBg(status) {
          switch(status) {
            case "Approved":
              return "bg-blue-50";
            case "Rejected":
              return "bg-red-100";
            case "Pending Payment":
              return "bg-green-100";
            case "Submitted":
              return "bg-blue-100";
            case "Refunded":
              return "bg-orange-100";
            default:
              return "bg-gray-100";
          }
        }

        function getStatusIconColor(status) {
          switch(status) {
            case "Approved":
              return "text-blue-500";
            case "Rejected":
              return "text-red-500";
            case "Pending Payment":
              return "text-green-500";
            case "Submitted":
              return "text-blue-500";
            case "Refunded":
              return "text-orange-500";
            default:
              return "text-gray-500";
          }
        }

        function getStatusCardBg(status) {
          switch(status) {
            case "Approved":
              return "bg-blue-50";
            case "Rejected":
              return "bg-red-50";
            case "Pending Payment":
              return "bg-green-50";
            case "Submitted":
              return "bg-blue-50";
            case "Refunded":
              return "bg-orange-50";
            default:
              return "bg-gray-50";
          }
        }

        function getStatusBorderColor(status) {
          switch(status) {
            case "Approved":
              return "border-blue-100";
            case "Rejected":
              return "border-red-100";
            case "Pending Payment":
              return "border-green-100";
            case "Submitted":
              return "border-blue-100";
            case "Refunded":
              return "border-orange-100";
            default:
              return "border-gray-100";
          }
        }

        function getStatusImage(status) {
          switch(status) {
            case "Approved":
              return SeccessTrue;
            case "Rejected":
            case "Refunded":
            case "Submitted":
            case "Pending Payment":
              return CloseIcon;
            default:
              return CloseIcon;
          }
        }

        // Group applications by status
        const groupedApplications = {
          approved: transformedApplications.filter(app => app.status === "Approved"),
          rejected: transformedApplications.filter(app => app.status === "Rejected"),
          submitted: transformedApplications.filter(app => app.status === "Submitted"),
          pending: transformedApplications.filter(app => app.status === "Pending Payment"),
          refunded: transformedApplications.filter(app => app.status === "Refunded")
        };

        // Update the state with all applications for each status
        setApprovedApplications(groupedApplications.approved);
        setRejectedApplications(groupedApplications.rejected);
        setSubmittedApplications(groupedApplications.submitted);
        setPendingApplications(groupedApplications.pending);
        setRefundedApplications(groupedApplications.refunded);

      } catch (error) {
        console.error("Error fetching visa applications:", error);
      }
    };
    getVisaApplication();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "all":
        return (
          <Ticket 
            approvedApplications={approvedApplications}
            rejectedApplications={rejectedApplications}
            submittedApplications={submittedApplications}
            pendingApplications={pendingApplications}
            refundedApplications={refundedApplications}
          />    
        );
      case "approved":
        return (
          <Ticket 
            approvedApplications={approvedApplications}
          />         
        );
      case "rejected":
        return (
          <Ticket 
            rejectedApplications={rejectedApplications}
          /> 
        );
      case "submitted":
        return (
          <Ticket 
            submittedApplications={submittedApplications}
          /> 
        );
      case "pending":
        return (
          <Ticket 
            pendingApplications={pendingApplications}
          /> 
        );
      case "refunded":
        return (
          <Ticket 
            refundedApplications={refundedApplications}
          /> 
        );
      default:
        return <p className="text-center">No Visa</p>;
    }
  };

  return (
    <>
      <div
        style={{
           backgroundImage: `url(${MainBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <div className="w-full">
          <div className="w-full max-w-[1300px] mx-auto  sm:px-5">
            <div className="w-full mt-10 flex gap-1 md:gap-4">
              {/* Sidebar container - fixed 20% width on larger screens */}
              <div
                className={`${
                  isNarrowScreen ? "w-[50px]" : "w-[20%]"
                } min-w-[50px]   mb-6 md:mb-0 transition-all duration-300`}
              >
                <SideBar isNarrow={isNarrowScreen} />
              </div>
              
              {/* Content container - remaining width (80% on larger screens) */}
              <div 
                className={`${
                  isNarrowScreen ? "w-[calc(100%-60px)]" : "w-[80%]"
                } px-2 transition-all duration-300`}
              >
                <div className="w-full">
                  <div
                    ref={tabsRef}
                    className="flex overflow-x-auto bg-gray-50 p-1 rounded-lg whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                  >
                    <div className="flex justify-between w-full space-x-1 pb-1">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          data-id={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center shrink-0 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium ${
                            activeTab === tab.id
                              ? "bg-white shadow text-gray-800"
                              : "text-gray-600 hover:bg-gray-200"
                          } transition-colors duration-150 ease-in-out`}
                        >
                          <span className="mr-1 sm:mr-2">
                            <img
                              src={tab.icon}
                              alt={`${tab.label} icon`}
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                          </span>
                          <span className={isSmallScreen ? "hidden sm:inline" : ""}>
                            {tab.label}
                          </span>
                          {tab.count !== null && (
                            <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 rounded-full text-xs bg-gray-200">
                              ({tab.count})
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg p-2 sm:p-4 mt-2">
                    {renderTabContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[1300px] mx-auto px-5 mt-4">
            <SearchInputText
              value={{
                destination: searchData.destination,
                goingTo: searchData.goingTo
              }}
              dropDownPlace={dropDownPlace}
              dropDownData={citizenOptions}
              onInputChange={handleInputChange}
              data={searchData}
            />
            <div className="mt-4">
              <SearchInputDate
                data={searchData}
                onDateChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;