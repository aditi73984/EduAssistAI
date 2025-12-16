import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-200 py-10 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Brand Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">EduAssistAI</h2>
          <p className="text-sm mt-1 text-gray-400">
            Empowering learning through AI 🚀
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-indigo-400 hover:scale-105 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-indigo-400 hover:scale-105 transition-all duration-300"
          >
            About
          </Link>
          <Link
            to="/register"
            className="hover:text-indigo-400 hover:scale-105 transition-all duration-300"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="hover:text-indigo-400 hover:scale-105 transition-all duration-300"
          >
            Login
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl justify-center mt-4 md:mt-0">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-400 hover:scale-110 transition-transform duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-400 hover:scale-110 transition-transform duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-400 hover:scale-110 transition-transform duration-300"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} <span className="font-semibold text-white">EduAssistAI</span> • Built with React,Tailwind CSS & AI
      </div>
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs text-gray-400">
         Developed by Aditi & Aman Kumar
      </div>
    </footer>
  );
}
