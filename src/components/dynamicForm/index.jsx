import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  onGroupSubmit,
  currentTravelerIndex = 0
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // Update form data when initialData changes, but avoid infinite loops
  useEffect(() => {
    if (JSON.stringify(initialData) !== JSON.stringify(formData)) {
      setFormData(initialData);
    }
  }, [initialData]); // Remove formData from dependencies to prevent loops

  // Memoized input change handler to prevent recreation on every render
  const handleInputChange = useCallback((name, value) => {
    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        [name]: value
      };
      
      // Call onFieldChange callback if provided
      if (onFieldChange) {
        onFieldChange(name, value, newFormData);
      }
      
      return newFormData;
    });
    
    // Clear error when user starts typing
    setErrors(prev => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, [onFieldChange]);

  // Memoized file upload handler for individual mode
  const handleFileUpload = useCallback(async (name, file) => {
    if (file) {
      setFormData(prevFormData => {
        const newFormData = {
          ...prevFormData,
          [name]: file
        };
        
        // Handle passport upload with API call
        if (name === 'passportImageFront' || name === 'passportImageBack') {
          (async () => {
            try {
              const uploadFormData = new FormData();
              uploadFormData.append("passportImage", file);
              uploadFormData.append("side", name === 'passportImageFront' ? "front" : "back");
              
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
          })();
        } else {
          // Call onFieldChange callback if provided for non-passport files
          if (onFieldChange) {
            onFieldChange(name, file, newFormData);
          }
        }
        
        return newFormData;
      });
    }
  }, [onFieldChange]);

  // Fixed file upload handler for group mode
  const handleFileUploadForGroup = useCallback(async (travelerIndex, name, file) => {
    if (!file || !onTravelerChange) return;

    // First, immediately update the traveler with the file for preview
    const currentTraveler = travelers[travelerIndex] || {};
    const currentFormData = currentTraveler.formData || {};
    
    // Update with file immediately for preview
    const immediateUpdate = {
      ...currentFormData,
      [name]: file
    };
    
    onTravelerChange(travelerIndex, name, file, immediateUpdate);

    // Handle passport upload with API call for group mode
    if (name === 'passportImageFront' || name === 'passportImageBack') {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append("passportImage", file);
        uploadFormData.append("side", name === 'passportImageFront' ? "front" : "back");
        
        // Add traveler-specific identifier to help with processing
        uploadFormData.append("travelerIndex", travelerIndex.toString());
        
        const response = await instance.post("/passport/process", uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        console.log(`Passport upload response for traveler ${travelerIndex}:`, response.data);
        
        // If upload successful, update the SPECIFIC traveler's data with extracted data
        if (response.data.success && response.data.data) {
          const extractedData = response.data.data;
          
          // Store passport ID with traveler-specific key
          if (name === 'passportImageFront' && extractedData.passportId) {
            localStorage.setItem(`currentPassportId_traveler_${travelerIndex}`, extractedData.passportId);
          }
          
          // Get the current traveler data again (in case it changed during async operation)
          const latestTraveler = travelers[travelerIndex] || {};
          const latestFormData = latestTraveler.formData || {};
          
          // Create updated form data with extracted passport information
          const updatedFormData = {
            ...latestFormData,
            [name]: file, // Keep the file
            // Front passport data - only update if field is empty or if this is the first upload
            passportNumber: extractedData.passportNumber || latestFormData.passportNumber || '',
            firstName: extractedData.firstName || latestFormData.firstName || '',
            lastName: extractedData.lastName || latestFormData.lastName || '',
            nationality: extractedData.nationality || latestFormData.nationality || '',
            sex: extractedData.sex || latestFormData.sex || '',
            dob: extractedData.dateOfBirth ? extractedData.dateOfBirth.split('T')[0] : latestFormData.dob || '',
            placeOfBirth: extractedData.placeOfBirth || latestFormData.placeOfBirth || '',
            placeOfIssue: extractedData.placeOfIssue || latestFormData.placeOfIssue || '',
            maritalStatus: extractedData.maritalStatus || latestFormData.maritalStatus || '',
            dateOfIssue: extractedData.dateOfIssue ? extractedData.dateOfIssue.split('T')[0] : latestFormData.dateOfIssue || '',
            dateOfExpiry: extractedData.dateOfExpiry ? extractedData.dateOfExpiry.split('T')[0] : latestFormData.dateOfExpiry || '',
            // Back passport data
            fathersName: extractedData.fathersName || latestFormData.fathersName || '',
            mothersName: extractedData.mothersName || latestFormData.mothersName || '',
          };
          
          // Update the specific traveler with extracted data
          onTravelerChange(travelerIndex, name, file, updatedFormData);
        }
      } catch (error) {
        console.error(`Error uploading passport for traveler ${travelerIndex}:`, error);
        alert(`Failed to upload passport for traveler ${travelerIndex + 1}. Please try again.`);
      }
    }
  }, [travelers, onTravelerChange]);

  // Memoized validation function
  const validateForm = useCallback(() => {
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
  }, [attributes, formData]);

  // Memoized submit handler
  const handleSubmit = useCallback(() => {
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
      
      onSubmit && onSubmit(formDataObj, formData, false); // Pass both FormData and regular object
    }
  }, [validateForm, formData, onSubmit]);

  // Memoized individual traveler change handler
  const handleIndividualTravelerChange = useCallback((index, name, value) => {
    if (onTravelerChange) {
      // Get current traveler data
      const currentTraveler = travelers[index] || {};
      const updatedFormData = {
        ...currentTraveler.formData,
        [name]: value
      };
      
      onTravelerChange(index, name, value, updatedFormData);
    }
  }, [travelers, onTravelerChange]);

  // Memoized field renderer
  const renderField = useCallback((attr, travelerIndex = null) => {
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

    // Get value based on whether we're in group mode or not
    let value;
    if (groupMode && travelerIndex !== null && travelers[travelerIndex]) {
      value = travelers[travelerIndex].formData?.[name] || attr.default || '';
    } else {
      value = formData[name] || attr.default || '';
    }

    const hasError = errors[name];

    // Create dynamic width style
    const widthStyle = width ? { width } : {};
    const containerClass = `mb-4 ${customClass || ''} ${cssClass || ''}`;

    // Handler for input changes
    const onChange = groupMode && travelerIndex !== null 
      ? (newValue) => handleIndividualTravelerChange(travelerIndex, name, newValue)
      : (newValue) => handleInputChange(name, newValue);

    // Generate unique key for each field with traveler context
    const fieldKey = `${name || 'field'}-${travelerIndex !== null ? `traveler-${travelerIndex}` : 'main'}`;

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        return (
          <div key={fieldKey} className={containerClass} style={widthStyle}>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              label={label}
              required={required}
              htmlType={name}
              type={type === 'text' ? 'text' : type}
              min={type === 'number' ? minimum : undefined}
              max={type === 'number' ? maximum : undefined}
              className={hasError ? 'border-red-500' : ''}
            />
            {hasError && (
              <p className="text-red-500 text-xs mt-1">{hasError}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={fieldKey} className={containerClass} style={widthStyle}>
            <label className="block text-[16px] py-1 font-[400] text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
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
          <div key={fieldKey} className={containerClass} style={widthStyle}>
            <CustomSelect
              name={name}
              value={value}
              onChange={(selectedValue) => onChange(selectedValue)}
              options={selectOptions}
              placeholder={placeholder}
              label={label}
              required={required}
              className={hasError ? 'border-red-500' : ''}
            />
            {hasError && (
              <p className="text-red-500 text-xs mt-1">{hasError}</p>
            )}
          </div>
        );

      case 'date':
        return (
          <div key={fieldKey} className={containerClass} style={widthStyle}>
            <label className="block text-[16px] py-1 font-[400] text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
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
          <div key={fieldKey} className={containerClass} style={widthStyle}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`${fieldKey}-checkbox`}
                name={name}
                checked={value === true || value === 'true'}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`${fieldKey}-checkbox`} className="ml-2 block text-sm text-gray-700">
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
          <div key={fieldKey} className={containerClass} style={widthStyle}>
            <FileComponent
              head={label}
              key={`${fieldKey}-file-component`} // Additional key for FileComponent
              onFileSelect={(file) => {
                if (groupMode && travelerIndex !== null) {
                  // Handle file upload for group mode with specific traveler index
                  handleFileUploadForGroup(travelerIndex, name, file);
                } else {
                  handleFileUpload(name, file);
                }
              }}
              className="mb-4"
              // Pass current file value if needed for preview
              currentFile={value instanceof File ? value : null}
            />
            {hasError && (
              <p className="text-red-500 text-xs mt-1">{hasError}</p>
            )}
          </div>
        );

      case 'section':
        return (
          <div key={fieldKey} className="mb-6" style={widthStyle}>
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
          <div key={fieldKey} className="my-6" style={widthStyle}>
            <div className="border-t border-gray-300"></div>
          </div>
        );

      default:
        return (
          <div key={fieldKey} className={containerClass} style={widthStyle}>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              label={label}
              required={required}
              htmlType={name}
              className={hasError ? 'border-red-500' : ''}
            />
            {hasError && (
              <p className="text-red-500 text-xs mt-1">{hasError}</p>
            )}
          </div>
        );
    }
  }, [formData, errors, travelers, groupMode, handleInputChange, handleFileUpload, handleFileUploadForGroup, handleIndividualTravelerChange]);

  // Memoized form fields rendering
  const renderFormFields = useMemo(() => {
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
            {leftFields.map((attr, index) => renderField(attr))}
          </div>
          <div className="space-y-4">
            {rightFields.map((attr, index) => renderField(attr))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {fieldsToShow.map((attr, index) => renderField(attr))}
      </div>
    );
  }, [attributes, formMode, renderField]);

  // Memoized individual traveler form
  const renderTravelerForm = useCallback((traveler, index) => {
    const fieldsToShow = attributes.filter(attr => attr.add !== false);
    
    if (formMode === 'double') {
      const leftFields = [];
      const rightFields = [];
      
      fieldsToShow.forEach((field, fieldIndex) => {
        if (fieldIndex % 2 === 0) {
          leftFields.push(field);
        } else {
          rightFields.push(field);
        }
      });

      return (
        <div key={`traveler-form-${traveler.id || index}`} className="mb-8 border-b pb-8 last:border-b-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Traveler {index + 1}</h3>
            {travelers.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  if (onTravelerChange) {
                    const newTravelers = travelers.filter((_, i) => i !== index);
                    // Update all travelers with new indexes
                    newTravelers.forEach((t, i) => {
                      t.id = i;
                    });
                    // This would need to be handled differently - you might need a remove traveler function
                    console.log('Remove traveler at index:', index);
                  }
                }}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {leftFields.map((attr) => renderField(attr, index))}
            </div>
            <div className="space-y-4">
              {rightFields.map((attr) => renderField(attr, index))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={`traveler-form-${traveler.id || index}`} className="mb-8 border-b pb-8 last:border-b-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Traveler {index + 1}</h3>
          {travelers.length > 1 && (
            <button
              type="button"
              onClick={() => {
                if (onTravelerChange) {
                  // This would need to be handled differently - you might need a remove traveler function
                  console.log('Remove traveler at index:', index);
                }
              }}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          )}
        </div>
        <div className="space-y-4">
          {fieldsToShow.map((attr) => renderField(attr, index))}
        </div>
      </div>
    );
  }, [attributes, formMode, renderField, travelers.length, onTravelerChange]);

  // Render group mode with multiple travelers
  if (groupMode && travelers && travelers.length > 0) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
        {travelers.map((traveler, index) => renderTravelerForm(traveler, index))}
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
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
            onClick={() => {
              if (onGroupSubmit) {
                onGroupSubmit();
              } else if (onSubmit) {
                onSubmit(null, null, true); // Pass true to indicate group submission
              }
            }}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit All Applications
          </button>
        </div>
      </div>
    );
  }

  // Regular individual form
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      {renderFormFields}
      
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
          Submit Application
        </button>
      </div>
    </div>
  );
};

export default DynamicForm;