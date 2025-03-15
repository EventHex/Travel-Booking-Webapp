import { useState, useRef, useEffect } from "react";
import Header from "../../components/header";
import SideBar from "../../components/sideBar";
import { MainBackground, Allicon, Aproved, Rejection, Refuse, Pending, Submit
} from "../../assets";
import Ticket from "../../components/ticket"

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const tabsRef = useRef(null);
  
  // Function to scroll to active tab
  const scrollToActiveTab = () => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector(`button[data-id="${activeTab}"]`);
      if (activeTabElement) {
        const scrollContainer = tabsRef.current;
        const scrollContainerRect = scrollContainer.getBoundingClientRect();
        const activeTabRect = activeTabElement.getBoundingClientRect();
        
        // Calculate the scroll position
        const scrollLeft = activeTabElement.offsetLeft - (scrollContainerRect.width / 2) + (activeTabRect.width / 2);
        
        // Scroll smoothly to the active tab
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };
  
  // Scroll to active tab when it changes
  useEffect(() => {
    scrollToActiveTab();
  }, [activeTab]);

  const tabs = [
    { id: "all", label: "All", icon: Allicon, count: null },
    { id: "approved", label: "Approved", icon: Aproved,  },
    { id: "rejected", label: "Rejected", icon: Rejection,  },
    { id: "submitted", label: "Submitted", icon: Submit, count: null },
    { id: "pending", label: "Pending Payment", icon: Pending, count: null },
    { id: "refunded", label: "Refunded", icon: Refuse, count: null },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "all":
        return <>
        {/* <Ticket/> */}
        </>;
      case "approved":
        return (
          <div className="p-4 bg-green-50 rounded-md">
            <h3 className="font-medium text-green-800 mb-2">Approved Items</h3>
            <p className="text-green-700">Displaying 20 approved items</p>
          </div>
        );
      case "rejected":
        return (
          <div className="p-4 bg-red-50 rounded-md">
            <h3 className="font-medium text-red-800 mb-2">Rejected Items</h3>
            <p className="text-red-700">Displaying 20 rejected items</p>
          </div>
        );
      case "submitted":
        return (
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">Submitted Items</h3>
            <p className="text-blue-700">Items awaiting review</p>
          </div>
        );
      case "pending":
        return (
          <div className="p-4 bg-yellow-50 rounded-md">
            <h3 className="font-medium text-yellow-800 mb-2">
              Pending Payment
            </h3>
            <p className="text-yellow-700">Items awaiting payment</p>
          </div>
        );
      case "refunded":
        return (
          <div className="p-4 bg-purple-50 rounded-md">
            <h3 className="font-medium text-purple-800 mb-2">Refunded Items</h3>
            <p className="text-purple-700">Completed refunds</p>
          </div>
        );
      default:
        return <></>;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-5">
            <div className="w-full mt-10 flex   flex-col md:flex-row">
              {/* Mobile sidebar toggle */}
              <div className="md:hidden mb-4">
                <button 
                  onClick={toggleSidebar}
                  className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 font-medium"
                >
                  {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                </button>
              </div>

              {/* Sidebar - hidden on mobile by default, shown when toggled */}
              <div className={`w-full   md:w-[20%] ${sidebarOpen ? 'block' : 'hidden'} md:block mb-6 md:mb-0`}>
                <SideBar />
              </div>
              
              {/* Main content area */}
              <div className="w-full md:w-[80%]">
                <div className="max-w-5xl  mx-auto">
                  {/* Tab Navigation - horizontally scrollable */}
                  <div ref={tabsRef} className="flex mb-4 overflow-x-auto  bg-gray-200 p-1 rounded-lg whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <div className="flex  justify-between  w-full space-x-1 pb-1">
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
                          <span className="mr-1 sm:mr-2"><img src={tab.icon} alt={`${tab.label} icon`} className="w-4 h-4 sm:w-5 sm:h-5" /></span>
                          <span>{tab.label}</span>
                          {tab.count !== null && (
                            <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 rounded-full text-xs bg-gray-200">
                              ({tab.count})
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="rounded-lg shadow p-2 sm:p-4">
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