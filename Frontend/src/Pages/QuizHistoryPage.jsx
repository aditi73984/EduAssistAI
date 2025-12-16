import React from "react";
import QuizHistory from "../components/QuizHistory";

export default function QuizHistoryPage() {
  const userId = localStorage.getItem("userId");

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
            Your Quiz History
      </h1>

      <QuizHistory userId={userId} />

      <div className="mt-10">
        <a
          href="/student-dashboard"
          className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          Back to Dashboard
        </a>
      </div>

      <div className="mt-10">
        <a
          href="/feature/exam-engine"
          className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          Practise more Qizzes
        </a>
      </div>
    </div>
  );
}
