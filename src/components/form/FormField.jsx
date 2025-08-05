import React from 'react';
import Input from '../input';
import { CustomSelect } from '../dropdown';
import FileComponent from '../file';
import { CustomDatePicker } from '../calender';

const FormField = ({ 
  field, 
  value, 
  onChange, 
  onFileSelect,
  className = "",
  disabled = false 
}) => {
  const {
    type,
    name,
    label,
    placeholder,
    required = false,
    validation = "",
    defaultValue = "",
    options = [],
    apiType,
    selectApi,
    showItem,
    ...otherProps
  } = field;

  // Handle different field types
  switch (type) {
    case 'passportSelect':
      return (
        <CustomSelect
          name={name}
          value={value || defaultValue}
          onChange={(val) => onChange(name, val)}
          options={options}
          placeholder={placeholder}
          label={label}
          required={required}
          className={className}
          disabled={disabled}
          {...otherProps}
        />
      );

    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'tel':
      return (
        <Input
          value={value || defaultValue || ''}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          type={type}
          label={label}
          required={required}
          disabled={disabled}
          className={className}
          {...otherProps}
        />
      );

    case 'textarea':
      return (
        <div className={className}>
          <label className="block text-[16px] py-1 font-[400] text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
                  <textarea
          value={value || defaultValue || ''}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-3 border border-gray-300 rounded-[14px] focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 text-gray-500 bg-transparent resize-none"
          rows={4}
          disabled={disabled}
          required={required}
          {...otherProps}
        />
        </div>
      );

    case 'select':
      return (
        <CustomSelect
          name={name}
          value={value || defaultValue}
          onChange={(val) => onChange(name, val)}
          options={options}
          placeholder={placeholder}
          label={label}
          required={required}
          className={className}
          disabled={disabled}
          {...otherProps}
        />
      );

    case 'date':
      return (
        <div className={className}>
          <label className="block text-[16px] py-1 font-[400] text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
          <CustomDatePicker
            value={value || defaultValue}
            onChange={(date) => onChange(name, date)}
            placeholder={placeholder}
            disabled={disabled}
            {...otherProps}
          />
        </div>
      );

    case 'file':
    case 'image':
      return (
        <FileComponent
          className={className}
          head={label}
          onFileSelect={(file) => onFileSelect(name, file)}
          loading={disabled}
          {...otherProps}
        />
      );

    default:
      return (
        <Input
          value={value || defaultValue || ''}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          type="text"
          label={label}
          required={required}
          disabled={disabled}
          className={className}
          {...otherProps}
        />
      );
  }
};

export default FormField; 