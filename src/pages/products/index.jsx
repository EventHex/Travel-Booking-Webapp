import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import Card from "../../components/card";
import Header from "../../components/header";
import {
  Flight,
  Home,
  CalenderDown,
  CalenderUp,
  Search,
  MainBackground,
  Allicon,
  Tour,
  Transport,
  Luggage,
  Restaurant,
  Billi,
  Landscape,
  FlightIcon,
  Ship,
  Placeholder,

} from "../../assets";
import SearchInput from "../../components/searchInput";
const index = () => {
  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [citizenInputRef, setCitizenInputRef] = useState(null);

  const handleCitizenIconClick = () => {
    citizenInputRef.current.focus();
  };
  const navItems = [
    { icon: Allicon, text: "Tickets" },
    { icon: Tour, text: "Tours" },
    { icon: Transport, text: "Transportation" },
    { icon: Luggage, text: "Travel Services" },
    { icon: Restaurant, text: "Food & Drink" },
    { icon: Billi, text: "Entertainment" },
    { icon: Landscape, text: "Adventure" },
    { icon: FlightIcon, text: "Aerial Sightseeing" },
    { icon: Ship, text: "Cruises" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Popularity");

  const options = [
    "Popularity",
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Rating",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const cardData = [
    {
      id: 1,
      image: Placeholder,
      title: "Burj Khalifa At the Top Tickets: Level 124 & 125",
      location: "Dubai",
      rating: 4.5,
      reviews: 34916,
      originalPrice: "₹8864",
      discountedPrice: "₹5317",
      discount: "39%"
    },
    {
      id: 2,
      image: Placeholder,
      title: "Dubai Aquarium & Underwater Zoo Tickets",
      location: "Dubai",
      rating: 4.7,
      reviews: 28745,
      originalPrice: "₹7500",
      discountedPrice: "₹4875",
      discount: "35%"
    },
    {
      id: 3,
      image: Placeholder,
      title: "Dubai Frame Entry Tickets",
      location: "Dubai",
      rating: 4.3,
      reviews: 19872,
      originalPrice: "₹5999",
      discountedPrice: "₹3899",
      discount: "35%"
    },
    {
      id: 4,
      image: Placeholder,
      title: "Museum of the Future Tickets",
      location: "Dubai",
      rating: 4.8,
      reviews: 15623,
      originalPrice: "₹9500",
      discountedPrice: "₹6175",
      discount: "35%"
    },
    {
      id: 5,
      image: Placeholder,
      title: "Dubai Desert Safari with BBQ Dinner",
      location: "Dubai",
      rating: 4.6,
      reviews: 42315,
      originalPrice: "₹12000",
      discountedPrice: "₹7200",
      discount: "40%"
    },
    {
      id: 6,
      image: Placeholder,
      title: "Dubai Miracle Garden Entrance Tickets",
      location: "Dubai",
      rating: 4.4,
      reviews: 18452,
      originalPrice: "₹4500",
      discountedPrice: "₹2925",
      discount: "35%"
    },
    {
      id: 7,
      image: Placeholder,
      title: "Palm Jumeirah Boat Tour",
      location: "Dubai",
      rating: 4.7,
      reviews: 12863,
      originalPrice: "₹15000",
      discountedPrice: "₹9750",
      discount: "35%"
    },
    {
      id: 8,
      image: Placeholder,
      title: "IMG Worlds of Adventure Tickets",
      location: "Dubai",
      rating: 4.5,
      reviews: 21489,
      originalPrice: "₹11200",
      discountedPrice: "₹6720",
      discount: "40%"
    },
    {
      id: 9,
      image: Placeholder,
      title: "Atlantis Aquaventure Waterpark Tickets",
      location: "Dubai",
      rating: 4.8,
      reviews: 37285,
      originalPrice: "₹14500",
      discountedPrice: "₹8700",
      discount: "40%"
    },
    {
      id: 10,
      image: Placeholder,
      title: "Dubai Mall VR Park Entry",
      location: "Dubai",
      rating: 4.3,
      reviews: 9876,
      originalPrice: "₹6000",
      discountedPrice: "₹3600",
      discount: "40%"
    },
    {
      id: 11,
      image: Placeholder,
      title: "Dubai Global Village Tickets",
      location: "Dubai",
      rating: 4.5,
      reviews: 25431,
      originalPrice: "₹3500",
      discountedPrice: "₹2275",
      discount: "35%"
    },
    {
      id: 12,
      image: Placeholder,
      title: "Ski Dubai Snow Park Entry",
      location: "Dubai",
      rating: 4.6,
      reviews: 18327,
      originalPrice: "₹10000",
      discountedPrice: "₹6500",
      discount: "35%"
    },
    {
      id: 13,
      image: Placeholder,
      title: "Dubai Helicopter Tour",
      location: "Dubai",
      rating: 4.9,
      reviews: 8241,
      originalPrice: "₹48000",
      discountedPrice: "₹38400",
      discount: "20%"
    },
    {
      id: 14,
      image: Placeholder,
      title: "Abu Dhabi Grand Mosque Day Tour",
      location: "Abu Dhabi",
      rating: 4.8,
      reviews: 27632,
      originalPrice: "₹9800",
      discountedPrice: "₹6370",
      discount: "35%"
    },
    {
      id: 15,
      image: Placeholder,
      title: "La Perle by Dragone Show Tickets",
      location: "Dubai",
      rating: 4.7,
      reviews: 16427,
      originalPrice: "₹12500",
      discountedPrice: "₹8125",
      discount: "35%"
    },
    {
      id: 16,
      image: Placeholder,
      title: "Ferrari World Abu Dhabi Tickets",
      location: "Abu Dhabi",
      rating: 4.6,
      reviews: 29184,
      originalPrice: "₹17500",
      discountedPrice: "₹11375",
      discount: "35%"
    },
    {
      id: 17,
      image: Placeholder,
      title: "Yas Waterworld Abu Dhabi Tickets",
      location: "Abu Dhabi",
      rating: 4.7,
      reviews: 23156,
      originalPrice: "₹13500",
      discountedPrice: "₹8775",
      discount: "35%"
    },
    {
      id: 18,
      image: Placeholder,
      title: "Dubai Creek Dhow Dinner Cruise",
      location: "Dubai",
      rating: 4.4,
      reviews: 17689,
      originalPrice: "₹8000",
      discountedPrice: "₹5200",
      discount: "35%"
    },
    {
      id: 19,
      image: Placeholder,
      title: "Louvre Abu Dhabi Tickets",
      location: "Abu Dhabi",
      rating: 4.8,
      reviews: 19254,
      originalPrice: "₹6500",
      discountedPrice: "₹4225",
      discount: "35%"
    },
    {
      id: 20,
      image: Placeholder,
      title: "Dubai Hot Air Balloon Experience",
      location: "Dubai",
      rating: 4.9,
      reviews: 12376,
      originalPrice: "₹32000",
      discountedPrice: "₹25600",
      discount: "20%"
    }
  ];
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
          <div className="w-full flex items-center   justify-center">
            <div className="flex gap-3   w-[80%] mt-15 mb-15 flex-col ">
              <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl py-2 md:flex-row ">
                <div className="w-full">
                  <div className="flex items-center p-3">
                    <span
                      className={`mr-2 cursor-pointer ${
                        citizenIsFocused ? "opacity-100" : "opacity-20"
                      }`}
                      onClick={handleCitizenIconClick}
                    >
                      <img src={Search} alt="Home icon" />
                    </span>
                    <input
                      style={{ border: "none" }}
                      ref={citizenInputRef}
                      type="text"
                      placeholder="Search for Activities ( eg. Burje Khalifa, Universal Studio)"
                      className="w-full bg-transparent outline-none"
                      onFocus={() => setCitizenIsFocused(true)}
                      onBlur={() => setCitizenIsFocused(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* *************tabs***************** */}
          <div>
            <div className="w-full bg-[#F6F8FA]  rounded-xl  border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <nav className="flex items-center justify-start overflow-x-auto py-4 no-scrollbar">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md mr-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <span className="mr-2">
                        {" "}
                        <img src={item.icon} alt="tabs" />{" "}
                      </span>
                      <span>{item.text}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {/* *********************cards****************** */}
          <div className="w-full mt-10 md:mt-24 ">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="p-4">
                {" "}
                <h1 className="text-[32px] font-[600]">Select Your Experiences</h1>
              </div>
              <div className="p-4">
                {" "}
                <div className="relative p-3  border-[#CDD0D5] rounded-[10px] flex flex-col border w-56">
                  <div className="text-xs  text-gray-500 mb-1">
                    Sort Activities by
                  </div>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-between w-full  text-sm text-gray-900    focus:outline-none"
                  >
                    <span>{selectedOption}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {isOpen && (
                    <div className="absolute z-10 w-full mt-10 bg-white border border-gray-200 rounded-md shadow-lg">
                      <ul className="py-1">
                        {options.map((option) => (
                          <li
                            key={option}
                            onClick={() => selectOption(option)}
                            className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                          >
                            <span className="flex-grow">{option}</span>
                            {selectedOption === option && (
                              <Check className="w-4 h-4 text-blue-600" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>{" "}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {cardData.map((card) => (
        <Card 
          key={card.id}
          image={card.image}
          title={card.title}
          location={card.location}
          rating={card.rating}
          reviews={card.reviews}
          originalPrice={card.originalPrice}
          discountedPrice={card.discountedPrice}
          discount={card.discount}
        />
      ))}
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
