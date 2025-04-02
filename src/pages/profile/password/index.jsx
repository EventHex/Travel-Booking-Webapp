import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

// Parent component to demonstrate modal functionality
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className="p-4">
      {!isModalOpen && (
        <button 
          onClick={openModal} 
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
        >
          Open Password Dialog
        </button>
      )}
      
      {isModalOpen && (
        <PasswordChangeDialog onClose={closeModal} />
      )}
    </div>
  );
};

const PasswordChangeDialog = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password change submitted', { currentPassword, newPassword });
    // Close the modal after submission
    onClose();
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-25 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md relative overflow-auto max-h-full">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Change Password</h2>
          <button 
            className="rounded-full p-2 hover:bg-gray-100"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="current-password" className="block mb-2 text-sm font-medium">
              Current Password
            </label>
            <div className="relative">
              <input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 sm:p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded-md"
                onClick={toggleCurrentPasswordVisibility}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="new-password" className="block mb-2 text-sm font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 sm:p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded-md"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 text-sm"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M5 12L9 16L19 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;