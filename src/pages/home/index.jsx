import React, { useState } from "react";
import { TabMenu } from "../../components/tabs";
import {
  Men,
  MainBackground,
  LogoBlue,
  CreditCard,
  QuestionMark,
  User,
  HeadSet,
  Arrow,
  Visa,
  Acitivty,
  Inurance,
  Flight,
  Search,
} from "../../assets";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("Visas");
  const tabs = [
    { id: "Visas", icon: Visa },
    { id: "Activities", icon: Acitivty },
    { id: "Insurance", icon: Inurance },
    { id: "Flights", icon: Flight },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${MainBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full flex items-center justify-center"
    >
      <div className="   w-full">
        <div className="w-full  py-4 bg-white  justify-center flex">
          <div className="max-w-[1300px] w-full  flex flex-col md:flex-row items-center">
            {/* First child div - takes full width on mobile, 50% on md and above */}
            <div className="w-full md:w-[50%]  flex gap-5">
              <div className="w-[30%] px-2">
                <img src={LogoBlue} alt="" />
              </div>
              <div className="w-[70%] flex">
                <ul className="flex items-center gap-4 justify-center">
                  <li className="hover:text-[#375DFB]">Apply</li>
                  <li className="hover:text-[#375DFB]">Dash Board</li>
                </ul>
              </div>
            </div>

            {/* Second child div - takes full width on mobile, 50% on md and above */}
            <div className="w-full md:w-[50%] flex justify-center md:justify-end mt-4 md:mt-0">
              <div className="items-center gap-[14px] flex">
                <div>
                  <button className="text-[14px] font-[500] bg-[#EBF1FF] rounded-[10px] flex gap-4 py-1 px-3">
                    <img src={CreditCard} alt="credit" />
                    30,839
                  </button>
                </div>
                <div className="flex px-4 gap-[14px]">
                  <div className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center rounded-full">
                    <img src={HeadSet} alt="" />
                  </div>
                  <div className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center rounded-full">
                    <img src={QuestionMark} alt="" />
                  </div>
                  <div className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center rounded-full">
                    <img src={User} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* *******************sectionhero ****************** */}

        <div className="flex justify-center w-full">
      <div className="w-full max-w-[1300px] px-4 sm:px-5 flex flex-col">
        <div className="w-full flex flex-col md:flex-row">
          {/* Left content section */}
          <div className="w-full md:w-[60%] px-0 md:pr-4">
            <h1 className="font-[300] text-[28px] sm:text-[32px] md:text-[42px] lg:text-[56px] leading-tight">
              Book 3000+ Handpicked
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <h1 className="text-[#00963C] text-[28px] sm:text-[32px] md:text-[42px] lg:text-[56px] font-[500] leading-tight">
                Experiences <br className="hidden sm:block" />
                Worldwide
              </h1>
              <img src={Arrow} alt="arrow" className="mt-2 sm:mt-0" />
            </div>
            
            {/* Search Box */}
            <div className="w-full max-w-3xl mt-4 bg-gradient-to-r  p-3 sm:p-4 rounded-lg ">
              {/* Navigation Tabs */}
              <div className="flex justify-between md:justify-between    overflow-x-auto border-b border-[#525866] no-scrollbar mb-4">

                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center mb-[1px]  sm: sm:px-4 py-2 whitespace-nowrap text-[14px] sm:text-[16px] md:text-[18px] font-[500] transition-colors
                      ${
                        activeTab === tab.id
                          ? "text-blue-600 border-b-2 "
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <span className="mr-1 sm:mr-2">
                      <img src={tab.icon} alt="icons" />
                    </span>
                    {tab.id}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  {/* <Search className="h-5 w-5 text-gray-400" /> */}
                </div>
                <input
                  type="text"
                  placeholder={`Search for ${activeTab} (e.g. Burj Khalifa, Universal Studio)`}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base text-gray-600 placeholder-gray-400 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Right image section - hidden on mobile */}
          <div className="w-full md:w-[40%] flex justify-center md:justify-end items-center mt-6 md:mt-0">
                          <img
              src={Men}
              alt="image"
              className="w-full max-w-xs md:max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default HeroSection;
