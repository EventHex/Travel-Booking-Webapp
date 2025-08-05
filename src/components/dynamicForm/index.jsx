import React, { useState, useEffect } from 'react';
import { Upload, Calendar, ChevronDown } from 'lucide-react';
import Input from '../input';
import { CustomSelect } from '../dropdown';
import FileComponent from '../file';
import instance from '../../instance';

const DynamicForm = ({ 
  attributes = [], 
  formMode = 'single', 
  onSubmit, 
  initialData = {},
  className = '',
  onFieldChange,
  groupMode = false,
  travelers = [],
  onTravelerChange,
  currentTravelerIndex = 0
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // Update form data when initialData changes
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (name, value) => {
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newFormData);
    
    // Call onFieldChange callback if provided
    if (onFieldChange) {
      onFieldChange(name, value, newFormData);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = async (name, file) => {
    if (file) {
      const newFormData = {
        ...formData,
        [name]: file
      };
      setFormData(newFormData);
      
      // Handle passport upload with API call
      if (name === 'passportImageFront' || name === 'passportImageBack') {
        try {
          const uploadFormData = new FormData();
          uploadFormData.append("passportImage", file);
          uploadFormData.append("side", name === 'passportImageFront' ? "front" : "back");
          
          // For back passport, we need the passport ID from front
        //   if (name === 'passportImageBack') {
        //     const passportId = localStorage.getItem("currentPassportId");
        //     if (!passportId) {
        //       alert("Please upload the front page of the passport first");
        //       return;
        //     }
        //     uploadFormData.append("passportId", passportId);
        //   }
          
          const response = await instance.post("/passport/process", uploadFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          console.log('Passport upload response:', response.data);
          
          // If upload successful, update form with extracted data
          if (response.data.success && response.data.data) {
            const extractedData = response.data.data;
            
            // Store passport ID for back passport processing
            if (name === 'passportImageFront' && extractedData.passportId) {
              localStorage.setItem("currentPassportId", extractedData.passportId);
            }
            
            const updatedFormData = {
              ...newFormData,
              // Front passport data
              passportNumber: extractedData.passportNumber || newFormData.passportNumber,
              firstName: extractedData.firstName || newFormData.firstName,
              lastName: extractedData.lastName || newFormData.lastName,
              nationality: extractedData.nationality || newFormData.nationality,
              sex: extractedData.sex || newFormData.sex,
              dob: extractedData.dateOfBirth ? extractedData.dateOfBirth.split('T')[0] : newFormData.dob,
              placeOfBirth: extractedData.placeOfBirth || newFormData.placeOfBirth,
              placeOfIssue: extractedData.placeOfIssue || newFormData.placeOfIssue,
              maritalStatus: extractedData.maritalStatus || newFormData.maritalStatus,
              dateOfIssue: extractedData.dateOfIssue ? extractedData.dateOfIssue.split('T')[0] : newFormData.dateOfIssue,
              dateOfExpiry: extractedData.dateOfExpiry ? extractedData.dateOfExpiry.split('T')[0] : newFormData.dateOfExpiry,
              // Back passport data
              fathersName: extractedData.fathersName || newFormData.fathersName,
              mothersName: extractedData.mothersName || newFormData.mothersName,
            };
            
            setFormData(updatedFormData);
            
            // Call onFieldChange with updated data
            if (onFieldChange) {
              onFieldChange(name, file, updatedFormData);
            }
          }
        } catch (error) {
          console.error('Error uploading passport:', error);
          alert('Failed to upload passport. Please try again.');
        }
      } else {
        // Call onFieldChange callback if provided
        if (onFieldChange) {
          onFieldChange(name, file, newFormData);
        }
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    attributes.forEach(attr => {
      if (attr.required && (!formData[attr.name] || formData[attr.name].toString().trim() === '')) {
        newErrors[attr.name] = `${attr.label} is required`;
      }
      
      if (attr.validation && formData[attr.name]) {
        // Add custom validation logic here
        const regex = new RegExp(attr.validation);
        if (!regex.test(formData[attr.name])) {
          newErrors[attr.name] = `Invalid ${attr.label} format`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Create FormData for multipart submission (handles files)
      const formDataObj = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (value !== null && value !== undefined) {
          if (value instanceof File) {
            formDataObj.append(key, value);
          } else {
            formDataObj.append(key, value.toString());
          }
        }
      });
      
      onSubmit && onSubmit(formDataObj, formData); // Pass both FormData and regular object
    }
  };

  const renderField = (attr) => {
    const { 
      type, 
      name, 
      label, 
      placeholder, 
      required, 
      selectApi, 
      apiType, 
      showItem, 
      options,
      width = "100%",
      minimum,
      maximum,
      validation,
      minDate,
      maxDate,
      allowedFileTypes,
      customClass,
      cssClass
    } = attr;
    const value = formData[name] || attr.default || '';
    const hasError = errors[name];

    // Create dynamic width style
    const widthStyle = width ? { width } : {};
    const containerClass = `mb-4 ${customClass || ''} ${cssClass || ''}`;

    switch (type) {
      case 'text':
        return (
          <div className={containerClass} style={widthStyle}>
            <Input
              value={value}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={placeholder}
              label={label}
              required={required}
              htmlType={name}
              className={hasError ? 'border-red-500' : ''}
            />
          </div>
        );

      case 'email':
        return (
          <div className={containerClass} style={widthStyle}>
            <Input
              value={value}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={placeholder}
              label={label}
              required={required}
              htmlType={name}
              type="email"
              className={hasError ? 'border-red-500' : ''}
            />
          </div>
        );

      case 'password':
        return (
          <div className={containerClass} style={widthStyle}>
            <Input
              value={value}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={placeholder}
              label={label}
              required={required}
              htmlType={name}
              type="password"
              className={hasError ? 'border-red-500' : ''}
            />
          </div>
        );

      case 'number':
        return (
          <div className={containerClass} style={widthStyle}>
            <Input
              value={value}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={placeholder}
              label={label}
              required={required}
              htmlType={name}
              type="number"
              min={minimum}
              max={maximum}
              className={hasError ? 'border-red-500' : ''}
            />
          </div>
        );

      case 'tel':
        return (
          <div className={containerClass} style={widthStyle}>
            <Input
              value={value}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={placeholder}
              label={label}
              required={required}
              htmlType={name}
              type="tel"
              className={hasError ? 'border-red-500' : ''}
            />
          </div>
        );

      case 'url':
        return (
          <div className={containerClass} style={widthStyle}>
            <Input
              value={value}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={placeholder}
              label={label}
              required={required}
              htmlType={name}
              type="url"
              className={hasError ? 'border-red-500' : ''}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className={containerClass} style={widthStyle}>
            <label className="block text-[16px] py-1 font-[400] text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={placeholder}
              className={`w-full px-3 py-3 border border-gray-300 rounded-[14px] focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 text-gray-500 bg-transparent min-h-[80px] resize-vertical ${
                hasError ? 'border-red-500' : ''
              }`}
              rows={3}
            />
            {hasError && (
              <p className="text-red-500 text-xs mt-1">{hasError}</p>
            )}
          </div>
        );

      case 'select':
        let selectOptions = [];
        
        if (apiType === 'CSV' && selectApi) {
          selectOptions = selectApi.split(',').map(opt => ({
            value: opt.trim(),
            label: opt.trim()
          }));
        } else if (apiType === 'API') {
          // In a real app, you'd fetch from the API endpoint
          // For demo, showing placeholder options
          if (selectApi === 'country/select') {
            selectOptions = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'India'].map(country => ({
              value: country,
              label: country
            }));
          }
        } else if (apiType === 'JSON' && selectApi) {
          try {
            // Parse JSON string to array of objects
            const jsonData = typeof selectApi === 'string' ? JSON.parse(selectApi) : selectApi;
            if (Array.isArray(jsonData)) {
              selectOptions = jsonData.map(item => {
                if (typeof item === 'string') {
                  return { value: item, label: item };
                } else if (item && typeof item === 'object') {
                  // Handle object with id and value properties
                  const optionValue = item.id || item.value || item;
                  const optionLabel = item.value || item.label || item.name || optionValue;
                  return { value: optionValue, label: optionLabel };
                }
                return null;
              }).filter(Boolean);
            }
          } catch (error) {
            console.error('Error parsing JSON for select options:', error);
            selectOptions = [];
          }
        } else if (options && Array.isArray(options)) {
          selectOptions = options.map(option => ({
            value: option,
            label: option
          }));
        }

        return (
          <div className={containerClass} style={widthStyle}>
            <CustomSelect
              name={name}
              value={value}
              onChange={(selectedValue) => handleInputChange(name, selectedValue)}
              options={selectOptions}
              placeholder={placeholder}
              label={label}
              required={required}
              className={hasError ? 'border-red-500' : ''}
            />
          </div>
        );

      case 'date':
        return (
          <div className={containerClass} style={widthStyle}>
            <label className="block text-[16px] py-1 font-[400] text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type="date"
                value={value}
                onChange={(e) => handleInputChange(name, e.target.value)}
                min={minDate}
                max={maxDate}
                className={`w-full px-3 py-3 border border-gray-300 rounded-[14px] focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 text-gray-500 bg-transparent ${
                  hasError ? 'border-red-500' : ''
                }`}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            {hasError && (
              <p className="text-red-500 text-xs mt-1">{hasError}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div className={containerClass} style={widthStyle}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={value === true || value === 'true'}
                onChange={(e) => handleInputChange(name, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
                {placeholder || label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
            {hasError && (
              <p className="text-red-500 text-xs mt-1">{hasError}</p>
            )}
          </div>
        );

      case 'file':
        return (
          <div className={containerClass} style={widthStyle}>
            <FileComponent
              head={label}
              onFileSelect={(file) => handleFileUpload(name, file)}
              className="mb-4"
            />
          </div>
        );

      case 'section':
        return (
          <div className="mb-6" style={widthStyle}>
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mr-3">{label}</h3>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            {placeholder && (
              <p className="text-sm text-gray-600 mb-4">{placeholder}</p>
            )}
          </div>
        );

      case 'divider':
        return (
          <div className="my-6" style={widthStyle}>
            <div className="border-t border-gray-300"></div>
          </div>
        );

      default:
        return (
          <div className={containerClass} style={widthStyle}>
            <Input
              value={value}
              onChange={(e) => handleInputChange(name, e.target.value)}
              placeholder={placeholder}
              label={label}
              required={required}
              htmlType={name}
              className={hasError ? 'border-red-500' : ''}
            />
          </div>
        );
    }
  };

  const renderFormFields = () => {
    const fieldsToShow = attributes.filter(attr => attr.add !== false);
    
    if (formMode === 'double') {
      const leftFields = [];
      const rightFields = [];
      
      fieldsToShow.forEach((field, index) => {
        if (index % 2 === 0) {
          leftFields.push(field);
        } else {
          rightFields.push(field);
        }
      });

      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {leftFields.map((attr, index) => (
              <div key={`${attr.name}-${index}`}>
                {renderField(attr)}
                {errors[attr.name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[attr.name]}</p>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {rightFields.map((attr, index) => (
              <div key={`${attr.name}-${index}`}>
                {renderField(attr)}
                {errors[attr.name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[attr.name]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {fieldsToShow.map((attr, index) => (
          <div key={`${attr.name}-${index}`}>
            {renderField(attr)}
            {errors[attr.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[attr.name]}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render group mode with multiple travelers
  if (groupMode && travelers && travelers.length > 0) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
        {travelers.map((traveler, index) => (
          <div key={traveler.id} className="mb-8 border-b pb-8">
            <h3 className="text-xl font-bold mb-4">Traveler {index + 1}</h3>
            <DynamicForm
              attributes={attributes}
              formMode={formMode}
              onSubmit={onSubmit}
              initialData={traveler.formData || {}}
              onFieldChange={(name, value, newFormData) => {
                if (onTravelerChange) {
                  onTravelerChange(index, name, value, newFormData);
                }
              }}
              className=""
            />
          </div>
        ))}
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              // Add new traveler functionality
              if (onTravelerChange) {
                onTravelerChange('add', null, null, null);
              }
            }}
            className="px-4 py-2 border border-blue-300 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Another Traveler
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit All
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      {renderFormFields()}
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DynamicForm;