import React from 'react'
import {
    LogoBlue,
    CreditCard,
    QuestionMark,
    User,
    HeadSet,
  } from "../../assets";
  import {Link} from 'react-router-dom'
const index = () => {
  return (
    <div className="w-full  shadow-sm py-4 bg-white  justify-center flex">
             <div className="max-w-[1300px] w-full  flex flex-col md:flex-row items-center">
               {/* First child div - takes full width on mobile, 50% on md and above */}
               <div className="w-full md:w-[50%]  flex gap-5">
                 <div className="w-[30%] px-2">
                   <img src={LogoBlue} alt="" />
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
  )
}

export default index
