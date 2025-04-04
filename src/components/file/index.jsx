import React, { useState } from 'react'
import {
    Upload,
  
  } from "lucide-react";

const File = ({className, head}) => {
  const [previewImage, setPreviewImage] = useState(null); // New state for preview


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        frontImage: file,
      }));
      
      const imageURL = URL.createObjectURL(file);
      setFrontImage(imageURL);
      setPreviewImage(imageURL); // Set initial preview
    }
  };
  

  return (
    <div className="w-full">
              <div className="col-span-2">
                <label className="block text-[12px] font-medium text-gray-700 mb-1">
                  {/* Passport Front Page Image */}
                  {head}
                  <span className="text-red-500">*</span>
                </label>
                  <div className="bg-white border-2  border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
                    {!previewImage ? (
                      <>
                        <input
                          type="file"
                          className="hidden"
                          id="passport-upload"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="passport-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400" />
                          <span className="text-xs md:text-sm text-gray-600">
                            Choose a file or drag & drop it here
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            JPEG, PNG, PDF and NPF formats, up to 50 MB
                          </span>
                          <button
                            type="button"
                            className="mt-3 px-3 py-1 md:px-4 md:py-2 bg-white border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
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
  )
}

export default File
