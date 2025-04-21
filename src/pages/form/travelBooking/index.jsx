import React, { useState } from "react";
import { SingleSelect } from "../../../components/dropdown";

export const UploadTravelerPhoto = ({ photo, setPhoto }) => {
  const Occupations = [
    { value: 1, label: "developer" },
    { value: 2, label: "engineer" },
    { value: 3, label: "doctor" },
  ];

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    
    if (!file) return;

    // Create a preview URL for the file before uploading
    const filePreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(filePreviewUrl);
    setPhoto(file);
  };

  const handleCancelPreview = () => {
    setPreviewUrl(null);
    setPhoto(null);
  };

  return (
    <div className="">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row gap-6 mb-4">
          <div className="w-full md:w-[50%]">
            <h1 className="text-[24px] sm:text-xl font-[600] py-4">
              Upload Traveler Photo
            </h1>
            {/* Left side - Text content */}
            <div className="md:flex-1">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Vietnam requires a scan of the traveler's passport. Upload a
                clear passport image and your details will be filled
                automatically. AI has built-in OCR which is 99.9% accurate.
                However, it is mandatory to review the information before
                submitting to ensure there are no mistakes. See detailed
                guidelines for the perfect passport here. Your visa can get
                rejected if these guidelines are not followed.
              </p>
            </div>
          </div>
          <div className="md:w-[50%] w-full py-2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {previewUrl ? (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Traveler Photo Preview:
                  </h3>
                  <div className="flex justify-center mb-4">
                    <img
                      src={previewUrl}
                      alt="Traveler Photo Preview"
                      className="max-w-full h-48 object-contain rounded-lg shadow-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelPreview}
                    className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-12 h-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-600">
                    <label
                      htmlFor="traveler-photo-upload"
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload Traveler Photo</span>
                      <input
                        id="traveler-photo-upload"
                        name="traveler-photo-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 10MB (Passport-style photo)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Questions Section */}
        <div className="">
          <h2 className="text-[30px] text-[#375DFB] font-[600] border-b py-4 border-[#868C98] w-full md:w-[80%]">
            Answer Additional Required Questions
          </h2>

          <div className="w-full md:w-[60%]">
            <h3 className="text-[24px] text-[#0A0D14] font-[600] py-3">
              What is the traveler's occupation (optional)?
            </h3>
            <p className="text-[14px] text-gray-600">
              This is an optional occupation field. Most people use the default
              - Service. Occupation does not influence the decision of the visa.
            </p>
            <div className="py-4">
              <SingleSelect
                options={Occupations}
                labelClass={"12px"}
                className={"py-[11px]"}
                placeholder={"Select Occupation"}
                label=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
