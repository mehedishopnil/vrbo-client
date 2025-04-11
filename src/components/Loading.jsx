import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* DaisyUI loading spinner with custom styling */}
        <span className="loading loading-spinner loading-lg text-[#D1A054]"></span>
        
        {/* Optional loading text */}
        <p className="mt-4 text-xl font-medium text-white">Loading...</p>
        
        {/* Optional progress bar (remove if not needed) */}
        <div className="w-64 mt-6 bg-gray-200 rounded-full h-2.5 mx-auto">
          <div className="bg-[#D1A054] h-2.5 rounded-full animate-pulse" style={{width: '45%'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;