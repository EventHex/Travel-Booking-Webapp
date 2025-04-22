import React, { useState } from "react";
import { X } from "lucide-react";

// Parent component to demonstrate modal functionality
const signout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSignOut = () => {
    // Clear user session data
    localStorage.removeItem("token");
    // Redirect to login page or home page
    window.location.href = "/login";
  };

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
      >
        Sign Out
      </button>

      {isModalOpen && (
        <SignOutConfirmationDialog 
          onClose={closeModal} 
          onSignOut={handleSignOut} 
        />
      )}
    </div>
  );
};

const SignOutConfirmationDialog = ({ onClose, onSignOut }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sign Out</h2>
          <button
            className="rounded-full p-2 bg-gray-100 hover:bg-gray-200"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-700">Are you sure you want to sign out?</p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-base font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 text-base font-medium"
            onClick={onSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default signout;