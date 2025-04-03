import React from "react";
import { useState } from "react";
import {
  Upload,
  Info,
  Clock,
  X,
  Edit,
  Crop,
  RotateCw,
  FlipHorizontal
} from "lucide-react";
import Input from "../../../components/input";
import CustomSelect from "../../../components/dropdown";

export const FrontPassportForm = () => {
  const Options = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "O", label: "Other" },
  ];
  const Metiral = [
    { value: "s", label: "single" },
    { value: "m", label: "married" },
  ];
  const [frontImage, setFrontImage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedImage, setEditedImage] = useState(null);
  const [imageTransform, setImageTransform] = useState({
    rotate: 0,
    flipX: false,
    flipY: false,
    crop: false
  });
  const [formData, setFormData] = useState({
    passportNumber: "",
    firstName: "",
    lastName: "",
    nationality: "",
    sex: "",
    dateOfBirth: "",
    placeOfBirth: "",
    placeOfIssue: "",
    maritalStatus: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    fathersName: "",
    mothersName: "",
  });
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        frontImage: file,
      }));
      
      const imageURL = URL.createObjectURL(file);
      setFrontImage(imageURL);
    }
  };
  
  const [dob, setDob] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const openEditModal = () => {
    setEditedImage(frontImage); // Initialize edited image with current image
    setImageTransform({ // Reset transformations
      rotate: 0,
      flipX: false,
      flipY: false,
      crop: false
    });
    setShowEditModal(true);
  };
  
  // Image editing functions with real-time preview
  const handleCropImage = () => {
    // Toggle crop mode (actual cropping would need a more complex implementation)
    setImageTransform(prev => ({
      ...prev,
      crop: !prev.crop
    }));
  };
  
  const handleFlipImage = () => {
    // Toggle horizontal flip
    setImageTransform(prev => ({
      ...prev,
      flipX: !prev.flipX
    }));
  };
  
  const handleRotateImage = () => {
    // Rotate 90 degrees clockwise
    setImageTransform(prev => ({
      ...prev,
      rotate: (prev.rotate + 90) % 360
    }));
  };
  
  const applyChanges = () => {
    // In a real implementation, you would apply the transformations to the actual image
    // For now, we'll just keep the preview as our "edited" image
    setFrontImage(editedImage);
    setShowEditModal(false);
  };

  return (
    <div className="w-full mx-auto py-4 px-4 md:py-8 md:px-8">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-blue-600 mb-2">
          Traveler 1
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-4">
          Upload Traveler's Front Passport Page
        </h2>
        <p className="text-xs md:text-sm text-gray-600">
          Vietnam requires a scan of the traveler's passport. Upload a clear
          passport image and your details will be filled automatically. All
          fields with (*) are mandatory. Please review the information before
          submitting to ensure there are no mistakes.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col lg:flex-row w-full gap-x-4 lg:gap-x-8 gap-y-6">
            <div className="w-full lg:w-[50%]">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passport Front Page Image
                  <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
                  <input
                    type="file"
                    className="hidden"
                    id="passport-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="passport-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400" 
                      onChange={handleFileChange} 
                    />
                    {frontImage && (
                      <div className="relative mt-2">
                        <button 
                          type="button" 
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100" 
                          onClick={openEditModal}
                        >
                          <Edit size={20} className="text-blue-600" />
                        </button>
                        <img src={frontImage} alt="image" width="500" />
                      </div>
                    )}
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
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[50%]">
              <div className="mb-4 md:mb-5">
                <Input
                  placeholder={"Passport Number"}
                  label={"Passport Number"}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4 md:mb-5">
                  <Input placeholder={"First Name"} label={"First Name"} />
                </div>
                <div>
                  <Input placeholder={" Last Name"} label={" Last Name"} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="mb-4 md:mb-5">
                  <Input
                    label={" Nationality"}
                    placeholder={" Nationality"}
                  />
                </div>
                <div>
                  <CustomSelect label={"Sex"} options={Options} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4 md:mb-5">
                <Input
                  placeholder={" Place of Birth"}
                  label={" Place of Birth"}
                />
              </div>

              <div className="mb-4 md:mb-5">
                <Input
                  placeholder={" Place of Issue"}
                  label={" Place of Issue"}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <CustomSelect options={Metiral} label="Marital Status" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Issue<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfIssue"
                    value={formData.dateOfIssue}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Expiry<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfExpiry"
                    value={formData.dateOfExpiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Image Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Edit Image</h3>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Image Preview */}
              <div className="mb-6 flex justify-center">
                <div className="relative  flex justify-center overflow-hidden" style={{ maxWidth: '100%', maxHeight: '300px' }}>
                  <img 
                    src={editedImage} 
                    alt="Preview" 
                    className={`max-w-full max-h-full object-contain ${imageTransform.crop ? 'border-2 border-blue-500' : ''}`}
                    style={{
                      transform: `rotate(${imageTransform.rotate}deg) scaleX(${imageTransform.flipX ? -1 : 1}) scaleY(${imageTransform.flipY ? -1 : 1})`,
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  type="button"
                  onClick={handleCropImage}
                  className={`flex flex-col items-center justify-center p-3 border ${imageTransform.crop ? 'bg-blue-100 border-blue-300' : 'border-gray-200'} rounded-lg hover:bg-gray-50`}
                >
                  <Crop size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm">Crop</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleFlipImage}
                  className={`flex flex-col items-center justify-center p-3 border ${imageTransform.flipX ? 'bg-blue-100 border-blue-300' : 'border-gray-200'} rounded-lg hover:bg-gray-50`}
                >
                  <FlipHorizontal size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm">Flip</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleRotateImage}
                  className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <RotateCw size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm">Rotate {imageTransform.rotate}°</span>
                </button>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={applyChanges}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};