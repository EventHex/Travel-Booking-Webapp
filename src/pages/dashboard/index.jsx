import { useState } from "react";
import Header from "../../components/header";
import SideBar from "../../components/sideBar";
import { MainBackground ,Allicon,Aproved,Rejection,Refuse,Pending,Submit
} from "../../assets";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All", icon: Allicon, count: null },
    { id: "approved", label: "Approved", icon: Aproved, count: 20 },
    { id: "rejected", label: "Rejected", icon: Rejection, count: 20 },
    { id: "submitted", label: "Submitted", icon: Submit, count: null },
    { id: "pending", label: "Pending Payment", icon: Pending, count: null },
    { id: "refunded", label: "Refunded", icon: Refuse, count: null },
  ];
  const renderTabContent = () => {
    switch (activeTab) {
      case "all":
        return <></>;
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
            <div className="w-full flex">
              <div className="w-[20%] ">
                <SideBar />
              </div>
              <div className=" w-[80%]">
                <div className="max-w-5xl   mx-auto p-4">
                  {/* Tab Navigation */}
                  <div className="flex justify-between  mb-4 space-x-1 overflow-x-auto bg-gray-100 p-1 rounded-lg">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center   px-4 py-2 rounded-md text-sm font-medium ${
                          activeTab === tab.id
                            ? "bg-white shadow text-gray-800"
                            : "text-gray-600 hover:bg-gray-200"
                        } transition-colors duration-150 ease-in-out`}
                      >
                        <span className="mr-2">  <img src={tab.icon} alt=" icons" /> </span>
                        <span>{tab.label}</span>
                        {tab.count !== null && (
                          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-gray-200">
                            ({tab.count})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className=" rounded-lg shadow p-4">
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
