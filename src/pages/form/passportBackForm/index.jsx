import React, { useState } from "react";
import {
    Upload,
  } from "lucide-react";
  import Input from "../../../components/input";  
  import {CustomSelect} from "../../../components/dropdown";
  import File from "../../../components/file";
 
 export const BackPassportForm = () => {
    
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };
    return (
      <div className=" border-b border-t py-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-[80%]">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Upload Traveler's Back Passport Page
            </h1>
            <p className=" text-xs sm:text-sm text-gray-600 py-4">
              Vietnam requires a scan of the traveler's passport. Upload a clear
              passport image and your details will be filled automatically. AI
              has built its own OCR which is 99.9% accurate. However, it is
              mandatory to review the information before submitting to ensure
              there are no mistakes.
            </p>
          </div>


          <div className=" rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* File Upload Column */}
              <div className="">
                <div className="w-[100%]">
                  <File head={"Passport Back Page Image"} />
                </div>
                {/* <div className="space-y-3 md:space-y-4">
                  <label className="block text-[12px] font-medium text-gray-700">
                    Passport Back Page Image
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 sm:space-y-2 text-center">
                      <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                      <div className="flex flex-col sm:flex-row items-center justify-center text-xs sm:text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Choose a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg,image/png,image/gif"
                            onChange={handleFileUpload}
                          />
                        </label>
                        <p className="pl-1 mt-1 sm:mt-0">
                          or drag & drop it here.
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        JPEG, PNG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Form Column */}
              <div className="">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Input
                      placeholder={`Father's Name`}
                      label="Father's Name"
                      required={true}
                    />
                  </div>

                  <div>
                    <Input
                      placeholder={`Mother's Name`}
                      label="Mother's Name"
                      required={true}
                    />
                  </div>

                  {/* <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
