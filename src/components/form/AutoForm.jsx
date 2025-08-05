import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import instance from '../../instance';

const AutoForm = ({
  attributes = [],
  initialValues = {},
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  loading = false,
  disabled = false,
  className = "",
  gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  title = "",
  description = "",
  passsports = []
}) => {
  const [formData, setFormData] = useState({});
  const [optionsCache, setOptionsCache] = useState({});
  const [loadingOptions, setLoadingOptions] = useState({});

  // Initialize form data with defaults
  useEffect(() => {
    const initialData = {};
    attributes.forEach(attr => {
      if (attr.defaultValue !== undefined) {
        initialData[attr.name] = attr.defaultValue;
      }
    });

    setFormData(prev => ({ ...prev, ...initialData }));
  }, [attributes]);

  // Load options for select fields
  useEffect(() => {
    const loadOptions = async () => {
      for (const attr of attributes) {
        if (attr.type === 'select' && attr.apiType === 'API' && attr.selectApi && !optionsCache[attr.name]) {
          setLoadingOptions(prev => ({ ...prev, [attr.name]: true }));
          try {
            const response = await instance.get(attr.selectApi);
            const options = response.data.map(item => ({
              value: item._id || item.id,
              label: item[attr.showItem || 'name'] || item.value
            }));
            setOptionsCache(prev => ({ ...prev, [attr.name]: options }));
          } catch (error) {
            console.error(`Error loading options for ${attr.name}:`, error);
            setOptionsCache(prev => ({ ...prev, [attr.name]: [] }));
          } finally {
            setLoadingOptions(prev => ({ ...prev, [attr.name]: false }));
          }
        }
      }
    };

    loadOptions();
  }, [attributes]);

  const handleFieldChange = (fieldName, value) => {
    console.log('Field change:', fieldName, value);
    setFormData(prev => {
      const newData = {
        ...prev,
        [fieldName]: value
      };
      console.log('New form data:', newData);
      return newData;
    });
  };

  const handleFileSelect = (fieldName, file) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // Filter attributes based on view/add/update permissions
  const getVisibleAttributes = () => {
    return attributes.filter(attr => {
      // For now, show all attributes. You can add logic here to filter based on permissions
      return true;
    });
  };

  const visibleAttributes = getVisibleAttributes();

  // Create passport select field configuration
  const passportSelectField = {
    type: 'passportSelect',
    name: 'selectedPassport',
    label: 'Select Passport',
    placeholder: 'Choose your passport',
    required: true,
    options: passsports.map(passport => ({
      value: passport.id || passport._id,
      label: passport.value || passport.name || passport.passportNumber
    }))
  };

  return (
    <div className={`w-full ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`grid gap-6 ${gridCols}`}>
          {/* Render passport select field first */}
          {passsports && passsports.length > 0 && (
            <FormField
              key="passport-select"
              field={passportSelectField}
              value={formData.selectedPassport || ''}
              onChange={handleFieldChange}
              onFileSelect={handleFileSelect}
              disabled={disabled}
              className="w-full"
            />
          )}
          
          {/* Render other form fields */}
          {visibleAttributes.map((field, index) => {
            // Merge field with cached options
            const fieldWithOptions = {
              ...field,
              options: field.type === 'select' && field.apiType === 'API' 
                ? optionsCache[field.name] || []
                : field.options || []
            };



            return (
              <FormField
                key={`${field.name}-${index}`}
                field={fieldWithOptions}
                value={formData[field.name] || ''}
                onChange={handleFieldChange}
                onFileSelect={handleFileSelect}
                disabled={disabled || loadingOptions[field.name]}
                className="w-full"
              />
            );
          })}
        </div>

        {(onSubmit || onCancel) && (
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            {onCancel && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {cancelText}
              </button>
            )}
            {onSubmit && (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Processing...' : submitText}
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default AutoForm; 