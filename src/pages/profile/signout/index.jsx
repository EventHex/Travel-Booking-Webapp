import React, { useState } from 'react';

// SignOutConfirmationDialog component
const SignOutConfirmationDialog = ({ onClose, onSignOut }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl  text-center font-medium text-gray-900 mb-4">Confirm Sign Out</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to sign out of your account?</p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSignOut}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

// DirectSignoutModal component
const DirectSignoutModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // Start with modal open
  
  const closeModal = () => {
    setIsModalOpen(false);
    // You might want to redirect or change the selectedOption here
    // For example: setSelectedOption("dashboard");
  };
  
  const handleSignOut = () => {
    // Add your sign out logic here
    console.log("User signed out");
    // Redirect to login page or perform other sign out actions
    window.location.href = '/login'; // Example redirect
    closeModal();
  };

  return (
    <>
      {isModalOpen && (
        <SignOutConfirmationDialog 
          onClose={closeModal} 
          onSignOut={handleSignOut} 
        />
      )}
    </>
  );
};

export default DirectSignoutModal;