import React from 'react'
import { Placeholder,Star } from '../../assets'
const index = () => {
  return (
    <div className="  flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl hover:shadow-lg duration-300   overflow-hidden max-w-[300px]">
      {/* Image Section */}
      <div className="  relative">
        <img 
          src={Placeholder}
          alt="Burj Khalifa Experience" 
          className="w-full h-48 object-cover"
        />
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-[20px] font-[600] mb-1">
          Burj Khalifa At the Top Tickets: Level 124 & 125
        </h2>
        
        <p className="text-gray-600 mb-2">Dubai</p>
        
        {/* Rating Section */}
        <div className="flex items-center gap-1 mb-3">
            <img src={Star} alt="" />
          <span className="font-semibold">4.5</span>
          <span className="text-gray-500 text-sm">(34916 reviews)</span>
        </div>
        
        {/* Price Section */}
        <div className="flex  justify-between">
          <div className='w-[50%]'>
            <div className="text-gray-500 line-through text-[14px]">₹8864</div>
            <div className="text-[20px] font-bold">₹5317</div>
          </div>
          <div className='flex w-[50%]  justify-end items-end '>

          <span className="border-[#00963C] text-[#00963C] border text-[14px]  px-2 py-1 rounded-md">
            Save up to 39%
          </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default index
