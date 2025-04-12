import React, { useState } from "react";
import Input from "../../../components/input";
import File from "../../../components/file";

export const BackPassportForm = () => {
  const [backFormData, setBackFormData] = useState({
    fathersName: "",
    mothersName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const [backImageUrl, setBackImageUrl] = useState(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsProcessing(true);
    setProcessingError(null);

    try {
      const formData = new FormData();
      formData.append("passportImage", file);

      const response = await fetch(
        "http://localhost:8078/api/v1/passport/process-back",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process passport");
      }

      const result = await response.json();

      if (result.success && result.data) {
        // Only update back passport specific fields
        setBackFormData({
          fathersName: result.data.fathersName || "",
          mothersName: result.data.mothersName || "",
        });
        setBackImageUrl(result.data.backImageUrl || null);
      } else {
        setProcessingError(result.error || "Failed to process passport");
        console.error("Error processing passport:", result.error);
      }
    } catch (error) {
      setProcessingError("Failed to upload file");
      console.error("Error uploading file:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBackFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="border-b border-t py-6">
      <div className="max-w-4xl mx-auto">
        <div className="w-[80%]">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Upload Traveler's Back Passport Page
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 py-4">
            Upload a clear passport back page image and the parent's details
            will be filled automatically. Please review the extracted
            information for accuracy.
          </p>
        </div>

        <div className="rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* File Upload Column */}
            <div className="">
              <div className="w-[100%]">
                <File
                  head={"Passport Back Page Image"}
                  onFileSelect={handleFileUpload}
                  loading={isProcessing}
                />
              </div>
              {processingError && (
                <p className="mt-2 text-sm text-red-600">{processingError}</p>
              )}
              {backImageUrl && (
                <div className="mt-4">
                  <img
                    src={backImageUrl}
                    alt="Back Passport Preview"
                    className="max-w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>

            {/* Form Column */}
            <div className="">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Input
                    name="fathersName"
                    value={backFormData.fathersName}
                    onChange={handleInputChange}
                    placeholder="Father's Name"
                    label="Father's Name"
                    required={true}
                  />
                </div>

                <div>
                  <Input
                    name="mothersName"
                    value={backFormData.mothersName}
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
