import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState("light");

  const location = useLocation();
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const toggleRef = useRef(null);

  // FETCH USER DETAILS
  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || "";
  const profileImage = localStorage.getItem("profileImage") || "";
  const initials = (firstName[0] || "?") + (lastName[0] || "");
   
  const userRole = localStorage.getItem("role") || "";


  // Check login state
  useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginState);

    // LOAD THEME ONLY IF LOGGED IN
    if (loginState) {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // FORCE LIGHT THEME WHEN LOGGED OUT
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, [location.pathname]);

  // Toggle Theme
  const handleThemeToggle = () => {
    if (!isLoggedIn) return; // theme change disabled until login

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Close menus on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);

    navigate("/login");
  };

  // // Dashboard Access
  // const handleDashboardAccess = () => {
  //   navigate(isLoggedIn ? "/student-dashboard" : "/login");
  // };


   const handleDashboardAccess = () => {
  if (!isLoggedIn) {
    navigate("/login");
    return;
  }

  if (userRole === "student") {
    navigate("/student-dashboard");
  } else if (userRole === "creator") {
    navigate("/creator-dashboard");
  } else {
    navigate("/student-dashboard"); 
  }
};


 

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Course", path: "/course" },
    { name: "About Us", path: "/about" },
    { name: "Features", path: "/features" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="h-13 w-18" />
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            EduAssistAI
          </p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium ${
                location.pathname === item.path
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              className="relative w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center
                          text-lg font-bold text-indigo-600 hover:ring-2 hover:ring-indigo-500 transition"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              { !isLoggedIn ? "☰" : 
              profileImage ? (
                <img
                  src={profileImage}
                  className="w-full h-full rounded-full object-cover"
                  alt="profile"
                />
              ) : (
                <span>{initials.toUpperCase()}</span>
              )}
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 shadow-lg border dark:border-gray-700 rounded-xl py-2">

                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleDashboardAccess}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
                    >
                      My Dashboard
                    </button>

                   

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button
          ref={toggleRef}
          className="md:hidden w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center
                     text-lg font-bold text-indigo-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isLoggedIn ? "☰" : 
            (
              <span>{initials.toUpperCase()}</span>
            )
          }
        </button>

     


      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden bg-white dark:bg-gray-900 shadow-lg overflow-hidden transition-all ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg ${
                location.pathname === item.path
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleDashboardAccess}
                  className="block text-lg text-gray-700 dark:text-gray-300 hover:text-indigo-600 text-left"
                >
                  My Dashboard
                </button>

              

                <button
                  onClick={handleLogout}
                  className="block text-lg text-red-600 hover:text-red-400 text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
