import React, { useState } from "react";
import { Saveline, UserAdd } from "../../../assets";

export const TravelPhoto = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [hotelPreview, setHotelPreview] = useState(null);

  const [processingError, setProcessingError] = useState(null);
  const [backImageUrl, setBackImageUrl] = useState(null);
  const [backFormData, setBackFormData] = useState({
    fathersName: "",
    mothersName: "",
  });

  const [documents, setDocuments] = useState({
    flightTicket: null,
    hotelBooking: null,
  });

  const handleSubmitTicketBooking = (e) => {
    e.preventDefault();
    console.log("Submitted documents:", documents);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log("File selected:", file);

    if (!file) return;

    const filePreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(filePreviewUrl);

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

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="max-w-6xl mx-auto overflow-hidden">
        <form onSubmit={handleSubmitTicketBooking}>
          <div className="w-full">
            {/* Flight Ticket Section */}
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-5 border-b pb-6 md:pb-8 md:border-b-0 border-gray-200">
              <div className="w-full md:w-[50%]">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  Round Trip Flight Ticket
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-8">
                  Ensure all round trip tickets (both onward and return).
                  Highlight the passenger's name clearly.
                </p>
              </div>
              <div className="relative w-full md:w-[50%]">
                <div className="w-[100%]">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                            accept="image/*"
                            disabled={isProcessing}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      {isProcessing && (
                        <div className="text-sm text-blue-600">Processing...</div>
                      )}
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto mt-4 max-w-xs rounded-md"
                        />
                      )}
                      {processingError && (
                        <p className="text-sm text-red-600 mt-2">{processingError}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Booking Section */}
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-5">
              <div className="w-full md:w-[50%]">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  Hotel Booking
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-8">
                  Hotel booking should be for the same day as the passenger's
                  arrival in Dubai. Highlight the passenger's name clearly.
                </p>
              </div>
              <div className="w-full md:w-[50%] relative">
                <div className="w-[100%]">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                          htmlFor="hotel-booking-upload"
                          className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload Hotel Booking</span>
                          <input
                            id="hotel-booking-upload"
                            name="hotel-booking-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              const fileUrl = URL.createObjectURL(file);
                              setDocuments((prev) => ({
                                ...prev,
                                hotelBooking: file,
                              }));
                              setHotelPreview(fileUrl);
                            }}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      {hotelPreview && (
                        <img
                          src={hotelPreview}
                          alt="Hotel Booking Preview"
                          className="mx-auto mt-4 max-w-xs rounded-md"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="w-full mt-10 px-4 md:px-0">
              <div className="w-full md:w-[50%]">
                <div className="flex flex-col sm:flex-row py-4 md:py-5 border-t border-[#CDD0D5] gap-3 sm:gap-5">
                  <button className="gap-2 bg-blue-600 hover:bg-blue-700 w-full justify-center py-2 flex text-[14px] font-[400] text-white rounded-md">
                    <img src={UserAdd} alt="" /> Add Another Traveller
                  </button>
                  <button className="gap-2 bg-blue-600 hover:bg-blue-700 flex w-full justify-center py-2 text-[14px] font-[400] text-white rounded-md">
                    <img src={Saveline} alt="" /> Review & Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
