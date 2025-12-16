import React, { useEffect } from "react";

const PythonBasics = () => {
  useEffect(() => {
    // mark course as active
    localStorage.setItem("courseActive", "true");

    return () => {
      // stop tracking when leaving
      localStorage.setItem("courseActive", "false");
    };
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Python Basics</h1>
      <p className="mt-4 text-gray-600">
        Welcome to Python Basics Course
      </p>
    </div>
  );
};

export default PythonBasics;
