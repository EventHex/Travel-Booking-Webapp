import React, { useState, useEffect } from "react";
import Input from "../../input";

const PassportPopup = ({ isOpen, onClose, passportData }) => {
  const [formData, setFormData] = useState({
    front: {
      name: "",
      passportNumber: "",
      gender: "",
      dateOfBirth: "",
      placeOfBirth: "",
      maritalStatus: "",
      dateOfIssue: "",
      dateOfExpiry: "",
      nationality: "",
    },
    back: {
      address: "",
      fatherName: "",
      motherName: "",
      emergencyContact: "",
      bloodGroup: "",
    },
    pan: {
      panNumber: "",
      nameOnCard: "",
      fatherName: "",
      dateOfBirth: "",
    }
  });

  const [activeTab, setActiveTab] = useState("front");
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (passportData) {
      setFormData(prev => ({
        ...prev,
        front: {
          ...prev.front,
          name: passportData.name || '',
          passportNumber: passportData.passportNumber || '',
          gender: passportData.gender || '',
          dateOfBirth: passportData.dateOfBirth || '',
          placeOfBirth: passportData.placeOfBirth || '',
          maritalStatus: passportData.maritalStatus || '',
          dateOfIssue: passportData.dateOfIssue || '',
          dateOfExpiry: passportData.dateOfExpiry || '',
          nationality: passportData.nationality || '',
        },
        back: {
          ...prev.back,
          address: passportData.address || '',
          fatherName: passportData.fatherName || '',
          motherName: passportData.motherName || '',
          emergencyContact: passportData.emergencyContact || '',
          bloodGroup: passportData.bloodGroup || '',
        },
        pan: {
          ...prev.pan,
          panNumber: passportData.panNumber || '',
          nameOnCard: passportData.nameOnCard || '',
          fatherName: passportData.fatherName || '',
          dateOfBirth: passportData.dateOfBirth || '',
        }
      }));
    }
  }, [passportData]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Small delay to ensure mounting is complete before animation
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`} 
        onClick={onClose}
      ></div>
      <div 
        className={`bg-white p-4 rounded-[26px] w-[60%] max-w-md relative max-h-[90vh] 
          flex flex-col transform transition-all duration-300 ease-in-out ${
          isAnimating 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Tabs */}
        <div className="flex  rounded-lg bg-[#F6F8FA] px-2 py-2 shrink-0">
          <button
            onClick={() => setActiveTab("front")}
            className={`flex-1 py-2 text-sm font-medium relative ${
              activeTab === "front" ? "text-blue-600 bg-white rounded-lg" : "text-gray-500"
            }`}
          >
            Front Passport
            {activeTab === "front" && (
              ''
              // <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("back")}
            className={`flex-1 py-4 text-sm font-medium relative ${
              activeTab === "back" ? "text-blue-600 bg-white rounded-lg" : "text-gray-500"
            }`}
          >
            Back Passport
            {activeTab === "back" && (
              ''
              // <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("pan")}
            className={`flex-1 py-4 text-sm font-medium relative ${
              activeTab === "pan" ? "text-blue-600 bg-white rounded-lg" : "text-gray-500"
            }`}
          >
            Pan Card
            {activeTab === "pan" && (
              ''
              // <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-2 overflow-y-auto">
          {/* Front Passport Content */}
          {activeTab === "front" && (
            <div className="space-y-2">
              <div className="bg-gray-100 p-4 rounded-lg">
                <img
                  src="/path/to/passport/image"
                  alt="Front Passport"
                  className="w-full h-38 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="justify-between flex ">
                  <Input
                  labalClassName='text-[12px] text-gray-500'
                    name="name"
                    label="Name"
                    value={formData.front.name}
                    disabled
                    placeholder="Name"
                  />

                  <Input
                    name="passportNumber"
                    label="Passport Number"
                    value={formData.front.passportNumber}
                    disabled
                    placeholder="Passport Number"
                  />
                </div>

                <div className=" gap-1 flex">
                  <Input
                    name="gender"
                    label="Sex"
                    value={formData.front.gender}
                    disabled
                    placeholder="Sex"
                  />

                  <Input
                    name="dateOfBirth"
                    label="Date of Birth"
                    value={formData.front.dateOfBirth}
                    disabled
                    placeholder="Date of Birth"
                  />
                  <Input
                    name="placeOfBirth"
                    label="Place of Birth"
                    value={formData.front.placeOfBirth}
                    disabled
                    placeholder="Place of Birth"
                  />
                </div>
                <div className="flex gap-1 justify-between">
                  <Input
                    name="maritalStatus"
                    label="Marital Status"
                    value={formData.front.maritalStatus}
                    disabled
                    placeholder="Marital Status"
                  />

                  <Input
                    name="dateOfIssue"
                    label="Date of Issue"
                    value={formData.front.dateOfIssue}
                    disabled
                    placeholder="Date of Issue"
                  />
                </div>
                <div className="flex justify-between">
                  <Input
                    name="dateOfExpiry"
                    label="Date of Expiry"
                    value={formData.front.dateOfExpiry}
                    disabled
                    placeholder="Date of Expiry"
                  />

                  <Input
                    name="nationality"
                    label="Nationality"
                    value={formData.front.nationality}
                    disabled
                    placeholder="Nationality"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Back Passport Content */}
          {activeTab === "back" && (
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <img
                  src="/path/to/passport/back/image"
                  alt="Back Passport"
                  className="w-full h-38 object-contain"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <Input
                    name="address"
                    label="Address"
                    value={formData.back.address}
                    disabled
                    placeholder="Address"
                  />
                  <Input
                    name="fatherName"
                    label="Father's Name"
                    value={formData.back.fatherName}
                    disabled
                    placeholder="Father's Name"
                  />
                </div>
                <div className="flex justify-between">
                  <Input
                    name="motherName"
                    label="Mother's Name"
                    value={formData.back.motherName}
                    disabled
                    placeholder="Mother's Name"
                  />
                  <Input
                    name="emergencyContact"
                    label="Emergency Contact"
                    value={formData.back.emergencyContact}
                    disabled
                    placeholder="Emergency Contact"
                  />
                </div>
                <div className="flex">
                  <Input
                    name="bloodGroup"
                    label="Blood Group"
                    value={formData.back.bloodGroup}
                    disabled
                    placeholder="Blood Group"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Pan Card Content */}
          {activeTab === "pan" && (
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <img
                  src="/path/to/pan/image"
                  alt="Pan Card"
                  className="w-full h-38 object-contain"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <Input
                    name="panNumber"
                    label="PAN Number"
                    value={formData.pan.panNumber}
                    disabled
                    placeholder="PAN Number"
                  />
                  <Input
                    name="nameOnCard"
                    label="Name on Card"
                    value={formData.pan.nameOnCard}
                    disabled
                    placeholder="Name on Card"
                  />
                </div>
                <div className="flex justify-between">
                  <Input
                    name="fatherName"
                    label="Father's Name"
                    value={formData.pan.fatherName}
                    disabled
                    placeholder="Father's Name"
                  />
                  <Input
                    name="dateOfBirth"
                    label="Date of Birth"
                    value={formData.pan.dateOfBirth}
                    disabled
                    placeholder="Date of Birth"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Close button section commented out as in original design */}
        {/* <div className="border-t p-4 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PassportPopup;