import React, { useState } from "react";
import Header from "../../components/header";
import {
  Alerm,
  Allicon,
  MainBackground,
  Placeholder,
  Star,
  Tic,
} from "../../assets";
import { Calendar } from "lucide-react";
import SearchInput from "../../components/searchInput";
const index = () => {
  const [date, setDate] = useState('');
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
          <div className="w-full flex md:flex-row flex-col   mt-5 md:mt-15 gap-3 ">
            <div className=" md:w-[70%] w-full">
              <div className="p-3 pb-10 border-[#CDD0D5] border-b">
                <h1 className="text-[32px] font-[600]">Highlights</h1>
                <ul className="list-disc pl-5">
                  <li className="text-[14px] font-[400]">
                    Enjoy 22 adrenaline-fueled rides across 1.5 million square
                    feet of a playground at IMG World of Adventure, Dubai's
                    largest indoor theme and amusement park.
                  </li>
                  <li className="text-[14px] font-[400]">
                    Feel the rush of childhood nostalgia and excitement with
                    epic zones such as Marvel and Cartoo Network.
                  </li>
                  <li className="text-[14px] font-[400]">
                    Swing through the city with Spider Man, come face-to-face
                    with life-sized dinosaurs,or join the Powerpuff Girls in
                    fighting their nemesis, Mojo Jojo.
                  </li>
                  <li className="text-[14px] font-[400]">
                    Upgrade your ticket to get fast-track entry to any rides or
                    attractions at IMG or get skip-the-line entry at Dubai
                    Miracle Garden.
                  </li>
                  <li className="text-[14px] font-[400]">
                    Fun fact: The Velociraptor rollercoaster propels visitors to
                    an exhilarating 100 km/h in 2.5 seconds.
                  </li>
                </ul>
              </div>
            </div>
            <div className=" md:w-[30%]  p-3 w-full ">
              <div className="max-w-xs w-full mx-auto border-[#CDD0D5] border rounded-xl  p-6">
                <div className="mb-4">
                  <div className="text-sm text-gray-500">from</div>
                  <div className="flex items-baseline">
                    <span className="text-xl font-semibold">₹5,335</span>
                  </div>
                  <div className="text-sm text-emerald-400">₹534 cashback</div>
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select a Date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      readOnly
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Calendar size={20} />
                      {/* <img src={CalenderUp} alt="" /> */}

                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 text-[16px] font-[400] rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
