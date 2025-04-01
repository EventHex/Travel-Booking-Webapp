import React, { useState } from 'react'
import {
    LogoBlue,
    CreditCard,
    QuestionMark,
    User,
    HeadSet,
  } from "../../assets";
  import {Link} from 'react-router-dom'
const index = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="w-full  shadow-sm py-4 bg-white  justify-center flex">
             <div className="max-w-[1300px] w-full  flex flex-col md:flex-row items-center">
               {/* First child div - takes full width on mobile, 50% on md and above */}
               <div className="w-full md:w-[50%]  flex gap-5">
                 <div className="w-[30%] px-2">
                <Link to='/'>
                   <img src={LogoBlue} alt="" />
                 </Link>
                 </div>
                 <div className="w-[70%] flex">
                   <ul className="flex items-center gap-4 justify-center">
                    <Link to='/apply'>
                     <li className="hover:text-[#375DFB]">Apply</li>
                     </Link>
                     <Link to='/dashboard'>
                     <li className="hover:text-[#375DFB]">Dash Board</li>
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
                       className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
                       onClick={() => setShowHelp(!showHelp)}
                     >
                       <img src={HeadSet} alt="" />
                     </div>
                     <div className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center rounded-full">
                       <img src={QuestionMark} alt="" />
                     </div>
                     <Link to='/profle'>                     <div className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center rounded-full">
                       <img src={User} alt="" />
                     </div>
                     </Link>

                   </div>
                 </div>
               </div>
             </div>

           {showHelp && (
             <div className="absolute right-4 md:right-20 top-20 bg-white p-4 md:p-6 rounded-lg shadow-lg w-[90%] md:w-80 mx-4 md:mx-0 z-50">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg md:text-xl font-semibold">Need help?</h3>
                 <button 
                   onClick={() => setShowHelp(false)}
                   className="text-gray-500 hover:text-gray-700 p-2"
                 >
                   ✕
                 </button>
               </div>
               <p className="text-sm md:text-base text-gray-600 mb-3">For any assistance, please reach out to:</p>
               <div className="text-sm md:text-base mb-2">Your Account Manager</div>
               <div className="text-sm md:text-base font-medium mb-2">Kshitij Kamale</div>
               <div className="text-sm md:text-base text-gray-600 mb-1">7045870865</div>
               <div className="text-sm md:text-base text-gray-600">kshitij@atlys.com</div>
             </div>
           )}
           </div>
  )
}

export default index
