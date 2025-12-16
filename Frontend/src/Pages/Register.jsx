import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const BACKEND_BASE = import.meta.env.VITE_BACKEND_BASE || "http://localhost:5001";

export default function Register() {
  const [role, setRole] = useState("student");
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    college: "",
    course: "",
    stream: "",
    phone: "",
    otp: "",
    creatorRole: "",
    subjectSpecialist: "",
  });

  const [collegeQuery, setCollegeQuery] = useState("");
  const [collegeSuggestions, setCollegeSuggestions] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [message, setMessage] = useState("");

  const [allCourses, setAllCourses] = useState([]);
  const [allStreams, setAllStreams] = useState([]);
  const [allInterests, setAllInterests] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [interests, setInterests] = useState([]);

  // Load dropdown data
  useEffect(() => {
    async function loadData() {
      try {
        const [courses, streams, interestsData, subjects] = await Promise.all([
          axios.get(`${BACKEND_BASE}/api/courses`),
          axios.get(`${BACKEND_BASE}/api/streams`),
          axios.get(`${BACKEND_BASE}/api/interests`),
          axios.get(`${BACKEND_BASE}/api/subjects`),
        ]);
        setAllCourses(courses.data);
        setAllStreams(streams.data);
        setAllInterests(interestsData.data);
        setAllSubjects(subjects.data);
      } catch (err) {
        console.error("Error loading dropdown data:", err);
      }
    }
    loadData();
  }, []);

  // College autocomplete
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (collegeQuery.length >= 2) {
        try {
          const res = await axios.get(`${BACKEND_BASE}/api/universities?q=${collegeQuery}`);
          setCollegeSuggestions(res.data.slice(0, 5));
        } catch {
          setCollegeSuggestions([]);
        }
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [collegeQuery]);

  async function sendOtp() {
  if (!form.phone) return setMessage("Enter phone number");
  try {
    setLoading(true);
    await axios.post(`${BACKEND_BASE}/auth/send-otp`, { phone: form.phone });
    setLoading(false);
    setOtpSent(true);
    setMessage("OTP sent ✅");
  } catch {
    setLoading(false);
    setMessage("Failed to send OTP ❌");
  }
}


  async function verifyOtp() {
  if (!form.otp) return setMessage("Enter OTP");
  try {
    setLoading(true);
    await axios.post(`${BACKEND_BASE}/auth/verify-otp`, {
      phone: form.phone,
      otp: form.otp,
    });
    setLoading(false);
    setOtpVerified(true);
    setMessage("Phone verified ✅");
  } catch {
    setLoading(false);
    setOtpVerified(false);
    setMessage("OTP verification failed ❌");
  }
}



  

  // Register function
  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setLoading(false);
      return setMessage("Please fill all required fields");
    }
    if (form.password !== form.confirm) {
      setLoading(false);
      return setMessage("Passwords do not match");
    }
    if (!captchaVerified) {
      setLoading(false);
      return setMessage("Please verify Captcha");
    }
    if (role === "creator" && !otpVerified) {
      setLoading(false);
      return setMessage("Please verify phone number");
    }

    const payload = {
      role,
      name: form.name,
      email: form.email,
      password: form.password,
      college: form.college,
      course: form.course,
      stream: form.stream,
      phone: role === "creator" ? form.phone : null,
      creator_role: role === "creator" ? form.creatorRole : null,
      subject_specialist: role === "creator" ? form.subjectSpecialist : null,
      interested_streams: role === "student" ? interests : null,
    };

    try {
//       await axios.post(`${BACKEND_BASE}/auth/register`, payload);

//       const fullName = form.name.trim();
// const [firstName, ...lastParts] = fullName.split(" ");
// const lastName = lastParts.join(" ");

// localStorage.setItem("firstName", firstName);
// localStorage.setItem("lastName", lastName || "");
// localStorage.setItem("role", role); // optional
// localStorage.setItem("isLoggedIn", "true");
// After successful register (inside try after axios.post)
const response = await axios.post(`${BACKEND_BASE}/auth/register`, payload);
// If backend returns created user id, read it. Otherwise you still have the email.
const createdUserId = response.data?.userId || response.data?.id || null;

const fullName = form.name.trim();
const [firstName, ...lastParts] = fullName.split(" ");
const lastName = lastParts.join(" ");

localStorage.setItem("firstName", firstName);
localStorage.setItem("lastName", lastName || "");
localStorage.setItem("role", role); 
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("userEmail", form.email); // **store email**
if (createdUserId) localStorage.setItem("userId", createdUserId); // **optional**


if (role === "creator") {
  localStorage.setItem("creatorRole", form.creatorRole);
  localStorage.setItem("subjectSpecialist", form.subjectSpecialist);
}

      setStep("success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  }



  if (step === "success")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <h2 className="text-2xl font-bold text-green-600">✅ Registered Successfully!</h2>
        <p className="mt-2 text-gray-700">Redirecting to login...</p>
      </div>
    );

    

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-purple-700 via-indigo-700 to-blue-600 px-4 py-8">
      <div className="w-full max-w-lg p-8 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 text-white">
        <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-lg">✨ Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Role */}
          <div className="flex justify-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={role === "student"} onChange={() => setRole("student")} className="accent-red-600" />
              Student
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={role === "creator"} onChange={() => setRole("creator")} className="accent-red-600" />
              Creator
            </label>
          </div>

          <input type="text" placeholder="Full Name" className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-white" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-white" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

          {/* College */}
          <input type="text" placeholder="Search your College" className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner text-white" value={collegeQuery} onChange={(e) => { setCollegeQuery(e.target.value); setForm({ ...form, college: e.target.value }); }} />
          
          {collegeSuggestions.length > 0 && (
  <div className="bg-white/30 rounded-xl shadow-lg max-h-40 overflow-y-auto text-black mt-1">
    {collegeSuggestions.map((c, i) => (
      <div
        key={i}
        className="px-3 py-2 hover:bg-indigo-300 cursor-pointer rounded-lg"
        onClick={() => {
          setCollegeQuery(c.name);
          setForm({ ...form, college: c.name });
          setCollegeSuggestions([]);
        }}
      >
        {c.name}
      </div>
    ))}
  </div>
)}


          {/* Course & Stream */}
          <select className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner text-black" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
            <option value="">Select Course</option>
            {allCourses.map((c, i) => (<option key={i} value={c}>{c}</option>))}
          </select>

          <select className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner text-black" value={form.stream} onChange={(e) => setForm({ ...form, stream: e.target.value })}>
            <option value="">Select Stream</option>
            {allStreams.map((s, i) => (<option key={i} value={s}>{s}</option>))}
          </select>

      

          {/* Interests for Student */}
{role === "student" && (
  <div className="space-y-3">
    
    {/* Dropdown */}
    <div className="relative">
      <select
        className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-black"
        onChange={(e) => {
          const value = e.target.value;
          if (value && !interests.includes(value)) {
            setInterests([...interests, value]);
          }
        }}
      >
        <option value="">Select Interest</option>
        {allInterests.map((interest, i) => (
          <option key={i} value={interest}>
            {interest}
          </option>
        ))}
      </select>
    </div>

    {/* Selected Interest Tags */}
    <div className="flex flex-wrap gap-2">
      {interests.map((interest, i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-white/30 text-white px-3 py-1 rounded-full"
        >
          <span>{interest}</span>
          
          {/* Remove button */}
          <button
            type="button"
            className="text-gray-600 font-bold text-lg"
            onClick={() =>
              setInterests(interests.filter((x) => x !== interest))
            }
          >
            ✕
          </button>
        </div>
      ))}
    </div>

  </div>
)}




          {/* Creator Fields */}
          {role === "creator" && (
            <>
              <input type="text" placeholder="Creator Role" className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-white" value={form.creatorRole} onChange={(e) => setForm({ ...form, creatorRole: e.target.value })} />

              <select className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-black" value={form.subjectSpecialist} onChange={(e) => setForm({ ...form, subjectSpecialist: e.target.value })}>
                <option value="">Select Subject Specialist</option>
                {allSubjects.map((s, i) => (<option key={i} value={s}>{s}</option>))}
              </select>

              <div className="flex gap-2">
                <input type="text" placeholder="Phone Number" className="flex-1 px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner text-white" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <button type="button" onClick={sendOtp} className="px-4 py-2 bg-indigo-500 rounded-xl"> Send OTP </button>
              </div>

              {otpSent && (
                <div className="flex gap-2 mt-2">
                  <input type="text" placeholder="Enter OTP" className="flex-1 px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white" value={form.otp} onChange={(e) => setForm({ ...form, otp: e.target.value })} />
                  <button type="button" onClick={verifyOtp} className="px-4 py-2 bg-green-500 rounded-xl">Verify</button>
                </div>
              )}
            </>
          )}

          {/* Password */}
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner text-white" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-white">
              
              {showPassword ? 
              <Eye size={20} /> : <EyeOff size={20} />
              }
              
              </button>
          </div>

          <input type="password" placeholder="Confirm Password" className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner text-white" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />

          {/* Captcha */}
          <div className="flex justify-center my-3">
            <ReCAPTCHA sitekey="6LeXtd8rAAAAAPoCBZQ-ZYO3iv-qCS5x59Y-b3wc" onChange={() => setCaptchaVerified(true)} />
          </div>

          <button type="submit" className={`w-full py-3 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-pink-500 to-indigo-500"}`} disabled={loading}>
            {loading ? <Loader2 size={20} className="animate-spin inline mr-2" /> : "Register"}
          </button>

          {message && <p className="text-center text-sm mt-2 text-yellow-300">{message}</p>}
          <p className="text-center text-sm mt-2">Already have an account? <Link to="/login" className="text-indigo-200 hover:text-white hover:underline">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
