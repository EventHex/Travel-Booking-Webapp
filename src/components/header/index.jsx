import React, { useState, useEffect, useRef } from "react";
import {
  LogoBlue,
  CreditCard,
  QuestionMark,
  User,
  HeadSet,
} from "../../assets";
import {
  X,
  ChevronRight,
  Clock,
  AlertTriangle,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const helpRef = useRef(null);
  const modalRef = useRef(null);
  const helpToggleRef = useRef(null);
  const modalToggleRef = useRef(null);

  // Function to handle modal toggle with stop propagation
  const toggleHelp = (e) => {
    e.stopPropagation();
    setShowHelp(!showHelp);
  };

  const toggleModal = (e) => {
    e.stopPropagation();
    setShowModal(!showModal);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // For help modal
      if (
        showHelp &&
        helpRef.current && 
        !helpRef.current.contains(event.target) &&
        helpToggleRef.current && 
        !helpToggleRef.current.contains(event.target)
      ) {
        setShowHelp(false);
      }
      
      // For question modal
      if (
        showModal &&
        modalRef.current && 
        !modalRef.current.contains(event.target) &&
        modalToggleRef.current && 
        !modalToggleRef.current.contains(event.target)
      ) {
        setShowModal(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHelp, showModal]);

  // Stop propagation on modal content clicks
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="w-full shadow-sm py-4 bg-white justify-center flex"
      onClick={() => {
        setShowHelp(false);
        setShowModal(false);
      }}
    >
      <div 
        className="max-w-[1300px] w-full flex flex-col md:flex-row items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* First child div - takes full width on mobile, 50% on md and above */}
        <div className="w-full md:w-[50%] flex gap-5">
          <div className="w-[30%] flex justify-center items-center px-2">
            <Link to="/">
              <img   className="w-[100px]" src={LogoBlue} alt="" />
            </Link>
          </div>
          <div className="w-[70%]  justify-end p-2 md:justify-start flex">
            <ul className="flex items-center gap-4 justify-center">
              <Link to="/apply">
                <li className="hover:text-[#375DFB]">Apply</li>
              </Link>
              <Link to="/dashboard">
                <li className="hover:text-[#375DFB]">Dashboard</li>
              </Link>
            </ul>
          </div>
        </div>

        {/* Second child div - takes full width on mobile, 50% on md and above */}
        <div className="w-full md:w-[50%] flex justify-center md:justify-end mt-4 md:mt-0">
          <div className="items-center gap-[14px] flex">
            <div>
              <button className="text-[14px] font-[500] bg-[#EBF1FF] rounded-[10px] flex gap-4 py-2 px-3">
                <img src={CreditCard} alt="credit" />
                30,839
              </button>
            </div>
            <div className="flex px-4 gap-[14px]">
              <div
                ref={helpToggleRef}
                className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
                onClick={toggleHelp}
              >
                <img src={HeadSet} alt="" />
              </div>
              <div
                ref={modalToggleRef}
                className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
                onClick={toggleModal}
              >
                <img src={QuestionMark} alt="" />
              </div>
              <Link to="/profle">
                <div className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center rounded-full">
                  <img src={User} alt="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showHelp && (
        <div 
          ref={helpRef}
          className="absolute right-4 md:right-58 top-24 bg-white p-4 md:p-6 rounded-lg shadow-lg w-[90%] md:w-80 mx-4 md:mx-0 z-50"
          onClick={handleModalContentClick}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-semibold">Need help?</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowHelp(false);
              }}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              ✕
            </button>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3">
            For any assistance, please reach out to:
          </p>
          <div className="text-sm md:text-base mb-2">Your Account Manager</div>
          <div className="text-sm md:text-base font-medium mb-2">
            Kshitij Kamale
          </div>
          <div className="text-sm md:text-base text-gray-600 mb-1">
            7045870865
          </div>
          <div className="text-sm md:text-base text-gray-600">
            kshitij@atlys.com
          </div>
        </div>
      )}

      {showModal && (
        <div 
          ref={modalRef}
          className="absolute top-24 z-20 md:right-44 right-24 p-6 bg-white rounded-lg shadow-md max-w-lg"
          onClick={handleModalContentClick}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Help</h1>
            <button
              className="text-gray-400"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Create Support Ticket */}
            <button className="flex items-center justify-between w-full p-4 border border-[#E2E4E9] rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <div className="p-1.5 bg-blue-100 rounded-md mr-3">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H18C18.5523 20 19 19.5523 19 19V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 2L21 5L14 12H11V9L18 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium">Create a New Support Ticket</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            {/* View Support Tickets */}
            <button className="flex items-center justify-between w-full p-4 border  border-[#E2E4E9] rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <div className="p-1.5 bg-blue-100 rounded-md mr-3">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 3H11C9.89543 3 9 3.89543 9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5C15 3.89543 14.1046 3 13 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="9"
                      y1="12"
                      x2="15"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="9"
                      y1="16"
                      x2="15"
                      y2="16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="font-medium">View all Support Tickets</span>
              </div>
              <div className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full text-xs mr-2">
                  2
                </span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </button>

            {/* Support Hours */}
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-start mb-2">
                <Clock className="mr-2 text-gray-600" size={20} />
                <div>
                  <h2 className="font-bold text-gray-800">
                    Atlys Support Hours (IST)
                  </h2>
                  <span className="text-sm text-gray-600">
                    Response time 2 hrs
                  </span>
                </div>
              </div>

              <div className="pl-7 mt-3">
                <div className="flex mb-2">
                  <span className="font-medium w-24">Mon-Sat:</span>
                  <span className="text-gray-700">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-24">Sunday:</span>
                  <span className="text-gray-700">9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Emergency Hotline */}
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-start mb-2">
                <AlertTriangle className="mr-2 text-red-500" size={20} />
                <div>
                  <h2 className="font-bold text-gray-800">
                    Atlys Emergency 24x7 Hotline:{" "}
                    <span className="text-blue-500">+91 22 48934242</span>
                  </h2>
                </div>
              </div>

              <div className="pl-7 mt-1">
                <p className="text-gray-700">
                  Please only call if it's a real emergency or escalation. For
                  everything else, please create a support ticket.
                </p>
              </div>
            </div>

            {/* Product Demo */}
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-start mb-3">
                <Headphones className="mr-2 text-gray-600" size={20} />
                <h2 className="font-bold text-gray-800">
                  Have questions about the product?
                </h2>
              </div>

              <div className="pl-7">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
                  Join product demo call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;