import React, { useState } from 'react';
import { Search, AlertTriangle, Shield } from 'lucide-react';
import Header from '../../components/header'
const TravelVisaBooking = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
    <Header/>
    <div className="max-w-[1300px] w-full mx-auto p-4 bg-gray-50 rounded-lg">
      {/* Search Form */}
      <div className="flex flex-col lg:flex-row gap-2 mb-6">
        <div className="flex flex-1 gap-1 bg-gray-100 rounded-lg p-2">
          <div className="flex items-center gap-2 flex-1 border-r border-gray-300 pr-2">
            <span className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
            <input placeholder="Citizen Of" className="bg-transparent outline-none flex-1" />
          </div>
          <div className="flex items-center gap-2 flex-1">
            <span className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </span>
            <input placeholder="Going to" className="bg-transparent outline-none flex-1" />
          </div>
        </div>

        <div className="flex flex-1 gap-1">
          <div className="flex items-center gap-2 flex-1 bg-gray-100 rounded-lg p-2">
            <span className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </span>
            <input placeholder="Travel Date" className="bg-transparent outline-none flex-1" />
          </div>

          <div className="flex items-center gap-2 flex-1 bg-gray-100 rounded-lg p-2">
            <span className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </span>
            <input placeholder="Return Date" className="bg-transparent outline-none flex-1" />
          </div>
        </div>

        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg">
          Search
        </button>
      </div>

      {/* Visa Option 1 */}
      <div className="mb-4">
        <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center">
          <span className="mr-2">📦</span>
          <span>Combo offer: Vietnam E-Visa + Reliance Travel Insurance</span>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-b-lg">
          <div className="flex items-center gap-2 mb-4 text-amber-500">
            <AlertTriangle size={20} />
            <p className="text-sm">Your visa will not come in time before your departure date. Your visa will be delivered on 6th Mar, 2025</p>
          </div>
          
          <div className="grid grid-cols-5 gap-4 border-b border-gray-200 pb-2 mb-2">
            <div className="text-gray-600 text-sm">Entry</div>
            <div className="text-gray-600 text-sm">Validity</div>
            <div className="text-gray-600 text-sm">Duration</div>
            <div className="text-gray-600 text-sm">Documents</div>
            <div className="text-gray-600 text-sm">Processing Time</div>
          </div>
          
          <div className="grid grid-cols-5 gap-4 mb-4">
            <div className="text-sm">Single</div>
            <div className="text-sm">30 Days</div>
            <div className="text-sm">30 Days</div>
            <div className="text-sm"><a href="#" className="text-blue-600">View Here</a></div>
            <div className="text-sm">7 business days</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-600 text-sm">Absconding fees</div>
              <div className="text-sm">AED 5,000</div>
            </div>
            
            <div className="flex items-center gap-4">
              <div>
                <div className="text-gray-400 line-through text-sm">₹5,613</div>
                <div className="text-xl font-bold">₹3,891</div>
                <div className="text-green-500 text-xs">Save up to 30% <span className="bg-green-100 rounded-full px-1">✓</span></div>
                <div className="text-gray-500 text-xs">(Includes Discounted Visa & Insurance)</div>
              </div>
              
              <button 
                className={`border border-blue-600 rounded-lg px-6 py-2 ${selectedOption === 1 ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
                onClick={() => setSelectedOption(1)}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visa Option 2 */}
      <div>
        <div className="bg-emerald-500 text-white p-3 rounded-t-lg flex items-center">
          <span className="mr-2">📦</span>
          <span>Combo offer: Vietnam E-Visa + Reliance Travel Insurance</span>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-b-lg">
          <div className="flex items-center gap-2 mb-4 text-blue-500">
            <Shield size={20} />
            <p className="text-sm">Estimated visa arrival by 4th Mar, 2025</p>
          </div>
          
          <div className="grid grid-cols-5 gap-4 border-b border-gray-200 pb-2 mb-2">
            <div className="text-gray-600 text-sm">Entry</div>
            <div className="text-gray-600 text-sm">Validity</div>
            <div className="text-gray-600 text-sm">Duration</div>
            <div className="text-gray-600 text-sm">Documents</div>
            <div className="text-gray-600 text-sm">Processing Time</div>
          </div>
          
          <div className="grid grid-cols-5 gap-4 mb-4">
            <div className="text-sm">Single</div>
            <div className="text-sm">30 Days</div>
            <div className="text-sm">30 Days</div>
            <div className="text-sm"><a href="#" className="text-blue-600">View Here</a></div>
            <div className="text-sm">7 business days</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-600 text-sm">Absconding fees</div>
              <div className="text-sm">AED 5,000</div>
            </div>
            
            <div className="flex items-center gap-4">
              <div>
                <div className="text-gray-400 line-through text-sm">₹5,613</div>
                <div className="text-xl font-bold">₹3,891</div>
                <div className="text-green-500 text-xs">Save up to 30% <span className="bg-green-100 rounded-full px-1">✓</span></div>
                <div className="text-gray-500 text-xs">(Includes Discounted Visa & Insurance)</div>
              </div>
              
              <button 
                className={`border border-blue-600 rounded-lg px-6 py-2 ${selectedOption === 2 ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
                onClick={() => setSelectedOption(2)}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TravelVisaBooking;