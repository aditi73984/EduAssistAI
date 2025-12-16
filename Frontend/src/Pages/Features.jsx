import { FaRobot, FaCode, FaBookReader } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Features() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const featureList = [
    {
      icon: <FaRobot />,
      title: "AI Doubt Solver",
      color: "text-indigo-500",
      glow: "shadow-indigo-400/60",
      description:
        "Chat and voice text support with instant step-by-step solutions.",
      link: "/feature/doubt-solver",
    },
    {
      icon: <FaCode />,
      title: "AI Coding Assistant",
      color: "text-pink-500",
      glow: "shadow-pink-400/60",
      description:
        "Code debugging, code generation, and multi-language support.",
      link: "/feature/code-assistant",
    },
    {
      icon: <FaBookReader />,
      title: "AI Exam Engine",
      color: "text-yellow-500",
      glow: "shadow-yellow-400/60",
      description: "MCQs, auto-grading, and detailed analytics.",
      link: "/feature/exam-engine",
    },
  ];

  const introPoints = [
    "Solve doubts instantly with AI-powered solutions",
    "Generate and debug code in multiple languages",
    "Take exams and get detailed analytics automatically",
    "Learn smarter and faster with interactive AI guidance",
  ];

  return (
    <div className="relative bg-gradient-to-b from-purple-50 via-indigo-50/60 to-white min-h-screen pt-24 pb-20 overflow-hidden">
      
      {/* Floating animated circles in background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute w-96 h-96 rounded-full bg-indigo-200/20 top-[-100px] left-[-100px] blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        className="absolute w-72 h-72 rounded-full bg-pink-200/20 bottom-[-80px] right-[-80px] blur-3xl"
      />

      {/* INTRO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto px-6 mb-16 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 drop-shadow-lg mb-6">
          EduAssistAI – Smarter Learning, Powered by AI
        </h1>
        <p className="mt-3 text-gray-600 text-base md:text-lg leading-relaxed mb-8">
          One platform for doubts, coding, exams, and productivity — powered by advanced AI. Unlock your potential with interactive, intelligent learning tools.
        </p>

        {/* Animated intro points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {introPoints.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="p-5 rounded-2xl bg-indigo-100/40 shadow-lg text-indigo-800 font-semibold hover:scale-105 transition-transform duration-300"
            >
              {point}
            </motion.div>
          ))}
        </div>

        {/* Login Button if not logged in */}
        {!isLoggedIn && (
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            Login to Unlock Features 🚀
          </Link>
        )}
      </motion.div>

      {/* FEATURE CARDS */}
      {isLoggedIn && (
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 relative z-10">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.07 }}
              className="relative rounded-3xl backdrop-blur-xl bg-white/60 border border-white/70 shadow-2xl p-10 transition-all duration-300 hover:shadow-3xl hover:-translate-y-2"
            >
              {/* 3D Animated Glow Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className={`absolute -top-8 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-2 border-indigo-300/40 ${feature.glow} backdrop-blur-3xl`}
              />

              {/* Floating Icon */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className={`${feature.color} text-8xl mb-6 text-center drop-shadow-xl`}
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-center text-sm md:text-base leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Extra Info */}
              <ul className="text-gray-500 text-xs md:text-sm list-disc list-inside mb-6 text-center">
                <li>Real-time AI responses</li>
                <li>Boosts productivity & learning speed</li>
                <li>Interactive and engaging interface</li>
              </ul>

              {/* Try Feature Button */}
              <Link
                to={feature.link}
                className="block text-center bg-indigo-600 text-white py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all"
              >
                Try Feature 🚀
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
