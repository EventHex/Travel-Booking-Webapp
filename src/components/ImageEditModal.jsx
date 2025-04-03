import React from 'react';
import { X, Crop, RotateCw, Flip, Edit2 } from 'lucide-react';

const ImageEditModal = ({ isOpen, onClose, image, onEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Edit Image</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <img
            src={image}
            alt="Edit preview"
            className="max-h-[400px] mx-auto object-contain"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <Crop className="h-5 w-5" />
            Crop
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <RotateCw className="h-5 w-5" />
            Rotate
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <Flip className="h-5 w-5" />
            Flip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditModal; 