import React from "react";
import { useState, useRef, useEffect } from "react";
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
import {CustomSelect} from "../../../components/dropdown";

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
  const [previewImage, setPreviewImage] = useState(null); // New state for preview
  const [imageTransform, setImageTransform] = useState({
    rotate: 0,
    flipX: false,
    flipY: false,
    crop: false
  });
  
  // Refs and state for crop functionality
  const imageRef = useRef(null);
  const [cropSelection, setCropSelection] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    isDragging: false
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
      setPreviewImage(imageURL); // Set initial preview
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
    setCropSelection({
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      isDragging: false
    });
    
    // Short delay to ensure image is loaded properly before showing modal
    setTimeout(() => {
      setShowEditModal(true);
    }, 50);
  };
  
  // Image editing functions with real-time preview
  const handleCropImage = () => {
    // Toggle crop mode without causing the image to disappear
    setImageTransform(prev => ({
      ...prev,
      crop: !prev.crop
    }));
    
    // Reset crop selection when turning off crop mode
    if (imageTransform.crop) {
      setCropSelection({
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        isDragging: false
      });
    }
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
  
  // Mouse event handlers for crop selection
  const handleMouseDown = (e) => {
    if (!imageTransform.crop || !imageRef.current) return;
    
    // Prevent default behavior to avoid browser's default drag behavior
    e.preventDefault();
    
    // Get precise position relative to the image container
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    
    setCropSelection({
      startX,
      startY,
      endX: startX,
      endY: startY,
      isDragging: true
    });
  };
  
  const handleMouseMove = (e) => {
    if (!imageTransform.crop || !cropSelection.isDragging) return;
    
    // Use currentTarget to get the container element for more accurate position
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Calculate position within bounds of the container
    const endX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const endY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    setCropSelection(prev => ({
      ...prev,
      endX,
      endY
    }));
  };
  
  const handleMouseUp = () => {
    if (!imageTransform.crop) return;
    
    setCropSelection(prev => ({
      ...prev,
      isDragging: false
    }));
  };
  
  // Create live preview of crop - update in real-time
  useEffect(() => {
    if (imageTransform.crop && imageRef.current && 
        cropSelection.startX !== cropSelection.endX && 
        cropSelection.startY !== cropSelection.endY) {
      
      // Create preview for the selected area
      const createPreview = () => {
        const width = Math.abs(cropSelection.endX - cropSelection.startX);
        const height = Math.abs(cropSelection.endY - cropSelection.startY);
        
        if (width > 5 && height > 5) { // Lower threshold to make preview more responsive
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          img.onload = () => {
            try {
              // Get dimensions and scaling
              const rect = imageRef.current.getBoundingClientRect();
              const imgWidth = img.width;
              const imgHeight = img.height;
              
              // Calculate displayed dimensions with rotation if needed
              const isRotated = imageTransform.rotate % 180 !== 0;
              const displayedWidth = isRotated ? rect.height : rect.width;
              const displayedHeight = isRotated ? rect.width : rect.height;
              
              // Get actual image dimensions displayed on screen (accounting for object-contain scaling)
              let displayScale = 1;
              if (imgWidth / imgHeight > displayedWidth / displayedHeight) {
                // Image is wider than container ratio
                displayScale = displayedWidth / imgWidth;
              } else {
                // Image is taller than container ratio
                displayScale = displayedHeight / imgHeight;
              }
              
              const actualDisplayedWidth = imgWidth * displayScale;
              const actualDisplayedHeight = imgHeight * displayScale;
              
              // Calculate offsets if image doesn't fill the container
              const offsetX = (displayedWidth - actualDisplayedWidth) / 2;
              const offsetY = (displayedHeight - actualDisplayedHeight) / 2;
              
              // Adjust selection coordinates to account for centering
              let adjustedStartX = (cropSelection.startX - offsetX) / displayScale;
              let adjustedStartY = (cropSelection.startY - offsetY) / displayScale;
              let adjustedEndX = (cropSelection.endX - offsetX) / displayScale;
              let adjustedEndY = (cropSelection.endY - offsetY) / displayScale;
              
              // Ensure coordinates are within the image bounds
              adjustedStartX = Math.max(0, Math.min(adjustedStartX, imgWidth));
              adjustedStartY = Math.max(0, Math.min(adjustedStartY, imgHeight));
              adjustedEndX = Math.max(0, Math.min(adjustedEndX, imgWidth));
              adjustedEndY = Math.max(0, Math.min(adjustedEndY, imgHeight));
              
              // Calculate crop coordinates
              const minX = Math.min(adjustedStartX, adjustedEndX);
              const minY = Math.min(adjustedStartY, adjustedEndY);
              const cropWidth = Math.abs(adjustedEndX - adjustedStartX);
              const cropHeight = Math.abs(adjustedEndY - adjustedStartY);
              
              // Set canvas dimensions and draw cropped portion
              canvas.width = cropWidth;
              canvas.height = cropHeight;
              
              ctx.drawImage(
                img,
                minX, minY, cropWidth, cropHeight,
                0, 0, cropWidth, cropHeight
              );
              
              // Set preview image
              const dataUrl = canvas.toDataURL('image/jpeg');
              setPreviewImage(dataUrl);
            } catch (error) {
              console.error("Error creating preview:", error);
            }
          };
          
          img.src = editedImage;
        }
      };
      
      // Generate preview in real-time, even during dragging
      createPreview();
    }
  }, [cropSelection, imageTransform.crop, imageTransform.rotate, editedImage]);
  
  // Apply the crop when saving changes
  const applyChanges = () => {
    // If we're in crop mode and have a valid selection, use the already generated preview
    if (imageTransform.crop && 
        cropSelection.startX !== cropSelection.endX && 
        cropSelection.startY !== cropSelection.endY && 
        previewImage !== frontImage) {
      
      // We already have the correct preview image generated by the useEffect
      setFrontImage(previewImage);
      setEditedImage(previewImage);
      
      // Turn off crop mode
      setImageTransform(prev => ({
        ...prev,
        crop: false
      }));
    } else if (!imageTransform.crop && (imageTransform.rotate !== 0 || imageTransform.flipX || imageTransform.flipY)) {
      // Apply other transformations (rotate/flip)
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Save context state
        ctx.save();
        
        // Move to center of canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Apply transformations
        ctx.rotate((imageTransform.rotate * Math.PI) / 180);
        ctx.scale(imageTransform.flipX ? -1 : 1, imageTransform.flipY ? -1 : 1);
        
        // Draw image centered
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        
        // Restore context state
        ctx.restore();
        
        // Set as front image and preview
        const transformedImageUrl = canvas.toDataURL('image/jpeg');
        setFrontImage(transformedImageUrl);
        setPreviewImage(transformedImageUrl);
        setEditedImage(transformedImageUrl);
      };
      
      img.src = editedImage;
    }
    
    // Close modal
    setShowEditModal(false);
  };
  
  // Calculate crop selection style
  const getCropSelectionStyle = () => {
    const left = Math.min(cropSelection.startX, cropSelection.endX);
    const top = Math.min(cropSelection.startY, cropSelection.endY);
    const width = Math.abs(cropSelection.endX - cropSelection.startX);
    const height = Math.abs(cropSelection.endY - cropSelection.startY);
    
    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      // Ensure the selection is visible (background is transparent to see the image)
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Very slight white highlight
      display: width > 0 && height > 0 ? 'block' : 'none'
    };
  };

  // Improved Magnifier effect function
  const addMagnifierEffect = (imageElement) => {
    if (!imageElement) return;
    
    const magnifierSize = 180; // Size of magnifier lens in pixels
    const zoomLevel = 2.5; // Magnification level
    
    // Create and append magnifier element
    const createMagnifier = () => {
      // Check if magnifier already exists
      const existingMagnifier = document.getElementById('image-magnifier');
      if (existingMagnifier) return existingMagnifier;
      
      // Create new magnifier
      const magnifier = document.createElement('div');
      magnifier.id = 'image-magnifier';
      magnifier.style.position = 'fixed'; // Changed from 'absolute' to 'fixed'
      magnifier.style.width = `${magnifierSize}px`;
      magnifier.style.height = `${magnifierSize}px`;
      magnifier.style.borderRadius = '50%';
      magnifier.style.border = '1px solid #ddd';
      magnifier.style.overflow = 'hidden';
      magnifier.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
      magnifier.style.pointerEvents = 'none';
      magnifier.style.zIndex = '1000';
      magnifier.style.display = 'none';
      magnifier.style.backgroundRepeat = 'no-repeat';
      
      document.body.appendChild(magnifier);
      return magnifier;
    };
    
    const magnifier = createMagnifier();
    
    // Add event listeners
    imageElement.addEventListener('mousemove', (e) => {
      // Get image and cursor positions
      const imageRect = imageElement.getBoundingClientRect();
      
      // Check if cursor is within the image boundaries
      if (
        e.clientX >= imageRect.left &&
        e.clientX <= imageRect.right &&
        e.clientY >= imageRect.top &&
        e.clientY <= imageRect.bottom
      ) {
        // Calculate position relative to the image (0 to 1)
        const x = (e.clientX - imageRect.left) / imageRect.width;
        const y = (e.clientY - imageRect.top) / imageRect.height;
        
        // Position magnifier near cursor with an offset to prevent it from covering what you're looking at
        // Position it 50px up and to the right of the cursor
        magnifier.style.left = `${e.clientX + 50}px`;  
        magnifier.style.top = `${e.clientY - 50}px`;
        
        // If magnifier would go off-screen to the right, position it to the left of cursor instead
        if (e.clientX + 50 + magnifierSize/2 > window.innerWidth) {
          magnifier.style.left = `${e.clientX - 100 - magnifierSize/2}px`;
        }
        
        // If magnifier would go off-screen to the top, position it below cursor instead
        if (e.clientY - 50 - magnifierSize/2 < 0) {
          magnifier.style.top = `${e.clientY + 100}px`;
        }
        
        // Set the background image and position
        magnifier.style.backgroundImage = `url(${imageElement.src})`;
        magnifier.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
        magnifier.style.backgroundSize = `${imageRect.width * zoomLevel}px ${imageRect.height * zoomLevel}px`;
        magnifier.style.display = 'block';
      } else {
        // Hide magnifier if cursor is outside the image
        magnifier.style.display = 'none';
      }
    });
    
    // Hide magnifier when mouse leaves the image
    imageElement.addEventListener('mouseleave', () => {
      magnifier.style.display = 'none';
    });
    
    // Hide magnifier when page is scrolled (prevents it from getting stuck in position)
    window.addEventListener('scroll', () => {
      magnifier.style.display = 'none';
    });
  };

  return (
    <div className="w-full mx-auto  px-4  md:px-8 pb-4">
      <div className="w-[80%]">
        <h1 className="text-xl md:text-2xl font-semibold text-blue-600 border-b border-gray-200 pb-4">
          Traveler 1
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-gray-900 py-4">
          Upload Traveler's Front Passport Page
        </h2>
        <p className="text-xs md:text-sm text-gray-600">
          Vietnam requires a scan of the traveler's passport. Upload a clear
          passport image and your details will be filled automatically. All
          fields with (*) are mandatory. Please review the information before
          submitting to ensure there are no mistakes.
        </p>
      </div>
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col w-[100%] lg:flex-row justify-center gap-x-4 lg:gap-x-8 gap-y-6 py-4">
            <div className="w-full lg:w-[50%]">
              <div className="">
                <label className="block text-[16px] py-1 font-medium text-gray-700 mb-1">
                  Passport Front Page Image
                  <span className="text-red-500">*</span>
                </label>
                  <div className="border-2  border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
                    {!previewImage ? (
                      <>
                        <input
                          type="file"
                          className="hidden"
                          id="passport-upload"
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="passport-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400" />
                          <span className="text-xs md:text-[14px] text-gray-600">
                            Choose a file or drag & drop it here
                          </span>
                          <span className="text-[12px] text-gray-400 mt-1">
                            JPEG, PNG, PDF and NPF formats, up to 50 MB
                          </span>
                          <button
                            type="button"
                            className="mt-3 px-3 py-1 md:px-4 md:py-2 bg-white border border-[#375DFB] rounded-md text-[14px] md:text-sm font-medium text-[#375DFB] hover:bg-gray-50"
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

            <div className="w-full lg:w-[50%]">
              <div className="mb-4 md:mb-5">
                <Input
                  placeholder={"Passport Number"}
                  label={"Passport Number"}
                />
              </div>

              <div className="mb-4 md:mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="">
                  <Input placeholder={"First Name"} label={"First Name"} />
                </div>
                <div>
                  <Input placeholder={" Last Name"} label={" Last Name"} />
                </div>
              </div>

              <div className="mb-4 md:mb-5 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                <div className="">
                  <Input
                    label={" Nationality"}
                    placeholder={" Nationality"}
                  />
                </div>
                <div>
                  <CustomSelect className={"py-[12px]"} label={"Sex"} options={Options} />
                </div>
                {/* <div>
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
                </div> */}
                <div className="  ">
                    <label className="block text-[16px] font-[400] text-gray-600 mb-1 ">
                      Date of Birth<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3 py-[14px] border border-gray-300 text-gray-400 bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                <div>
                  <CustomSelect className={"py-[8.5px]"} options={Metiral} label="Marital Status" />
                </div>

                <div>
                  <label className="block text-[16px] font-[400] text-gray-700 mb-1">
                    Date of Issue<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfIssue"
                    value={formData.dateOfIssue}
                    onChange={handleInputChange}
                    className="w-full text-[12px] px-3 text-gray-400 bg-transparent py-[11px] border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-[400] text-gray-700 mb-1">
                    Date of Expiry<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfExpiry"
                    value={formData.dateOfExpiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-[11px] text-gray-400 bg-transparent border text-[12px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div> */}
        </form>

        {/* Image Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-3 w-full max-w-lg">
              <div className="flex justify-end items-center mb-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Main image editing area */}
                  <div 
                    className="relative flex-grow" 
                    style={{ 
                      maxHeight: '300px',
                      cursor: imageTransform.crop ? 'crosshair' : 'default'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {/* Main image - ensure this stays visible */}
                    <div className="flex justify-center items-center bg-gray-100 rounded-md" style={{ minHeight: '200px' }}>
                      <img 
                        ref={imageRef}
                        src={editedImage} 
                        alt="Preview" 
                        className="max-w-full max-h-64 object-contain"
                        style={{
                          transform: `rotate(${imageTransform.rotate}deg) scaleX(${imageTransform.flipX ? -1 : 1}) scaleY(${imageTransform.flipY ? -1 : 1})`,
                          transition: 'transform 0.3s ease',
                          position: 'relative',
                          zIndex: 1
                        }}
                      />
                    </div>
                    
                    {/* Crop selection overlay - show only when crop mode is active */}
                    {imageTransform.crop && (
                      <>
                        {/* Very light overlay to indicate crop mode */}
                        <div className="absolute inset-0 bg-black/20 bg-opacity-20 z-10" />
                        
                        {/* Crop selection box - only show when there's an actual selection */}
                        {(cropSelection.endX !== cropSelection.startX || cropSelection.endY !== cropSelection.startY) && (
                          <div 
                            className="absolute border-2 border-white z-20"
                            style={getCropSelectionStyle()}
                          >
                            {/* Corner handles for visual feedback */}
                            <div className="absolute w-2 h-2 bg-white top-0 left-0" />
                            <div className="absolute w-2 h-2 bg-white top-0 right-0" />
                            <div className="absolute w-2 h-2 bg-white bottom-0 left-0" />
                            <div className="absolute w-2 h-2 bg-white bottom-0 right-0" />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Preview panel - shows the result of the crop in real-time */}
                  {imageTransform.crop && cropSelection.startX !== cropSelection.endX && cropSelection.startY !== cropSelection.endY && (
                    <div className="w-full md:w-64 border border-gray-300 rounded-md p-3">
                      <div className="text-sm text-center mb-2 font-medium">Crop Preview</div>
                      <div className="flex justify-center bg-gray-50 p-2 rounded">
                        <img 
                          src={previewImage} 
                          alt="Crop Preview" 
                          className="max-w-full max-h-40 object-contain" 
                        />
                      </div>
                      <div className="text-xs text-center mt-2 text-gray-500">
                        This is how your cropped image will appear
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid gap-2 grid-cols-3">
                <button
                  type="button"
                  onClick={handleCropImage}
                  className={`flex flex-col items-center justify-center border ${imageTransform.crop ? 'border-blue-300' : 'border-gray-200'} rounded-lg hover:bg-gray-50 p-2`}
                >
                  <Crop size={16} className="text-blue-600" />
                  <span className="text-[12px]">Crop</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleFlipImage}
                  className={`flex flex-col items-center p-2 justify-center border ${imageTransform.flipX ? 'border-blue-300' : 'border-gray-200'} rounded-lg hover:bg-gray-50`}
                >
                  <FlipHorizontal size={16} className="text-blue-600" />
                  <span className="text-[12px]">Flip</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleRotateImage}
                  className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <RotateCw size={16} className="text-blue-600" />
                  <span className="text-[12px]">Rotate {imageTransform.rotate}°</span>
                </button>
              </div>
              
              <div className="flex justify-end mt-4 gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-3 py-1 border border-gray-300 text-[12px] text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={applyChanges}
                  className="px-3 py-1 bg-blue-600 text-[12px] text-white rounded-md hover:bg-blue-700"
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