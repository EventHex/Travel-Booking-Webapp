import React from "react";
import Header from "../../components/header";
import { MainBackground, Placeholder, Star } from "../../assets";
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
          <div className="w-full mx-auto p-4  rounded-lg ">
            <h1 className="text-2xl font-bold mb-2">
              IMG Worlds of Adventure Tickets
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1"><img src={Star} alt="" /></span>
                <span className="font-medium">4.5</span>
                <span className="text-gray-500 text-sm">(34918 reviews)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mx-2"></span>
                <span className="text-sm">Dubai, United Arab Emirates</span>
              </div>
            </div>

            {/* Main Images */}
            <div className="grid grid-cols-2 gap-3 mb-3">
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
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="rounded-lg overflow-hidden h-[156px]">
                <img
                  src={Placeholder}
                  alt="Indoor theme park attraction"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-[156px]">
                <img
                  src={Placeholder}
                  alt="Restaurant experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-[156px]">
                <img
                  src={Placeholder}
                  alt="Gift shop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-[156px]">
                <img
                  src={Placeholder}
                  alt="Indoor mall"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Feature Icons */}
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-600 text-sm">
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Opening hours vary</span>
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Instant confirmation</span>
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>Mobile ticket</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
