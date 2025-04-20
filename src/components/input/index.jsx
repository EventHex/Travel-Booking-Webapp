import React from "react";

const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  label,
  labelClassName,
  inputClassName,
  className,
  htmlType,
  disabled,
  required = false,
}) => {
  return (
    <div className={`${className}`}>
      <label
        className={`block text-[16px] py-1 font-[400] text-gray-700 mb-1 ${labelClassName}`}
        htmlFor={htmlType}
      >
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mb-1 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md px-3 text-gray-500 bg-transparent py-3 border ${inputClassName}`}
        type={type}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default Input;
