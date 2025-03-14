import React,{useState} from "react";
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
  Visa,Acitivty,Inurance,Flight,Search

} from "../../assets";

const HeroSection = () => {
  
  const [activeTab, setActiveTab] = useState('Visas');
  const tabs = [
    { id: 'Visas', icon: Visa },
    { id: 'Activities', icon: Acitivty},
    { id: 'Insurance', icon: Inurance },
    { id: 'Flights', icon: Flight }
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
      <div className="  py-3  bg-white w-full">
        <div className="w-full   justify-center flex">
          <div className="max-w-[1300px] w-full bg-white flex flex-col md:flex-row items-center">
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

        <div className=" flex justify-center">
          <div className=" w-full max-w-[1300px] px-5 flex-col  flex">
            <div className="w-full flex">
              <div className="w-full md:w-[60%] px-4 md:px-0">
                <h1 className="font-[300] text-[32px] sm:text-[42px] md:text-[56px] leading-tight">
                  Book 3000+ Handpicked
                </h1>
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                  <h1 className="text-[#00963C] text-[32px] sm:text-[42px] md:text-[56px] font-[500] leading-tight">
                    Experiences <br className="hidden sm:block" />
                    Worldwide
                  </h1>
                  <img src={Arrow} alt="arrow" className="mt-2 sm:mt-0" />
                </div>
                <div className="w-full max-w-3xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg shadow-sm">
      {/* Navigation Tabs */}
      <div className="flex   justify-around overflow-x-auto  bg-fuchsia-100  no-scrollbar mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 mr-2 whitespace-nowrap  text-[18px] font-medium transition-colors
              ${activeTab === tab.id 
                ? 'text-blue-600 ' 
                : ' text-gray-700 hover:bg-gray-100'}`}
          >
            <span className="mr-2"><img src={tab.icon}  alt="icons" /> </span>
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
          placeholder={`Search for ${activeTab} (e.g. Burje Khalifa, Universal Studio)`}
          className="w-full pl-10 pr-4 py-3 bg-white border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-600 placeholder-gray-400 shadow-sm"
        />
      </div>
    </div>
              </div>

              <div className="w-[40%]    flex justify-end items-end ">
                <img
                  src={Men}
                  alt="image"
                  className="w-full  md:w-96 h-auto object-contain"
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
