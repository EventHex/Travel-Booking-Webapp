import React, { useState, useEffect } from "react";

const PassportPopup = ({ isOpen, onClose, passportData }) => {
  // console.log("PassportPopup rendered with:", { isOpen, passportData });

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
      occupation: "",
    },
    back: {
      address: "",
      fatherName: "",
      motherName: "",
      emergencyContact: "",
    },
    pan: {
      panNumber: "",
      visaType: "",
      visaCountry: "",
      travelDates: { from: "", to: "" }
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
          passportNumber: passportData.passportNumber || 'N/A',
          gender: passportData.gender || '',
          dateOfBirth: passportData.dateOfBirth || '',
          placeOfBirth: passportData.placeOfBirth || '',
          maritalStatus: passportData.maritalStatus || '',
          dateOfIssue: passportData.dateOfIssue || '',
          dateOfExpiry: passportData.dateOfExpiry || '',
          nationality: passportData.nationality || '',
          occupation: passportData.occupation || '',
        },
        back: {
          ...prev.back,
          fatherName: passportData.fatherName || '',
          motherName: passportData.motherName || '',
        },
        pan: {
          ...prev.pan,
          panNumber: passportData.panNumber || '',
          visaType: passportData.visaType || '',
          visaCountry: passportData.visaCountry || '',
          travelDates: {
            from: passportData.travelDates?.from || '',
            to: passportData.travelDates?.to || ''
          },
        }
      }));
    }
  }, [passportData]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !passportData) {
    // console.log("PassportPopup not showing because:", { isOpen, hasData: !!passportData });
    return null;
  }

  // Field item component
  const FieldItem = ({ label, value }) => (
    <div className="flex items-center bg-green-50 hover:bg-green-100 rounded-md p-2 mb-2">
      <span className="text-green-500 mr-2">✓</span>
      <span className="text-gray-600 font-medium mr-2">{label}:</span>
      <span className="text-green-600 font-medium">{value || 'N/A'}</span>
    </div>
  );

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
        className={`bg-white p-4 rounded-[26px] w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] 
          max-w-[700px] relative max-h-[90vh] flex flex-col transform transition-all 
          duration-300 ease-in-out ${
          isAnimating 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Tabs */}
        <div className="flex rounded-lg bg-[#F6F8FA] px-2 py-2 shrink-0">
          <button
            onClick={() => setActiveTab("front")}
            className={`flex-1 py-2 text-[12px] sm:text-sm font-medium relative ${
              activeTab === "front" ? "text-blue-600 bg-white rounded-lg" : "text-gray-500"
            }`}
          >
            Front Passport
          </button>
          <button
            onClick={() => setActiveTab("back")}
            className={`flex-1 py-4 text-sm font-medium relative ${
              activeTab === "back" ? "text-blue-600 bg-white rounded-lg" : "text-gray-500"
            }`}
          >
            Back Passport
          </button>
          <button
            onClick={() => setActiveTab("pan")}
            className={`flex-1 py-4 text-sm font-medium relative ${
              activeTab === "pan" ? "text-blue-600 bg-white rounded-lg" : "text-gray-500"
            }`}
          >
            Pan Card
          </button>
        </div>

        {/* Tab Content */}
        <div className="px-2 overflow-y-auto">
          {activeTab === "front" && (
            <div className="space-y-4">
              <div className="bg-gray-100 p-2 sm:p-4 rounded-lg">
                <img
                  src={passportData?.passportImageFront || "/path/to/passport/image"}
                  alt="Front Passport"
                  className="w-full h-32 sm:h-38 md:h-48 object-contain"
                />
              </div>
              <div className="text-sm">
                <div className="w-full flex justify-center items-center mb-4">
                  <p className="text-[18px] font-medium">{formData.front.name}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FieldItem label="Passport" value={formData.front.passportNumber} />
                  <FieldItem label="Gender" value={formData.front.gender} />
                  <FieldItem label="DOB" value={formData.front.dateOfBirth} />
                  <FieldItem label="POB" value={formData.front.placeOfBirth} />
                  <FieldItem label="Marital Status" value={formData.front.maritalStatus} />
                  <FieldItem label="Date of Issue" value={formData.front.dateOfIssue} />
                  <FieldItem label="Date of Expiry" value={formData.front.dateOfExpiry} />
                  <FieldItem label="Nationality" value={formData.front.nationality} />
                  <FieldItem label="Occupation" value={formData.front.occupation} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "back" && (
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <img
                  src={passportData?.passportImageBack || "/path/to/passport/back/image"}
                  alt="Back Passport"
                  className="w-full h-38 object-contain"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldItem label="Father's Name" value={formData.back.fatherName} />
                <FieldItem label="Mother's Name" value={formData.back.motherName} />
              </div>
            </div>
          )}

          {activeTab === "pan" && (
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <img
                  src={passportData?.panPhoto || "/path/to/pan/image"}
                  alt="Pan Card"
                  className="w-full h-38 object-contain"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldItem label="PAN Number" value={formData.pan.panNumber} />
                <FieldItem label="Visa Type" value={formData.pan.visaType} />
                <FieldItem label="Visa Country" value={formData.pan.visaCountry} />
                <FieldItem label="Travel Date From" value={formData.pan.travelDates.from} />
                <FieldItem label="Travel Date To" value={formData.pan.travelDates.to} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassportPopup;