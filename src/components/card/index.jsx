import React from 'react'
import { Star } from 'lucide-react';

const index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-[300px]">
      {/* Image Section */}
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1582672752793-08460883bb17?auto=format&fit=crop&q=80"
          alt="Burj Khalifa Experience" 
          className="w-full h-48 object-cover"
        />
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-1">
          Burj Khalifa At the Top Tickets: Level 124 & 125
        </h2>
        
        <p className="text-gray-600 mb-2">Dubai</p>
        
        {/* Rating Section */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">4.5</span>
          <span className="text-gray-500 text-sm">(34916 reviews)</span>
        </div>
        
        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-500 line-through text-sm">₹8864</div>
            <div className="text-xl font-bold">₹5317</div>
          </div>
          <span className="text-green-600 text-sm bg-green-50 px-2 py-1 rounded-full">
            Save up to 39%
          </span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default index
