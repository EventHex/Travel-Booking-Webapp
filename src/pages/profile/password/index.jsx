import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import instance from "../../../instance";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input";
import Loader from "../../../components/loader";

const password = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      {isModalOpen && <PasswordChangeDialog onClose={closeModal} />}
    </div>
  );
};

export const PasswordChangeDialog = ({ onClose }) => {
  const navigate = useNavigate();
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

      // Check response status - axios doesn't throw on non-2xx status
      if (response.status >= 400 || !response.data.success) {
        throw new Error(
          response.data?.error ||
            response.data?.message ||
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-8">
          
          <h1 className="text-[16px] text-center  font-medium">Change Password</h1>
          <button
            className="rounded-full p-2  hover:bg-gray-200"
            aria-label="Close dialog"
            onClick={handleClose}
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required={true}
              className="mb-4"
            />
            <button
              type="button"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded-full text-[12px] flex gap-1 items-center ${
                showCurrentPassword
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={toggleCurrentPasswordVisibility}
            >
              {showCurrentPassword ? (
                <>
                  <EyeOff size={14} />
                  Hide
                </>
              ) : (
                <>
                  <Eye size={14} />
                  Show
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required={true}
              className="mb-4"
            />
            <button
              type="button"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded-full text-[12px] flex gap-1 items-center ${
                showNewPassword
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? (
                <>
                  <EyeOff size={14} />
                  Hide
                </>
              ) : (
                <>
                  <Eye size={14} />
                  Show
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={true}
              className="mb-4"
            />
            <button
              type="button"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded-full text-[12px] flex gap-1 items-center ${
                showConfirmPassword
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <>
                  <EyeOff size={14} />
                  Hide
                </>
              ) : (
                <>
                  <Eye size={14} />
                  Show
                </>
              )}
            </button>
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-base font-medium"
              onClick={handleClose}
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
                <Loader />
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