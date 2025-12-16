import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// ✅ Use Vite env variable for backend URL
const BACKEND_BASE = import.meta.env.VITE_BACKEND_BASE || "http://localhost:5001";

// ✅ Test credentials for local login (no backend needed)
const TEST_CREDENTIALS = {
  student: { email: "student@test.com", password: "student123" },
  creator: { email: "creator@test.com", password: "creator123" },
};

export default function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setMessage("");

  //   // ✅ Local test user check (for frontend-only demo)
  //   const isTestStudent =
  //     role === "student" &&
  //     email === TEST_CREDENTIALS.student.email &&
  //     password === TEST_CREDENTIALS.student.password;

  //   const isTestCreator =
  //     role === "creator" &&
  //     email === TEST_CREDENTIALS.creator.email &&
  //     password === TEST_CREDENTIALS.creator.password;

  //   if (isTestStudent || isTestCreator) {
  //     // Save login state locally
  //     localStorage.setItem("isLoggedIn", "true");
  //     localStorage.setItem("userRole", role);

  //     setMessage("Login successful ✅");

  //     // Redirect to dashboard
  //     if (role === "student") navigate("/student-dashboard");
  //     else navigate("/creator-dashboard");

  //     return; // stop here
  //   }

  //   // ✅ Otherwise call backend
  //   try {
  //     await axios.post(`${BACKEND_BASE}/auth/login`, {
  //       role,
  //       email,
  //       password,
  //     });

  //     // Save login status in localStorage
  //     localStorage.setItem("isLoggedIn", "true");
  //     localStorage.setItem("userRole", role);
  //     localStorage.setItem("firstName", "Demo");
  //     localStorage.setItem("lastName", "Student");
  //     localStorage.setItem("profileImage", ""); // blank until profile update


  //     setMessage("Login successful ✅");

  //     if (role === "student") navigate("/student-dashboard");
  //     else navigate("/creator-dashboard");
  //   } catch (err) {
  //     console.error(err);
  //     setMessage(err?.response?.data?.error || "Invalid email or password ❌");
  //   }
  // };

  const handleLogin = async (e) => {
  e.preventDefault();
  setMessage("");

  const isTestStudent =
    role === "student" &&
    email === TEST_CREDENTIALS.student.email &&
    password === TEST_CREDENTIALS.student.password;

  const isTestCreator =
    role === "creator" &&
    email === TEST_CREDENTIALS.creator.email &&
    password === TEST_CREDENTIALS.creator.password;

  // TEST LOGIN (Local)
  if (isTestStudent || isTestCreator) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);

    const name = role === "student" ? "Test Student" : "Test Creator";
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");

    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("profileImage", "");


localStorage.setItem("userId", "test-" + email); 


    setMessage("Login successful ✅");

    if (role === "student") navigate("/student-dashboard");
    else navigate("/creator-dashboard");

    return;
  }


// try {
//   const response = await axios.post(`${BACKEND_BASE}/auth/login`, {
//     role,
//     email,
//     password,
//   });

//   // 📌 Extract name from ANY format the backend sends
//   const fullName =
//     response.data?.user?.fullName ||
//     response.data?.user?.name ||
//     response.data?.fullName ||
//     response.data?.name ||
//     "";

//   // Split into first + last
//   const parts = fullName.trim().split(" ");
//   const firstName = parts[0] || "";
//   const lastName = parts.slice(1).join(" ") || "";

//   // Save in localStorage
//   localStorage.setItem("firstName", firstName);
//   localStorage.setItem("lastName", lastName);
//   localStorage.setItem("userRole", role);
//   localStorage.setItem("isLoggedIn", "true");

//   localStorage.setItem("userId", email); 


//   setMessage("Login successful ✅");



//   if (role === "student") navigate("/student-dashboard");
//   else navigate("/creator-dashboard");

// } catch (err) {
//   console.error(err);
//   setMessage(err?.response?.data?.error || "Invalid email or password ❌");
// }







// try {
//   const response = await axios.post(`${BACKEND_BASE}/auth/login`, {
//     role,
//     email,
//     password,
//   });

//   // Extract full name
//   const fullName =
//     response.data?.user?.fullName ||
//     response.data?.user?.name ||
//     response.data?.fullName ||
//     response.data?.name ||
//     "";

//   const parts = fullName.trim().split(" ");
//   const firstName = parts[0] || "";
//   const lastName = parts.slice(1).join(" ") || "";

//   // Save user data
  // localStorage.setItem("userId", user._id || user.userId || email);
  // localStorage.setItem("userEmail", user.email || email);
//   localStorage.setItem("role", response.data?.user?.role || role);
//   localStorage.setItem("isLoggedIn", "true");
//   localStorage.setItem("firstName", firstName);
//   localStorage.setItem("lastName", lastName);

//   setMessage("Login successful ✅");

//   navigate(role === "student" ? "/student-dashboard" : "/creator-dashboard");
  
// } catch (err) {
//   console.error(err);
//   setMessage(err?.response?.data?.error || "Invalid email or password ❌");
// }



try {
  const response = await axios.post(`${BACKEND_BASE}/auth/login`, {
    role,
    email,
    password,
  });

  const user = response.data.user;

  // localStorage.setItem("isLoggedIn", "true");
  // localStorage.setItem("userRole", user.role);
  // localStorage.setItem("userId", user._id);  // FIXED (REAL ID)
  // localStorage.setItem("firstName", user.firstName);
  // localStorage.setItem("lastName", user.lastName);
  // localStorage.setItem("profileImage", user.profileImage || "");

  //   localStorage.setItem("userId", user._id || user.userId || email);
  // localStorage.setItem("userEmail", user.email || email);

localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("role", user.role);   // FIXED
localStorage.setItem("userId", user._id);
localStorage.setItem("firstName", user.firstName);
localStorage.setItem("lastName", user.lastName);
localStorage.setItem("profileImage", user.profileImage || "");
localStorage.setItem("userEmail", user.email);


  setMessage("Login successful ✔");

  if (role === "student") navigate("/student-dashboard");
  else navigate("/creator-dashboard");

} catch (err) {
  setMessage("Invalid email or password ❌");
}




};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
        {/* Glowing border animation */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 blur opacity-30 animate-pulse"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          {/* Role Selection */}
          <div className="flex justify-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition">
              <input
                type="radio"
                checked={role === "student"}
                onChange={() => setRole("student")}
                className="accent-red-600"
              />
              Student
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition">
              <input
                type="radio"
                checked={role === "creator"}
                onChange={() => setRole("creator")}
                className="accent-red-600"
              />
              Content Creator
            </label>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Login
            </button>
          </form>

          {/* Display message */}
          {message && (
            <p className="text-red-500 text-center mt-3 font-medium">{message}</p>
          )}

          {/* Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-2">
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </p>
            <p>
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
