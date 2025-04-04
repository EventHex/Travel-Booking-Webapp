import React, { useState } from 'react';

const OverstayTracker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overstay');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  // Handle sorting when a column header is clicked
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Toggle between tabs
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=" max-w-6xl bg-green-200 w-full  ">
      {/* Navigation Tabs */}
      <div className="flex  mb-4   sm:mb-6 overflow-x-auto pb-1 no-scrollbar">
        <div 
          className={`text-lg sm:text-xl md:text-2xl pb-2 mr-4 cursor-pointer whitespace-nowrap ${activeTab === 'overstay' ? 'font-bold text-gray-900 border-b-2 border-gray-900' : 'font-normal text-gray-400'}`}
          onClick={() => toggleTab('overstay')}
        >
          Overstay
        </div>
        <div 
          className={`text-lg sm:text-xl md:text-2xl pb-2 cursor-pointer whitespace-nowrap ${activeTab === 'history' ? 'font-bold text-gray-900 border-b-2 border-gray-900' : 'font-normal text-gray-400'}`}
          onClick={() => toggleTab('history')}
        >
          History
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 sm:mb-6 w-full">
        <input
          type="text"
          placeholder="Search names..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full  sm:max-w-sm  rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table Container with horizontal scroll */}
      <div className="border border-gray-200 rounded-md w-full overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200 table-fixed sm:table-auto">
            <thead>
              <tr className="bg-white">
                <th 
                  className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-900 cursor-pointer whitespace-nowrap"
                  onClick={() => requestSort('name')}
                >
                  Name <span className="inline-block ml-1">↕</span>
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                  Passport number
                </th>
                {activeTab === 'overstay' ? (
                  <th 
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-900 cursor-pointer whitespace-nowrap"
                    onClick={() => requestSort('daysLeft')}
                  >
                    Days left <span className="hidden sm:inline-block">to overstay</span> <span className="inline-block ml-1">↕</span>
                  </th>
                ) : (
                  <th 
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-900 cursor-pointer whitespace-nowrap"
                    onClick={() => requestSort('exitDate')}
                  >
                    Exit date <span className="inline-block ml-1">↕</span>
                  </th>
                )}
                <th 
                  className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-900 cursor-pointer whitespace-nowrap"
                  onClick={() => requestSort('entryDate')}
                >
                  Entry date <span className="inline-block ml-1">↕</span>
                </th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                  Status
                </th>
                {activeTab === 'overstay' && (
                  <>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                      <span className="hidden sm:inline-block">Amount to pay</span>
                      <span className="sm:hidden">Payment</span>
                    </th>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                      Actions
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Empty state */}
              <tr className="h-48 sm:h-64 md:h-80">
                <td colSpan={activeTab === 'overstay' ? "7" : "5"} className="text-center p-2 sm:p-4">
                  <div className="flex flex-col items-center justify-center">
                    {activeTab === 'overstay' ? (
                      <>
                        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 mb-3 md:mb-4">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            <g>
                              <ellipse cx="100" cy="100" rx="90" ry="90" fill="transparent" />
                              {/* Astronaut */}
                              <g transform="translate(40, 50)">
                                {/* Body */}
                                <path d="M60 40 Q80 20 90 60 Q95 80 80 100 Q65 110 50 100 Q40 90 40 70 Q45 50 60 40" fill="#f0f0f5" stroke="#e0e0e0" strokeWidth="2" />
                                
                                {/* Helmet */}
                                <circle cx="65" cy="40" r="20" fill="#1a1a3a" />
                                
                                {/* Arms */}
                                <path d="M80 60 Q100 50 110 70" fill="none" stroke="#f0f0f5" strokeWidth="10" strokeLinecap="round" />
                                <path d="M45 65 Q25 75 20 95" fill="none" stroke="#f0f0f5" strokeWidth="10" strokeLinecap="round" />
                                
                                {/* Legs */}
                                <path d="M55 100 Q50 120 45 140" fill="none" stroke="#6366f1" strokeWidth="12" strokeLinecap="round" />
                                <path d="M75 100 Q80 120 85 140" fill="none" stroke="#6366f1" strokeWidth="12" strokeLinecap="round" />
                                
                                {/* Boots */}
                                <ellipse cx="42" cy="145" rx="12" ry="7" fill="#1a1a3a" />
                                <ellipse cx="88" cy="145" rx="12" ry="7" fill="#1a1a3a" />
                                
                                {/* Blue accents */}
                                <path d="M60 60 Q70 55 80 60 Q85 70 80 80 Q70 85 60 80 Q55 70 60 60" fill="#6366f1" />
                              </g>
                              
                              {/* Magnifying glass */}
                              <circle cx="110" cy="85" r="25" fill="#6366f1" stroke="#4f46e5" strokeWidth="5" opacity="0.9" />
                              <line x1="125" y1="100" x2="145" y2="120" stroke="#4f46e5" strokeWidth="8" strokeLinecap="round" />
                              <circle cx="110" cy="85" r="15" fill="white" opacity="0.3" />
                              
                              {/* Stars */}
                              <g opacity="0.6">
                                <path d="M40 100 L42 105 L47 105 L43 108 L45 113 L40 110 L35 113 L37 108 L33 105 L38 105 Z" fill="#6366f1" />
                                <path d="M160 50 L162 55 L167 55 L163 58 L165 63 L160 60 L155 63 L157 58 L153 55 L158 55 Z" fill="#6366f1" />
                                <path d="M150 130 L152 135 L157 135 L153 138 L155 143 L150 140 L145 143 L147 138 L143 135 L148 135 Z" fill="#6366f1" />
                                <path d="M80 30 L82 35 L87 35 L83 38 L85 43 L80 40 L75 43 L77 38 L73 35 L78 35 Z" fill="#6366f1" />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm md:text-base px-2 text-center">None of your travellers have overstayed or absconded!</p>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 mb-3 md:mb-4">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            <g>
                              {/* Person with document */}
                              <g transform="translate(40, 25)">
                                {/* Document */}
                                <rect x="20" y="10" width="50" height="60" fill="white" stroke="#1a1a3a" strokeWidth="2" />
                                <path d="M20 10 L70 10 L80 20 L80 70 L30 70 Z" fill="white" stroke="#1a1a3a" strokeWidth="2" />
                                <rect x="70" y="10" width="10" height="10" fill="#1a1a3a" />
                                <line x1="30" y1="25" x2="70" y2="25" stroke="#1a1a3a" strokeWidth="1" />
                                <line x1="30" y1="35" x2="70" y2="35" stroke="#1a1a3a" strokeWidth="1" />
                                <line x1="30" y1="45" x2="70" y2="45" stroke="#1a1a3a" strokeWidth="1" />
                                <line x1="30" y1="55" x2="60" y2="55" stroke="#1a1a3a" strokeWidth="1" />
                                
                                {/* Person */}
                                <g transform="translate(20, 50)">
                                  {/* Body */}
                                  <rect x="20" y="30" width="30" height="50" fill="#4f46e5" rx="2" />
                                  
                                  {/* Head */}
                                  <circle cx="35" cy="20" r="10" fill="white" stroke="#1a1a3a" strokeWidth="1" />
                                  <path d="M30 18 Q32 16 35 18" stroke="#1a1a3a" strokeWidth="1" fill="none" />
                                  <path d="M40 18 Q38 16 35 18" stroke="#1a1a3a" strokeWidth="1" fill="none" />
                                  
                                  {/* Arms */}
                                  <path d="M20 40 L5 20" stroke="#4f46e5" strokeWidth="8" strokeLinecap="round" />
                                  <path d="M50 40 L65 20" stroke="#4f46e5" strokeWidth="8" strokeLinecap="round" />
                                  
                                  {/* Legs */}
                                  <rect x="20" y="80" width="30" height="15" fill="#1a1a3a" rx="2" />
                                </g>
                              </g>
                              
                              {/* Question mark bubble */}
                              <ellipse cx="120" cy="40" rx="25" ry="20" fill="white" stroke="#1a1a3a" strokeWidth="1" />
                              <text x="120" y="45" textAnchor="middle" fontSize="24" fill="#1a1a3a">?</text>
                            </g>
                          </svg>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm md:text-base px-2 text-center">You do not have any history for overstay and absconding.</p>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverstayTracker;