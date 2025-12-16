import React from "react";

export default function ProgressBar({ progress, theme }) {
  return (
    <div
      className={`w-full h-4 rounded-full overflow-hidden ${
        theme === "light" ? "bg-gray-200" : "bg-gray-700"
      }`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
