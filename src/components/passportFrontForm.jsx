import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import ImageEditModal from './ImageEditModal';

const PassportFrontForm = () => {
  // Add these new states
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add this near your existing image preview code
  {selectedImage && (
    <div className="relative">
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
      >
        <Edit2 className="h-5 w-5 text-gray-600" />
      </button>
      <img 
        src={selectedImage} 
        alt="Selected passport" 
        className="max-h-[300px] mx-auto object-contain"
      />
    </div>
  )}

  {/* Add the modal component at the bottom of your return statement */}
  <ImageEditModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    image={selectedImage}
  />
} 