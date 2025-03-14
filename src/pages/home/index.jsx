import React from "react";
import { TabMenu } from "../../components/tabs";
import { Men, MainBackground } from "../../assets";
// import { SearchBar } from "./SearchBar";

const HeroSection = () => {
  return (
    <div
      className="w-full flex"
      style={{
        backgroundImage: `url(${MainBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full flex-col  flex">
        <div className="w-full flex">
          <div className="w-[60%]"></div>
          <div className="w-[40%]  flex justify-center items-end ">
            <img
              src={Men}
              alt="image"
              className="w-full  md:w-96 h-auto object-contain"
            />
          </div>
        </div>
        <div
          className="rounded-tl-xl rounded-tr-xl"
          style={{ background: "linear-gradient(to right, #1C1C82, #24186C)" }}
        >
          Content goes here
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
