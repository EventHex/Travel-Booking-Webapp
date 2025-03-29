import React from "react";
import Header from "../../components/header";
import {
  Alerm,
  Allicon,
  MainBackground,
  Placeholder,
  Star,
  Tic,
} from "../../assets";
import SearchInput from "../../components/searchInput";
const index = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${MainBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <div className="w-full flex justify-center">
        <div className="max-w-[1300px] w-full flex-col   flex justify-center">
          {/* ***********search input **************** */}
          <div className="w-full flex items-center   justify-center">
            <div className="flex gap-3   w-[60%] mt-15 mb-15 flex-col ">
              <SearchInput />
            </div>
          </div>
          {/* *************details components******************** */}
          <div className="w-full mx-auto p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-2">
              IMG Worlds of Adventure Tickets
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">
                  <img src={Star} alt="" />
                </span>
                <span className="font-medium">4.5</span>
                <span className="text-gray-500 text-sm">(34918 reviews)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <img src={Map} alt="" />
                <span className="text-sm">Dubai, United Arab Emirates</span>
              </div>
            </div>

            {/* Main Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="rounded-lg overflow-hidden h-64">
                <img
                  src={Placeholder}
                  alt="Family with cartoon characters"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img
                  src={Placeholder}
                  alt="Theme park ride"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="rounded-lg overflow-hidden h-32 sm:h-32 md:h-40">
                <img
                  src={Placeholder}
                  alt="Indoor theme park attraction"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-32 sm:h-32 md:h-40">
                <img
                  src={Placeholder}
                  alt="Restaurant experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-32 sm:h-32 md:h-40">
                <img
                  src={Placeholder}
                  alt="Gift shop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-32 sm:h-32 md:h-40">
                <img
                  src={Placeholder}
                  alt="Indoor mall"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Feature Icons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
              <div className="flex items-center text-gray-600 text-sm">
                <img src={Alerm} alt="" />
                <span>Opening hours vary</span>
              </div>

              <div className="flex gap-2 items-center text-gray-600 text-sm">
                <img src={Tic} alt="" />
                <span>Instant confirmation</span>
              </div>

              <div className="flex gap-2 items-center text-gray-600 text-sm">
                <img src={Allicon} alt="" />
                <span>Mobile ticket</span>
              </div>
            </div>
          </div>

          {/* *************details ******************** */}
          <div className="w-full flex gap-3 bg-red-400">
            <div className="w-[70%]">
              <div>
                <h1 className="text-[32px] font-[600]">Highlights</h1>
              </div>
            </div>
            <div className="w-[30%]"></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
