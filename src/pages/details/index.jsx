import React from 'react'
import Header from '../../components/header'
import { MainBackground } from "../../assets"
import SearchInput from '../../components/searchInput'
const index = () => {
  return (
    <div
     style={{
        backgroundImage: `url(${MainBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
    <Header/>
    <div className="w-full flex justify-center">
    <div className="max-w-[1300px] w-full flex-col   flex justify-center">
    <div className="w-full flex items-center   justify-center">
            <div className="flex gap-3   w-[80%] mt-15 mb-15 flex-col ">
              <SearchInput /> 
            </div>
          </div>
</div>
</div>
    </div>
  )
}

export default index
