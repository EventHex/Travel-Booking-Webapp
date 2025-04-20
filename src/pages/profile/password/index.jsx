import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import instance from "../../../instance";

// Parent component to demonstrate modal functionality
const password = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Go back to the previous page (profile)
    window.history.back();
  };

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

      {isModalOpen && <PasswordChangeDialog onClose={closeModal} />}
    </div>
  );
};

const PasswordChangeDialog = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate passwords
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("Please fill in all password fields");
      }

      // Password validation regex
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@.$!%*?&]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        throw new Error(
          "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      }

      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
        throw new Error("New password and confirm password do not match");
      }

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to continue");
      }

      const response = await instance.post(
        "/user/update-password",
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (!response.ok) {
        throw new Error(
          response.data.error ||
            response.data.message ||
            "Failed to update password"
        );
      }

      // Password update successful
      console.log("Password updated successfully");
      onClose(); // Close the modal after successful password update
    } catch (err) {
      setError(err.message || "An error occurred while updating the password");
      console.error("Password update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Change Password</h2>
          <button
            className="rounded-full p-2 bg-gray-100 hover:bg-gray-200"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="current-password"
              className="block mb-2 text-lg font-medium"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 text-base border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-full text-sm flex items-center gap-1.5 ${
                  showCurrentPassword
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={toggleCurrentPasswordVisibility}
              >
                {showCurrentPassword ? (
                  <>
                    <EyeOff size={16} />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    Show
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="block mb-2 text-lg font-medium"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 text-base border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-full text-sm flex items-center gap-1.5 ${
                  showNewPassword
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? (
                  <>
                    <EyeOff size={16} />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    Show
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-lg font-medium"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 text-base border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-full text-sm flex items-center gap-1.5 ${
                  showConfirmPassword
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <>
                    <EyeOff size={16} />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    Show
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-base font-medium"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-base font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Changing...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
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
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default password;
