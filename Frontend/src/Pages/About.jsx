import { FaRobot, FaGraduationCap, FaUsers, FaBookReader } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-800 min-h-screen pt-24 pb-16 px-6">

      {/* 🌟 Header Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
          About <span className="text-purple-600">EduAssistAI</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Making learning smarter, simpler, and more engaging with the power of AI,
          EduAssistAI empowers learners and educators through intelligent, adaptive technology.</p>
      </div>

      {/* 💡 Mission Section */}
      <section className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At <strong>EduAssistAI</strong>, our mission is to bridge the gap between traditional 
            education and modern AI-driven tools. We help students learn smarter, not harder, using 
            AI tutors, real-time feedback, and adaptive learning experiences.
          </p>
        </div>
        <div className="flex justify-center">
          <FaGraduationCap className="text-8xl text-purple-500 drop-shadow-md" />
        </div>
      </section>

      {/* 🚀 What We Offer */}
      <section className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-10">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
            <FaRobot className="text-indigo-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">AI Tutor</h3>
            <p className="text-gray-600">Get instant explanations powered by AI.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
            <FaBookReader className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
            <p className="text-gray-600">Practice with live coding & visual modules.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
            <FaUsers className="text-yellow-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
            <p className="text-gray-600">Grow with global learners.</p>
          </div>
        </div>
      </section>

      {/* 🕒 Journey Section */}
      <section className="max-w-5xl mx-auto mt-20 text-center">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-8">
          Our Journey
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Started as a small educational AI project, EduAssistAI has evolved into a complete 
          ecosystem for modern learning.
        </p>
      </section>

   

    </div>
  );
}
