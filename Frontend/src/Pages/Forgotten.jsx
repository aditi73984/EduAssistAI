import React, { useState } from "react";
import axios from "axios";

const BACKEND_BASE = import.meta.env.VITE_BACKEND_BASE || "http://localhost:5001";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(`${BACKEND_BASE}/auth/forgot-password`, { email });
      setMessage("✅ Reset link sent to your email!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to send reset link. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
        
        {/* Glowing border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 blur opacity-30 animate-pulse"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Forgot Password
          </h2>

          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm"
              required
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Send Reset Link
            </button>
          </form>

          {message && (
            <p className="text-center mt-3 font-medium text-red-500">{message}</p>
          )}

          {/* Link to Login */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Remembered your password?{" "}
              <a
                href="/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
