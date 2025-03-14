import React from "react";
import { TabMenu } from "../../components/tabs";
import {
  Men,
  MainBackground,
  LogoBlue,
  CreditCard,
  QuestionMark,
  User,
  HeadSet,
} from "../../assets";
// import { SearchBar } from "./SearchBar";

const HeroSection = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-[1300px]  py-3 w-full ">
        <div className="w-[100%] flex items-center">
          <div className="w-[50%] flex gap-5 ">
            <div className="w-[30%]">
              <img src={LogoBlue} alt="" />
            </div>
            <div className="w-[70%] flex   ">
              <ul className="flex  items-center gap-4 justify-center">
                <li className="hover:text-[#375DFB]">Apply</li>
                <li className="hover:text-[#375DFB]"> Dash Board</li>
              </ul>
            </div>
          </div>

          <div className="w-[50%] flex justify-end  ">
            <div className=" items-center  gap-[14px] flex">
              <div>
                <button className=" text-[14px] font-[500] bg-[#EBF1FF] rounded-[10px] flex gap-4 py-1 px-3">
                  <img src={CreditCard} alt="credit" />
                  30,839
                </button>
              </div>
              <div className="flex px-4  gap-[14px]">
                <div className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center  rounded-full">
                  <img src={HeadSet} alt="" />
                </div>
                <div className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center  rounded-full">
                  <img src={QuestionMark} alt="" />
                </div>
                <div className="border border-[#E2E4E9] w-10 h-10 flex items-center justify-center   rounded-full">
                  <img src={User} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // {/* <div>
    //     <div>

    //     </div>
    //     <div
    //       className="w-full flex"
    //       style={{
    //         backgroundImage: `url(${MainBackground})`,
    //         backgroundSize: "cover",
    //         backgroundPosition: "center",
    //       }}
    //     >
    //       <div className="w-full flex-col  flex">
    //         <div className="w-full flex">
    //           <div className="w-[60%]"></div>
    //           <div className="w-[40%]  flex justify-center items-end ">
    //             <img
    //               src={Men}
    //               alt="image"
    //               className="w-full  md:w-96 h-auto object-contain"
    //             />
    //           </div>
    //         </div>
    //         <div
    //           className="rounded-tl-xl rounded-tr-xl"
    //           style={{ background: "linear-gradient(to right, #1C1C82, #24186C)" }}
    //         >
    //           Content goes here
    //         </div>
    //       </div>
    //     </div>
    //     </div> */}
  );
};

export default HeroSection;
