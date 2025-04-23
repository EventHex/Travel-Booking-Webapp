import React from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ 
  name,
  value, 
  onChange, 
  options = [], 
  required = true, 
  label = "Select", 
  placeholder = "Select",
  className,
  labelClass,
}) => {
  return (
    <div className="relative">
      <label className={`text-[16px] block font-[400] text-gray-700 mb-1`}>
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${className} w-full px-3 py-2  text-[#B2B5C0] text-[14px] pr-10 border border-gray-300 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};


const SingleSelect = ({ 
  name,
  value, 
  onChange, 
  options = [], 
  placeholder = "Select",
  className,
}) => {
  return (
    <div className="relative">
     
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${className} w-full px-3 py-2  text-[#B2B5C0] text-[14px] pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};
export {CustomSelect, SingleSelect};