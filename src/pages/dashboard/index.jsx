import { useState } from 'react';
import Header from "../../components/header";
import SideBar from "../../components/sideBar";
import { MainBackground } from "../../assets";

const Index = () => {

 
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${MainBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <div className="w-full">
          <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-5">
            <div className="w-full flex">
              <div className="w-[20%] ">
                <SideBar />
              </div>
              <div className="bg-red-400 w-[80%]">
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
