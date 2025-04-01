import React,{useEffect, useState} from "react";
import Header from "../../components/header";
import Sidebar from "./sideBar" 
const index = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
  return (
    <div>
      <Header />

      <div className="  flex justify-center">
<div className="max-w-[1300px] w-full bg-green-200">
<div className="w-full bg-gray-100 p-4 flex-col flex ">
      <div className="flex items-center space-x-4">
        {/* Avatar/Logo Circle */}
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
          <h1 className="text-2xl font-bold text-gray-900">CNN HOLIDAYS LLP</h1>
          <p className="text-gray-600">admin@cnnholidays.com</p>
        </div>
      </div>




<div className="flex  mt-10 ">
            <div className="  w-auto  pr-3 mt-3 md:w-[20%]">
              <div
                className={`${
                  isNarrowScreen ? "w-[50px]" : "w-full"
                } min-w-[50px]   mb-6 md:mb-0 transition-all duration-300`}
              >
                <Sidebar isNarrow={isNarrowScreen} />
              </div>

              {/* <Sidebar /> */}
            </div>
            <div className=" w-full md:w-[70%] border-l   border-[#868C98]   flex flex-col justify-center">
              <div className="p-2 md:p-5">
        <h1>hello</h1>
              </div>
            </div>
          </div>
    </div>
</div>
      </div>
    </div>
  );
};

export default index;
