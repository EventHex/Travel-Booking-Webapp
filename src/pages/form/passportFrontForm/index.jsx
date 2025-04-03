  
  import React from "react";
import { useState } from "react";
import {
    Upload,
    Info,
    Clock,
    X
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
        </div>
      </div>
    );
  };