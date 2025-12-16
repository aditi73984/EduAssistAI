import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPython, FaReact, FaNodeJs, FaDatabase, FaLaptopCode, FaRobot } from "react-icons/fa";

export default function Frameworks() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const categories = [
    {
      title: "Backend & APIs",
      frameworks: [
        { icon: <FaNodeJs />, title: "Node.js", desc: "Fast and scalable server-side JS framework.", link: "https://nodejs.org/" },
        { icon: <FaPython />, title: "Django", desc: "Python framework for rapid web development.", link: "https://www.djangoproject.com/" },
        { icon: <FaPython />, title: "Flask", desc: "Lightweight Python framework for APIs.", link: "https://flask.palletsprojects.com/" },
      ],
    },
    {
      title: "Frontend & UI",
      frameworks: [
        { icon: <FaReact />, title: "React.js", desc: "Build interactive UIs with components.", link: "https://reactjs.org/" },
        { icon: <FaReact />, title: "Next.js", desc: "React framework for server-side rendering.", link: "https://nextjs.org/" },
      ],
    },
    {
      title: "Databases & ML",
      frameworks: [
        { icon: <FaDatabase />, title: "MongoDB", desc: "NoSQL database for flexible data storage.", link: "https://www.mongodb.com/" },
        { icon: <FaPython />, title: "TensorFlow", desc: "Machine Learning library in Python.", link: "https://www.tensorflow.org/" },
        { icon: <FaPython />, title: "Pandas", desc: "Python library for data analysis.", link: "https://pandas.pydata.org/" },
      ],
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-purple-50 via-indigo-50/40 to-white min-h-screen py-20 overflow-hidden">

      {/* Floating colorful shapes */}
      <motion.div
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 60 }}
        className="absolute w-96 h-96 rounded-full bg-indigo-300/30 top-[-120px] left-[-120px] blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360, y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 80 }}
        className="absolute w-72 h-72 rounded-full bg-pink-300/30 bottom-[-100px] right-[-100px] blur-3xl"
      />
      <motion.div
        animate={{ rotate: 360, y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 100 }}
        className="absolute w-80 h-80 rounded-full bg-yellow-200/40 top-[30%] left-[50%] blur-3xl -translate-x-1/2"
      />

      {/* Intro Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center px-6 mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-5 drop-shadow-lg">
          {isLoggedIn ? "Welcome Back! Unlock Your Dev Power 💻" : "Discover Python & Modern Dev Frameworks 🚀"}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-700 max-w-3xl mx-auto text-base md:text-lg mb-5 leading-relaxed"
        >
          {isLoggedIn
            ? "You're logged in! Explore Backend APIs, Frontend frameworks, Databases, and Machine Learning tools with interactive cards. Click 'Explore' to visit official docs and tutorials."
            : "Learn Backend APIs, Frontend UI, Databases, and Machine Learning — all in one place! Login to get full access and see live interactive examples."}
        </motion.p>

        {/* Extra detail section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center gap-4 md:gap-6 text-center"
        >
          <div className="bg-gradient-to-r from-pink-200 to-indigo-200/80 rounded-2xl p-4 shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <FaLaptopCode className="text-3xl mx-auto mb-1 text-indigo-700" />
            <p className="font-semibold text-gray-800 text-sm md:text-base">Build Real Projects & APIs</p>
            <p className="text-gray-600 text-xs md:text-sm mt-1">{isLoggedIn ? "Dive straight into frameworks and build your dream project!" : "Explore frameworks by logging in."}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-200 to-pink-200/80 rounded-2xl p-4 shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <FaRobot className="text-3xl mx-auto mb-1 text-indigo-700" />
            <p className="font-semibold text-gray-800 text-sm md:text-base">Machine Learning & Data</p>
            <p className="text-gray-600 text-xs md:text-sm mt-1">{isLoggedIn ? "Access ML libraries and visualize data easily." : "Login to see interactive ML tools."}</p>
          </div>
        </motion.div>

        {!isLoggedIn && (
          <Link
            to="/login"
            className="mt-6 inline-block px-10 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition text-base md:text-lg transform hover:scale-105"
          >
            Login to Explore 🚀
          </Link>
        )}
      </motion.div>

      {/* Framework Cards */}
      {isLoggedIn && (
        <div className="max-w-7xl mx-auto space-y-12 px-6 relative z-10">
          {categories.map((cat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{cat.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {cat.frameworks.map((fw, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, rotateX: 3, rotateY: 3 }}
                    className="p-5 md:p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-lg hover:shadow-2xl transition-all perspective-1000"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-5xl md:text-6xl text-center mb-3 text-indigo-600"
                    >
                      {fw.icon}
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold text-indigo-700 text-center mt-2">{fw.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base text-center mt-1">{fw.desc}</p>
                    <a
                      href={fw.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-3 text-center bg-indigo-600 text-white py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition transform hover:scale-105 text-sm md:text-base"
                    >
                      Explore ⚙️
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
