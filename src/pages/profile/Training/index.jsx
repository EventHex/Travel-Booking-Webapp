import React from 'react';

const VideoTutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: 'How to apply for a visa?',
      thumbnail: '/api/placeholder/400/320',
      logo: 'atlys',
      url: 'business.atlys.com'
    },
    {
      id: 2,
      title: 'How to load your wallet?',
      thumbnail: '/api/placeholder/400/320',
      logo: 'atlys',
      url: 'business.atlys.com'
    },
    {
        id: 3,
        title: 'How to load your wallet?',
        thumbnail: '/api/placeholder/400/320',
        logo: 'atlys',
        url: 'business.atlys.com'
      }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Video Tutorials</h2>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="flex flex-col">
              <h3 className="text-xl font-medium text-gray-900 mb-4">{tutorial.title}</h3>
              
              <div className="relative border border-gray-200 rounded-lg overflow-hidden">
                {/* Video Card Header with Logo */}
                <div className="absolute top-0 left-0 z-10 w-full p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="font-bold text-indigo-700">
                      <span className="font-sans">atlys</span>
                      <span className="text-lg align-top">*</span>
                    </div>
                    <div className="ml-1 text-xs text-gray-700">
                      Visas on time, <span className="text-indigo-600">or for free</span>
                    </div>
                  </div>
                  
                  {/* External Link Icon */}
                  <div className="bg-gray-700 p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                
                {/* Video Thumbnail */}
                <div className="relative pt-12 pb-16 bg-gray-100 flex items-center justify-center">
                  {/* Play Button */}
                  <div className="w-20 h-20 rounded-full bg-white bg-opacity-80 flex items-center justify-center border-4 border-gray-200">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* HOW TO Text */}
                  <div className="absolute bottom-4 left-4">
                    <div className="text-xl sm:text-2xl font-bold" style={{ 
                      background: 'linear-gradient(90deg, #4f46e5 0%, #ec4899 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0px 0px 2px rgba(255,255,255,0.5)'
                    }}>
                      HOW TO
                    </div>
                  </div>
                </div>
                
                {/* Video Footer */}
                <div className="px-4 py-2 bg-white text-xs text-gray-600 border-t border-gray-200">
                  Apply @ <span className="text-indigo-600">{tutorial.url}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoTutorials;