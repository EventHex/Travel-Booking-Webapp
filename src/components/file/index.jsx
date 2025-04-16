import React, { useState } from 'react';
import { Upload, Edit } from "lucide-react";

const FileComponent = ({ className, head, onFileSelect, loading }) => {
  // We won't use internal preview state since the parent component handles it
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Call the parent's onFileSelect callback with the file
      if (onFileSelect && typeof onFileSelect === 'function') {
        onFileSelect(file);
      }
    }
  };
  
  const handleRemoveImage = () => {
    setSelectedFile(null);
    // Notify parent that image was removed
    if (onFileSelect && typeof onFileSelect === 'function') {
      onFileSelect(null);
    }
  };

  // Helper function to add magnifier effect (simplified version)
  const addMagnifierEffect = (imgEl) => {
    // Simple magnifier effect implementation
    // You can expand this based on your requirements
    imgEl.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = imgEl.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      imgEl.style.transformOrigin = `${x * 100}% ${y * 100}%`;
      imgEl.style.transform = 'scale(1.5)';
    });
    
    imgEl.addEventListener('mouseleave', () => {
      imgEl.style.transform = 'scale(1)';
    });
  };

  const openEditModal = () => {
    // Implement edit modal functionality if needed
    console.log("Edit image functionality would go here");
  };

  return (
    <div className={`w-full ${className || ''}`}>
      <div className="col-span-2">
        <label className="block text-[16px] font-[400] text-gray-700 py-2">
          {head}
          <span className="text-red-500">*</span>
        </label>
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
          {!selectedFile ? (
            <>
              <input
                type="file"
                className="hidden"
                id={`file-upload-${head}`}
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
              />
              <label
                htmlFor={`file-upload-${head}`}
                className={`cursor-pointer flex flex-col items-center ${loading ? 'opacity-50' : ''}`}
              >
                <Upload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400" />
                <span className="text-[14px] md:text-sm text-gray-600">
                  Choose a file or drag & drop it here
                </span>
                <span className="text-[12px] text-gray-400 mt-1">
                  JPEG, PNG, PDF and NPF formats, up to 50 MB
                </span>
                <button
                  type="button"
                  className="mt-3 px-3 py-1 md:px-4 md:py-2 bg-white border border-[#375DFB] rounded-md text-[14px] md:text-sm font-medium text-[#375DFB] hover:bg-gray-50"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Browse File'}
                </button>
              </label>
            </>
          ) : (
            <div className="relative">
              <div className="flex justify-center">
                <input
                  type="file"
                  id={`file-upload-replace-${head}`}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                <label
                  htmlFor={`file-upload-replace-${head}`}
                  className="cursor-pointer px-3 py-1 md:px-4 md:py-2 bg-white border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {selectedFile.name}
                </label>
              </div>
              
              <div className="mt-3 flex justify-center space-x-2">
                <input
                  type="file"
                  id={`file-upload-replace-${head}`}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                <label
                  htmlFor={`file-upload-replace-${head}`}
                  className="cursor-pointer px-3 py-1 md:px-4 md:py-2 bg-white border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Replace Image
                </label>
                <button
                  type="button"
                  className="px-3 py-1 md:px-4 md:py-2 bg-white border border-red-300 rounded-md text-xs md:text-sm font-medium text-red-700 hover:bg-red-50"
                  onClick={handleRemoveImage}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
          
          {/* Loading indicator */}
          {loading && (
            <div className="mt-2">
              <div className="animate-pulse flex space-x-2 justify-center">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">Processing image...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileComponent;