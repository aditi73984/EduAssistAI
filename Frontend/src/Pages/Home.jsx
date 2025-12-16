import { Link } from "react-router-dom";
import { FaRobot, FaCode, FaBookOpen } from "react-icons/fa";
import About from "./About";
import Frameworks from "./Framework";
import Features from "./Features";
import Course from "./Courses";


export default function Home() {
  return (
    <div className="bg-gray-50 flex flex-col">

      {/* 🌟 Hero Section */}
      <section className="relative text-center py-24 bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_60%)]"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Welcome to <span className="text-yellow-300 drop-shadow-lg">EduAssistAI</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-indigo-100 max-w-2xl mx-auto">
From confusion to clarity-EduAssistAI supports you at every step of learning.
          </p>
          <p className="text-lg md:text-xl mb-10 text-indigo-100 max-w-2xl mx-auto">
Smarter learning, Powered by AI🌟
          </p>
          <Link
            to="/register"
            className="bg-yellow-400 text-indigo-900 font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transform transition duration-300 flex items-center justify-center gap-2 w-fit mx-auto"
          >
            Get Started <FaBookOpen />
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700"></div>

      {/* 💡 Features Section (No buttons on cards) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
          What Makes <span className="text-indigo-600">EduAssistAI</span> Special?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature 1: AI Assistant */}
          <div className="bg-white rounded-2xl p-10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
            <div className="text-indigo-600 text-6xl mb-6 flex justify-center animate-bounce">
              <FaRobot />
            </div>
            <h3 className="text-2xl font-semibold mb-4">AI Assistant</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
An AI-driven assistant designed to answer questions, explain concepts, and guide learning instantly.            </p>
          </div>

          {/* Feature 2: Code Runner */}
          <div className="bg-white rounded-2xl p-10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
            <div className="text-green-600 text-6xl mb-6 flex justify-center animate-pulse">
              <FaCode />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Code Runner</h3>
            <p className="text-gray-600 leading-relaxed">
              Run Python, JavaScript, C, or C++ code instantly inside your browser — safe, interactive, and lightning fast.
            </p>
          </div>

          {/* Feature 3: Course Engine */}
          <div className="bg-white rounded-2xl p-10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
            <div className="text-yellow-500 text-6xl mb-6 flex justify-center animate-spin-slow">
              <FaBookOpen />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Course Engine</h3>
            <p className="text-gray-600 leading-relaxed">
              Learn through bite-sized courses and quizzes. Track your progress as you grow your coding skills with AI-guided learning paths.
            </p>
          </div>
        </div>

        
      </section>
       


       
      

      

      {/* 📖 About Section */}
      <section className="">
        <About />
      </section>

    </div>
  );
}
