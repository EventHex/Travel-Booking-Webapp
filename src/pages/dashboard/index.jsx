import { useState, useRef, useEffect } from "react";
import Header from "../../components/header";
import SideBar from "../../components/sideBar";
import {
  MainBackground,
  Allicon,
  Aproved,
  Rejection,
  Refuse,
  Pending,
  Submit,
} from "../../assets";
import Ticket from "../../components/ticket";
import {SuccessIcon,PendingIcon,RejectIcon} from '../../assets'

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const tabsRef = useRef(null);

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
  // ***************************tickets******************************
  const approvedApplication = {
      name: "SHARIEFA VALIYAKATH CHERIYAMALIYAKKAL",
      icon:SuccessIcon,
      submittedOn: "Feb 19, 2025",
      submittedAt: "11:14 AM",
      passportNumber: "V7672497",
      country: "United Arab Emirates",
      visa: "UAE 30 Days Covid Insurance",
      travelDates: "Mar 4, 2025 — Mar 20, 2025",
      status: "approved",
      details: {
        errorFixed: true,
        applicationComplete: true,
        applicationPaid: true,
        submittedToSpencer: true,
        visaApproved: true,
      },
      statusMessage: {
        title: "Visa Approved",
        icon: SuccessIcon,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        cardBg: "bg-gradient-to-br from-blue-50/80 to-blue-50/40",
        borderColor: "border-blue-100",
      },
    };
  
    const rejectedApplication = {
      name: 'SHARIEFA VALIYAKATH CHERIYAMALIYAKKAL',
      submittedOn: 'Feb 19, 2025',
      submittedAt: '11:14 AM',
      passportNumber: 'V7672497',
      country: 'United Arab Emirates',
      visa: 'UAE 30 Days Covid Insurance',
      travelDates: 'Mar 4, 2025 — Mar 20, 2025',
      status: 'rejected',
      details: {
        errorFixed: true,
        applicationComplete: true,
        applicationPaid: true,
        submittedToSpencer: true,
        visaApproved: false,
      },
      statusMessage: {
        title: 'Visa Rejected',
        icon: RejectIcon,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-500',
        cardBg: 'bg-red-50',
        borderColor: 'border-red-100',
      }
    };
  
    const refuntApplication = {
      name: 'SHARIEFA VALIYAKATH CHERIYAMALIYAKKAL',
      icon:'',
      submittedOn: 'Feb 19, 2025',
      submittedAt: '11:14 AM',
      passportNumber: 'V7672497',
      country: 'United Arab Emirates',
      visa: 'UAE 30 Days Covid Insurance',
      travelDates: 'Mar 4, 2025 — Mar 20, 2025',
      status: 'refunded',
      details: {
        errorFixed: true,
        applicationComplete: true,
        applicationPaid: true,
        submittedToSpencer: true,
        visaApproved: false,
      },
      statusMessage: {
        title: 'Application Refunded',
        description: 'Since your visa was not delivered within the promised time frame, Atlys has issued you with a full refund for this application. 7530 INR will be credited to your wallet.',
        reason: 'Unable to process',
        icon: '',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-500',
        cardBg: 'bg-orange-50',
        borderColor: 'border-orange-100',
      }
    };

    const pendingApplication = {
      name: 'SHARIEFA VALIYAKATH CHERIYAMALIYAKKAL',
      icon:'',
      submittedOn: 'Feb 19, 2025',
      submittedAt: '11:14 AM',
      passportNumber: 'V7672497',
      country: 'United Arab Emirates',
      visa: 'UAE 30 Days Covid Insurance',
      travelDates: 'Mar 4, 2025 — Mar 20, 2025',
      status: 'pending',
      details: {
        errorFixed: true,
        applicationComplete: true,
        applicationPaid: true,
        submittedToSpencer: true,
        visaApproved: false,
      },
      statusMessage: {
        title: 'Application pending',
        description: '',
        reason: 'Unable to process',
        icon: PendingIcon,
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-500',
        cardBg: 'bg-orange-50',
        borderColor: 'border-orange-100',
      }
    };
  const renderTabContent = () => {
    switch (activeTab) {
      case "all":
        return <>

<Ticket 
  approvedApplication={approvedApplication} 
  refuntApplication={refuntApplication} 
  rejectedApplication={rejectedApplication}
  pendingApplication = {pendingApplication}

/>    
    </>
;
      case "approved":
        return (
<Ticket 
  approvedApplication={approvedApplication} 

/>         );
      case "rejected":
        return (
          <Ticket 
          rejectedApplication={rejectedApplication}
        
        /> 
        );
      case "submitted":
        return (
          <Ticket 
          approvedApplication={approvedApplication} 
        
        /> 
        );
      case "pending":
        return (
          <div className=" bg-yellow-50 rounded-md">
            <h3 className="font-medium text-yellow-800 mb-2">
              Pending Payment
            </h3>
            <p className="text-yellow-700">Items awaiting payment</p>
          </div>
        );
      case "refunded":
        return (
          <div className=" bg-purple-50 rounded-md">
            <h3 className="font-medium text-purple-800 mb-2">Refunded Items</h3>
            <p className="text-purple-700">Completed refunds</p>
          </div>
        );
      default:
        return <></>;
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
                          {/* Hide tab text on very small screens */}
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
        </div>
      </div>
    </>
  );
};

export default Index;