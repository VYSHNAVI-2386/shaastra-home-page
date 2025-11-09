import React, { useState } from "react";
import type {FormEvent} from "react";
import { useNavigate } from "react-router-dom";

// --- STYLES COMPONENT ---
const ShaastraStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

      input::placeholder {
        font-size: 0.7rem;
        opacity: 0.8;
      }

      select option {
        background-color: #1e1b4b;
        color: #facc15;
      }

      select option:hover {
        background-color: #facc15;
        color: #1e1b4b;
      }
    `}
  </style>
);

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { otp, newPassword, confirmPassword } = formData;

    // Trim fields
    const trimmedOtp = otp.trim();
    const trimmedNew = newPassword.trim();
    const trimmedConfirm = confirmPassword.trim();

    // Validate
    if (!trimmedOtp || !trimmedNew || !trimmedConfirm) {
      alert("Please fill out all fields properly.");
      return;
    }

    if (trimmedNew !== trimmedConfirm) {
      alert("Passwords do not match!");
      return;
    }

    // You can add backend API call here for OTP validation
    alert("Password reset successful!");
    navigate("/login");
  };

  return (
    <>
      <ShaastraStyles />
      <div
        className="font-press-start bg-black text-white min-h-screen flex items-center justify-center overflow-hidden relative p-4"
        style={{
          backgroundImage: "url('shaastra-home-page-bg.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          imageRendering: "pixelated",
        }}
      >
        <div className="min-h-screen flex items-center justify-center text-white">
          <div
            className="backdrop-blur-md p-10 rounded-2xl shadow-2xl w-[95%] max-w-lg"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(6px)",
            }}
          >
            <h1 className="text-center text-3xl mb-6 text-yellow-400 tracking-wider">
              SHAASTRA
            </h1>
            <h2 className="text-center text-xl mb-10 text-yellow-500">
              Reset Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* OTP Input */}
              <div>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="p-4 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              {/* New Password Input */}
              <div>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="p-4 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="p-4 rounded-md bg-gray-800/50 placeholder-gray-300 w-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              {/* Reset Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-yellow-500 font-bold py-3 rounded-md transition-all duration-300 hover:cursor-pointer"
                >
                  Reset Password
                </button>
              </div>

              {/* Back to Login */}
              <p className="text-center text-sm mt-4 text-gray-300">
                <span
                  onClick={() => navigate("/login")}
                  className="text-yellow-600 hover:underline cursor-pointer"
                >
                  Go back to Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
