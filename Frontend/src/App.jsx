import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/Forgotten";
// import StudentDashboard from "./Pages/Studentdashboard";

import StudentDashboard from "./Pages/StudentDashboard";
import MyCoursesPage from "./Pages/MyCoursesPage";


import CreatorDashboard from "./Pages/CreatorDashboard";

import Features from "./Pages/Features";
import AiDoubtSolver from "./Pages/AiDoubtSolver";
import AiCoding from "./Pages/AiCoding";
import AiQuiz from "./Pages/AiQuiz";
import Course from "./Pages/Courses";
import ResetPassword from "./Pages/ResetPassword";

// Courses
import PythonCourse from "./Course/Python-1";
import PythonAICourse from "./Course/Python-3";
import OOPAndDSACourse from "./Course/Opps";

import ScrollToTop from "./components/ScrollToTop";

import QuizHistoryPage from "./Pages/QuizHistoryPage";



function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="pt-16">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/features" element={<Features />} />

          {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}

        
          <Route path="/student-dashboard" element={<StudentDashboard />} />

          
          <Route path="/creator-dashboard" element={ localStorage.getItem("role") === "creator"
      ? <CreatorDashboard />
      : <Navigate to="/login" />} />

          <Route path="/reset-password/:token" element={<ResetPassword />} />


          {/* Feature Routes */}
          <Route path="/feature/doubt-solver" element={<AiDoubtSolver />} />
          <Route path="/feature/code-assistant" element={<AiCoding />} />
          <Route path="/feature/exam-engine" element={<AiQuiz />} />

          {/* Course Routes */}
          <Route path="/course" element={<Course />} />
          <Route path="/course/python-1" element={<PythonCourse />} />
          <Route path="/course/python-2" element={<OOPAndDSACourse/>} />
          <Route path="/course/python-3" element={<PythonAICourse />} />

          <Route path="/my-courses" element={<MyCoursesPage />} />


          <Route path="/quizzes" element={<QuizHistoryPage />} />




          {/* 404 page */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-gray-700">404</h1>
                <p className="text-lg text-gray-500 mt-2">Page not found 😕</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
