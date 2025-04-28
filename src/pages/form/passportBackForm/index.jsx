import React, { useState } from "react";
import Input from "../../../components/input";
import instance from "../../../instance";

export const BackPassportForm = ({
  formData,
  setFormData,
  previewUrl,
  setPreviewUrl,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const [backImageUrl, setBackImageUrl] = useState(null);
  // const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create a preview URL for the file before uploading
    const filePreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(filePreviewUrl);

    setIsProcessing(true);
    setProcessingError(null);

    try {
      const formData = new FormData();
      formData.append("passportImage", file);
      formData.append("side", "back");

      // Get the current passport ID
      const passportId = localStorage.getItem("currentPassportId");
      
      if (!passportId) {
        throw new Error("Please upload the front page of the passport first");
      }
      
      formData.append("passportId", passportId);

      const response = await instance.post("/passport/process", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to process passport");
      }

      const result = response.data;

      if (result.success && result.data) {
        setFormData({
          fathersName: result.data.fathersName || "",
          mothersName: result.data.mothersName || "",
        });
      } else {
        setProcessingError(result.error || "Failed to process passport");
      }
    } catch (error) {
      setProcessingError(error.message || "Failed to upload file");
      console.error("Error uploading file:", error);
      // Clear preview if there's an error
      setPreviewUrl(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Clean up the preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Function to handle canceling the preview
  const handleCancelPreview = () => {
    setPreviewUrl(null);
  };

  // Add cleanup for passport ID when component unmounts
  React.useEffect(() => {
    return () => {
      localStorage.removeItem("currentPassportId");
    };
  }, []);

  return (
    <div className="border-b border-t py-6">
      <div className="max-w-4xl mx-auto">
        <div className="w-[80%]">
          <h1 className="text-[14px] sm:text-2xl font-medium text-gray-900">
            Upload Traveler's Back Passport Page
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 py-4">
            Upload a clear passport back page image and the parent's details
            will be filled automatically. Please review the extracted
            information for accuracy.
          </p>
        </div>

        <div className="  rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* File Upload/Preview Column */}
            <div className="">
              <div className="w-[100%]">
                {previewUrl ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Passport Back Page Preview:
                    </h3>
                    <img
                      src={previewUrl}
                      alt="Passport Preview"
                      className="max-w-full h-auto rounded-lg shadow-sm mb-3"
                    />
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={handleCancelPreview}
                        className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                      >
                        Cancel
                      </button>
                      {isProcessing && (
                        <div className="text-sm text-blue-600">
                          Processing...
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed  border-gray-300 rounded-lg p-6 text-center">
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
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload Passport Back Page Image</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileUpload}
                            accept="image/*,application/pdf"
                            disabled={isProcessing}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB
                      </p>
                      {isProcessing && (
                        <div className="text-sm text-blue-600">
                          Processing...
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {processingError && (
                <p className="mt-2 text-sm text-red-600">{processingError}</p>
              )}
            </div>

            {/* Form Column */}
            <div className="">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Input
                    name="fathersName"
                    value={formData.fathersName}
                    onChange={handleInputChange}
                    placeholder="Father's Name"
                    label="Father's Name"
                    required={true}
                  />
                </div>

                <div>
                  <Input
                    name="mothersName"
                    value={formData.mothersName}
                    onChange={handleInputChange}
                    placeholder="Mother's Name"
                    label="Mother's Name"
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
