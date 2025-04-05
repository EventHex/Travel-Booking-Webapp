import React, { useState, useRef } from 'react';
import {
  Upload,
  Edit
} from "lucide-react";

const File = ({className, head}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  // These functions would need to be defined elsewhere or passed as props
  const setFormData = (updater) => {
    // Implementation needed
    console.log("Setting form data", updater);
  };
  
  const setFrontImage = (url) => {
    // Implementation needed 
    console.log("Setting front image", url);
  };
  
  const openEditModal = () => {
    // Implementation needed
    console.log("Opening edit modal");
  };
  
  const addMagnifierEffect = (imgElement) => {
    // Implementation needed
    console.log("Adding magnifier effect");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        frontImage: file,
      }));
      
      const imageURL = URL.createObjectURL(file);
      setFrontImage(imageURL);
      setPreviewImage(imageURL);
    }
  };
  
  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Simulate file input change
      const file = files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        frontImage: file,
      }));
      
      const imageURL = URL.createObjectURL(file);
      setFrontImage(imageURL);
      setPreviewImage(imageURL);
    }
  };

  return (
    <div className="w-full">
      <div className="col-span-2">
        <label className="block text-[16px] font-[400] text-gray-700 py-2">
          {head}
          <span className="text-red-500">*</span>
        </label>
        <div 
          className={`bg-white border-2 border-dashed ${isDragging ? 'border-[#375DFB]' : 'border-gray-300'} rounded-lg p-4 md:p-6 text-center`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!previewImage ? (
            <>
              <input
                type="file"
                className="hidden"
                id="passport-upload"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="passport-upload"
                className="cursor-pointer flex flex-col items-center"
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
                  onClick={() => fileInputRef.current.click()}
                >
                  Browse File
                </button>
              </label>
            </>
          ) : (
            <div className="relative">
              <button 
                type="button" 
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100" 
                onClick={openEditModal}
              >
                <Edit size={20} className="text-blue-600" />
              </button>
              
              {/* Display current preview image with magnifier effect */}
              <div className="flex justify-center">
                <img 
                  src={previewImage} 
                  alt="Passport Preview" 
                  className="max-w-full max-h-64 object-contain" 
                  ref={imgEl => imgEl && addMagnifierEffect(imgEl)}
                />
              </div>
              
              <div className="mt-3 flex justify-center">
                <input
                  type="file"
                  id="passport-upload-replace"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <label
                  htmlFor="passport-upload-replace"
                  className="cursor-pointer px-3 py-1 md:px-4 md:py-2 bg-white border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Replace Image
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default File;