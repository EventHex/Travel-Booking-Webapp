import React, { useState } from "react";
import Header from "../../components/header";
import {
  Alerm,
  Allicon,
  MainBackground,
  Placeholder,
  Star,
  Tic,
  Ticketed,
} from "../../assets";
import { Calendar } from "lucide-react";
import SearchInput from "../../components/searchInput";
const index = () => {
  const [date, setDate] = useState("");
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2  border-[#CDD0D5] border rounded-lg space-y-2 sm:space-y-0">
              <div className="flex items-center text-gray-600 text-sm">
                <img src={Alerm} alt="" />
                <span>Opening hours vary</span>
              </div>

              <div className="flex gap-2 items-center text-gray-600 text-sm">
                <img src={Tic} alt="" />
                <span>Instant confirmation</span>
              </div>

              <div className="flex gap-2 items-center text-gray-600 text-sm">
                <img src={Ticketed} alt="" />
                <span>Mobile ticket</span>
              </div>
            </div>
          </div>

          {/* *************details ******************** */}
          <div className="w-full flex md:flex-row flex-col   mt-5 md:mt-15 gap-3 ">
            <div className=" md:w-[70%] flex flex-col gap-[60px] w-full">
              <div className="p-3 pb-10 flex flex-col gap-[25px] border-[#CDD0D5] border-b">
                <h1 className="text-[32px] font-[600]">Highlights</h1>
                <ul className="list-disc flex flex-col gap-[25px] pl-5">
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Enjoy 22 adrenaline-fueled rides across 1.5 million square
                    feet of a playground at IMG World of Adventure, Dubai's
                    largest indoor theme and amusement park.
                  </li>
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Feel the rush of childhood nostalgia and excitement with
                    epic zones such as Marvel and Cartoo Network.
                  </li>
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Swing through the city with Spider Man, come face-to-face
                    with life-sized dinosaurs,or join the Powerpuff Girls in
                    fighting their nemesis, Mojo Jojo.
                  </li>
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Upgrade your ticket to get fast-track entry to any rides or
                    attractions at IMG or get skip-the-line entry at Dubai
                    Miracle Garden.
                  </li>
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Fun fact: The Velociraptor rollercoaster propels visitors to
                    an exhilarating 100 km/h in 2.5 seconds.
                  </li>
                </ul>
              </div>
              <div className="p-3  pb-5 md:pb-10 flex flex-col gap-[25px] border-[#CDD0D5] border-b">
                <h1 className="text-[32px] font-[600]">Inclusions</h1>
                <ul className="list-disc flex flex-col gap-[25px] pl-5">
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Entry to IMG Worlds of Adventure
                  </li>
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Access to all rides and attractions
                  </li>
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Fast-track access to all rides or attractions (as per option
                    selected)
                  </li>
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Entry to Global Village Dubai (as per option selected)
                  </li>
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Entry into IMG Worlds of Adventure (as per option selected)
                  </li>
                  <li className="text-[14px] text-[#525866] font-[400]">
                    Skip-the-line entry to Dubai Miracle Garden (as per optio
                    selected)
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h1 className="text-[32px] font-[600]">Your experience</h1>
                <h5>What makes IMG Worlds of Adventure so special</h5>
                <p className="text-[14px] text-[#525866] font-[400]">
                  Live the epic adventure at IMG Worlds of Adventure, the
                  world’s largest indoor theme park spread over a massive 1.5
                  million square feet. IMG Worlds of Adventure is divided into 4
                  zones, two of which represent global brands, Cartoon Network
                  and Marvel, while the other two are in-house brands, IMG
                  Boulevard and Lost Valley: Dinosaur Adventure
                </p>
                <p className="text-[14px] text-[#525866] font-[400]">
                  The park has 22 exciting rides and attractions, 17 of which
                  are theme rides, each aiming to provide you with a dose of
                  adrenaline or leave you in a state of wonder. The Cartoon
                  Network Zone hosts Live Shows whereas the Marvel Zone has the
                  epic 3D attraction - “Avengers: Battle of Ultron”. In the Lost
                  Valley, you’re destined to see animatronic dinosaurs and ride
                  rollercoasters. The IMG Boulevard is the busiest, be sure to
                  check this out before you leave. Enjoy round-trip hotel
                  transfers from hotels in Central Dubai with your ticket.
                </p>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h5 className="text-[16px] font-[500]">
                  The 4 adventure zones at IMG Worlds of Adventure <br /> Marvel
                </h5>
                <p className="text-[14px] text-[#525866] font-[400]">
                  Explore Marvel zone, designed to let you have a closer look
                  into the Marvel Universe through several rides and
                  attractions. Meet your favourite Marvel avengers in person
                  here in the meet and greets taking place throughout the day.
                </p>
                <p className="text-[14px] text-[#525866] font-[400]">
                  Must-Try Rides: Avengers Battle of Ultron, Hulk Epsilon Base
                  3D, Spider-Man Dock Ock's Revenge & Thor Thunder Spin.
                </p>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h5 className="text-[16px] font-[500]">Lost Valley</h5>
                <p className="text-[14px] text-[#525866] font-[400]">
                  This zone is rife with dinosaur-themed fun. Everything here
                  brings the lost world of dinosaurs back to life, from the
                  rides to the restaurants and all the activities.
                </p>
                <p className="text-[14px] text-[#525866] font-[400]">
                  Must-Try Rides: The Velociraptor, Forbidden Territory,
                  Predator & Dino Carousel
                </p>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h5 className="text-[16px] font-[500]">Cartoon Network</h5>
                <p className="text-[14px] text-[#525866] font-[400]">
                  Who doesn't miss the old Cartoon Network? This zone is heaven
                  to all the 90s kids. The Cartoon Network zone brings to life
                  The Amazing World of Gumball, Adventure Time, The Powerpuff
                  Girls, Ben 10 & LazyTown in all its glory.
                </p>
                <p className="text-[14px] text-[#525866] font-[400]">
                  Must-Try Rides: Ben 10 5D Hero Time, Mojo Jojo's Robot
                  Rampage: The Powerpuff Girls, The Amazing Ride of Gumball
                </p>
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
