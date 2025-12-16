import React from "react";

export default function QuizHistory({ userId }) {
  const quizHistory =
    JSON.parse(localStorage.getItem(`quizHistory_${userId}`)) || [];

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-6">
      <h3 className="font-semibold text-lg mb-3"> Quiz History</h3>

      {quizHistory.length === 0 ? (
        <p className="text-gray-500">No quizzes generated yet.</p>
      ) : (
        <ul className="space-y-3">
          {quizHistory.map((q) => (
            <li
              key={q.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{q.topic}</div>
                <div className="text-xs text-gray-500">
                  {new Date(q.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="text-right text-sm">
                <div>Total: {q.questions.length}</div>
                <div className="text-green-600">
                  Correct: {q.stats.correct}
                </div>
                <div className="text-red-600">Wrong: {q.stats.wrong}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
