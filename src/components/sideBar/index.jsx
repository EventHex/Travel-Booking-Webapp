import React, { useState } from "react";
import { Ticket, Calendar, MapPin, Flag } from "lucide-react";
import {
  Filter,
  Date,
  Destination,
  Search,
  Location,
  Visa,
  MainBackground,
  Acitivty,
  Inurance,
  Flight,
  SearchGray,
} from "../../assets";

const Index = () => {
  const [selectedOption, setSelectedOption] = useState("departure");

  const filterOptions = [
    { id: "visas", label: "Visas Only", icon: Visa },

    { id: "created", label: "Date Created On", icon: Date },
    { id: "departure", label: "Departure Date", icon: Location },
    {
      id: "destination",
      label: "Destination Country",
      icon: Destination,
    },
  ];
  const filterOption = [
    { id: "Activities", label: "Activities", icon: Acitivty },
    { id: "Insurance", label: "Insurance", icon: Inurance },
    { id: "flight", label: "flight", icon: Flight },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${MainBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full mt-10 rounded-xl overflow-hidden"
    >
      <div className="relative p-4">
        <input
          className="rounded-[14px] border border-[#E2E4E9] py-3 pl-12 w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none hover:shadow-md transition-all duration-300 ease-in-out"
          type="text"
          placeholder="Search..."
        />
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
          <img src={SearchGray} alt="Search" />
        </div>
      </div>

      <div className="w-64 rounded-xl bg-gradient-to-b  p-3">
        <div className="space-y-1">
          <div className=" p-3 flex gap-3 text-gray-500">
            <img src={Filter} alt="" /> <span>Popular filters</span>
          </div>
        </div>
        {filterOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${
              selectedOption === option.id
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-gray-500">
                {" "}
                <img src={option.icon} alt="" />
              </div>
              <span className="text-gray-600 font-medium text-sm">
                {option.label}
              </span>
            </div>

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                selectedOption === option.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }`}
            >
              {selectedOption === option.id && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-64 rounded-xl bg-gradient-to-b  p-3">
        <div className="space-y-1">
          <div className=" p-3 flex gap-3 text-gray-500">
            <img src={Filter} alt="" /> <span>Booking</span>
          </div>
        </div>
        {filterOption.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${
              selectedOption === option.id
                ? "bg-white shadow-sm"
                : "hover:bg-white/50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-gray-500">
                {" "}
                <img src={option.icon} alt="" />{" "}
              </div>
              <span className="text-gray-600 font-medium text-sm">
                {option.label}
              </span>
            </div>

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                selectedOption === option.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
              }`}
            >
              {selectedOption === option.id && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
