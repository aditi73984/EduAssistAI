// import { useEffect, useState } from "react";

// export default function AIQuizGenerator() {
//   const [text, setText] = useState("");
//   const [topic, setTopic] = useState("");
//   const [mcqs, setMcqs] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [quizHistory, setQuizHistory] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem(`quizHistory_${userId}`)) || [];
//     } catch {
//       return [];
//     }  
//   });

//   const userId = localStorage.getItem("userId") || "guest";


//   useEffect(() => {
// localStorage.setItem(`quizHistory_${userId}`, JSON.stringify(quizHistory));
//   }, [quizHistory]);

//   // Generate 20-question quiz from pasted text only
//   const handleGenerateQuiz = async () => {
//     if (!text.trim()) {
//       alert("Please paste some text/notes before generating.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const payload = { text: text.trim(), topic: topic.trim() || text.trim().slice(0, 50) };
//       const res = await fetch("http://localhost:5001/api/quiz/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("Generate error:", data);
//         alert(data.message || "Error generating quiz");
//         setLoading(false);
//         return;
//       }

//       const quiz = data.quiz || [];
//       setMcqs(quiz);
//       setActiveIndex(0);
//       setSelectedOption(null);
//       setResult(null);

//       // Create a new history entry with counters
//       const newEntry = {
//         id: data.quizId || `${Date.now()}`,
//         topic: payload.topic,
//         questions: quiz,
//         createdAt: new Date().toISOString(),
//         stats: { correct: 0, wrong: 0 }
//       };

//       // append and save
//       const updated = [newEntry, ...quizHistory];
//       setQuizHistory(updated);
//       // keep UI focused on the new quiz
//     } catch (err) {
//       console.error(err);
//       alert("Server error while generating quiz.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // When user selects an option: update result and update history counters
//   const handleOptionClick = (opt) => {
//     if (!mcqs || mcqs.length === 0) return;
//     const currentQ = mcqs[activeIndex];
//     const isCorrect = opt === currentQ.answer;
//     setSelectedOption(opt);
//     setResult(isCorrect ? "correct" : "wrong");

//     // Update the most recent quiz in localStorage that matches current questions
//     // We'll identify the quiz by matching topic + createdAt (most recent)
//     setQuizHistory((prev) => {
//       if (!prev || prev.length === 0) return prev;
//       // we assume the first entry is the active quiz (since we add new quizzes to front)
//       const updated = [...prev];
//       const entry = updated[0];
//       if (!entry) return prev;
//       if (isCorrect) entry.stats.correct = (entry.stats.correct || 0) + 1;
//       else entry.stats.wrong = (entry.stats.wrong || 0) + 1;
//       // Save back
//       return updated;
//     });
//   };

//   // navigate next/prev
//   const goNext = () => {
//     if (activeIndex < mcqs.length - 1) {
//       setActiveIndex(activeIndex + 1);
//       setSelectedOption(null);
//       setResult(null);
//     }
//   };
//   const goPrev = () => {
//     if (activeIndex > 0) {
//       setActiveIndex(activeIndex - 1);
//       setSelectedOption(null);
//       setResult(null);
//     }
//   };

//   // Render a compact All Quizzes list (topic, total, correct, wrong)
//   const AllQuizzesList = () => (
//     <div className="mt-10 bg-white p-6 rounded-xl shadow">
//       <h2 className="text-2xl font-semibold mb-4">All Quizzes</h2>
//       {quizHistory.length === 0 ? (
//         <p className="text-gray-500">No quizzes generated yet.</p>
//       ) : (
//         <div className="flex flex-col gap-3">
//           {quizHistory.map((q) => (
//             <div key={q.id} className="flex justify-between items-center p-3 border rounded">
//               <div>
//                 <div className="font-semibold">{q.topic}</div>
//                 <div className="text-sm text-gray-500">{new Date(q.createdAt).toLocaleString()}</div>
//               </div>
//               <div className="text-right">
//                 <div>Total: {Array.isArray(q.questions) ? q.questions.length : 0}</div>
//                 <div>Correct: {q.stats?.correct ?? 0}</div>
//                 <div>Wrong: {q.stats?.wrong ?? 0}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-purple-100">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h1 className="text-3xl font-bold text-indigo-700 mb-4">AI Quiz Generator (Text only)</h1>

//           <select
//   className="w-full border p-2 rounded mb-3 bg-amber-100"
//   value={topic}
//   onChange={(e) => setTopic(e.target.value)}
// >
//   <option value="">Select Difficulty</option>
//   <option value="Easy">Easy</option>
//   <option value="Medium">Medium</option>
//   <option value="Hard">Hard</option>
// </select>


//           <textarea
//             className="w-full border p-4 rounded h-40 mb-4"
//             placeholder="Paste your notes or text here..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />

//           <div className="flex gap-3">
//             <button
//               onClick={handleGenerateQuiz}
//               disabled={loading}
//               className="px-4 py-2 bg-indigo-600 text-white rounded">
//               {loading ? "Generating..." : "Generate Qs"}
//             </button>
//             <button
//               onClick={() => {
//                 setText("");
//               }}
//               className="px-4 py-2 bg-gray-200 rounded">
//               Clear
//             </button>
//           </div>
//         </div>

//         {/* Questions panel */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-2xl font-semibold mb-4">Attempt Question</h2>

//           {mcqs.length === 0 ? (
//             <p className="text-gray-500">No questions yet — generate a quiz from pasted text.</p>
//           ) : (
//             <div>
//               <div className="mb-3 text-sm text-gray-600">Question {activeIndex + 1} of {mcqs.length}</div>
//               <div className="font-bold text-lg mb-4">{mcqs[activeIndex].question}</div>

//               <div className="flex flex-col gap-3">
//                 {mcqs[activeIndex].options.map((opt, i) => (
//                   <button
//                     key={i}
//                     onClick={() => handleOptionClick(opt)}
//                     className={`text-left p-3 rounded border ${selectedOption === opt ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`}>
//                     {opt}
//                   </button>
//                 ))}
//               </div>

//               {result && (
//                 <div className={`mt-4 p-3 rounded ${result === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                   {result === 'correct' ? '✅ Correct' : '❌ Wrong'}
//                 </div>
//               )}

//               <div className="mt-4 flex gap-3">
//                 <button onClick={goPrev} disabled={activeIndex === 0} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
//                 <button onClick={goNext} disabled={activeIndex === mcqs.length - 1} className="px-3 py-1 bg-gray-200 rounded">Next</button>
//               </div>
//             </div>
//           )}
//         </div>

//         All quizzes list
//         <AllQuizzesList />
//       </div>
//     </div>
//   );
// }











// import { useEffect, useState } from "react";

// export default function AIQuizGenerator() {
//   const userId = localStorage.getItem("userId") || "guest";

//   const [text, setText] = useState("");
//   const [topic, setTopic] = useState("");
//   const [mcqs, setMcqs] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [quizHistory, setQuizHistory] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem(`quizHistory_${userId}`)) || [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(
//       `quizHistory_${userId}`,
//       JSON.stringify(quizHistory)
//     );
//   }, [quizHistory]);

//   const handleGenerateQuiz = async () => {
//     if (!text.trim()) {
//       alert("Please paste some notes first!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = { text, topic: topic || "Untitled Topic" };

//       const res = await fetch("http://localhost:5001/api/quiz/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert("Error generating quiz");
//         setLoading(false);
//         return;
//       }

//       const quiz = data.quiz || [];

//       setMcqs(quiz);
//       setActiveIndex(0);
//       setSelectedOption(null);
//       setResult(null);

//       // Save quiz entry for dashboard
//       const newEntry = {
//         id: data.quizId || `${Date.now()}`,
//         topic: payload.topic,
//         questions: quiz,
//         createdAt: new Date().toISOString(),
//         stats: { correct: 0, wrong: 0 },
//       };

//       setQuizHistory([newEntry, ...quizHistory]);
//     } catch (err) {
//       console.error(err);
//       alert("Server error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOptionClick = (opt) => {
//     const currentQ = mcqs[activeIndex];
//     const isCorrect = opt === currentQ.answer;

//     setSelectedOption(opt);
//     setResult(isCorrect ? "correct" : "wrong");

//     // update history stats
//     setQuizHistory((prev) => {
//       const updated = [...prev];
//       updated[0].stats[isCorrect ? "correct" : "wrong"]++;
//       return updated;
//     });
//   };

//   return (
//     <div className="min-h-screen p-10">
//       <h1 className="text-3xl font-bold mb-4">AI Quiz Generator</h1>

//       <textarea
//         className="w-full p-3 border rounded mb-3"
//         placeholder="Paste your notes..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       ></textarea>

//       <button
//         onClick={handleGenerateQuiz}
//         className="bg-indigo-600 text-white px-4 py-2 rounded"
//       >
//         {loading ? "Generating..." : "Generate Quiz"}
//       </button>

//       <div className="mt-6">
//         {mcqs.length > 0 && (
//           <div>
//             <h2 className="font-bold text-xl">
//               Question {activeIndex + 1}/{mcqs.length}
//             </h2>

//             <p className="my-3">{mcqs[activeIndex].question}</p>

//             {mcqs[activeIndex].options.map((opt, i) => (
//               <button
//                 key={i}
//                 className={`block p-2 border rounded mb-2 w-full text-left ${
//                   selectedOption === opt
//                     ? "bg-indigo-100 border-indigo-400"
//                     : "border-gray-300"
//                 }`}
//                 onClick={() => handleOptionClick(opt)}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







import { useEffect, useState } from "react";

export default function AIQuizGenerator() {
  const userId = localStorage.getItem("userId") || "guest";

  // UI STATES
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const [mcqs, setMcqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // QUIZ HISTORY (storage)
  const [quizHistory, setQuizHistory] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(`quizHistory_${userId}`)) || []
      );
    } catch {
      return [];
    }
  });

  // SAVE TO STORAGE ON CHANGE
  useEffect(() => {
    localStorage.setItem(
      `quizHistory_${userId}`,
      JSON.stringify(quizHistory)
    );
  }, [quizHistory]);

  // GENERATE QUIZ
  const handleGenerateQuiz = async () => {
    if (!text.trim()) {
      alert("Please paste some text first.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        text: text.trim(),
        topic: topic || "Untitled Topic",
      };

      const res = await fetch("http://localhost:5001/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error generating quiz");
        setLoading(false);
        return;
      }

      const quiz = data.quiz || [];

      // update UI
      setMcqs(quiz);
      setActiveIndex(0);
      setSelectedOption(null);
      setResult(null);

      // NEW HISTORY ENTRY FORMAT
      const newEntry = {
        id: data.quizId || `${Date.now()}`,
        topic: payload.topic,
        questions: quiz,
        createdAt: new Date().toISOString(),
        stats: { correct: 0, wrong: 0 },
      };

      setQuizHistory([newEntry, ...quizHistory]);
    } catch (err) {
      console.error(err);
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  // USER SELECTS OPTION
  const handleOptionClick = (opt) => {
    if (!mcqs.length) return;

    const q = mcqs[activeIndex];
    const isCorrect = opt === q.answer;

    setSelectedOption(opt);
    setResult(isCorrect ? "correct" : "wrong");

    // update stats in latest quiz entry
    setQuizHistory((prev) => {
      const updated = [...prev];
      updated[0].stats[isCorrect ? "correct" : "wrong"]++;
      return updated;
    });
  };

  // NEXT / PREV
  const goNext = () => {
    if (activeIndex < mcqs.length - 1) {
      setActiveIndex(activeIndex + 1);
      setSelectedOption(null);
      setResult(null);
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setSelectedOption(null);
      setResult(null);
    }
  };

  // UI
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">
            AI Quiz Generator (Text Only)
          </h1>

          {/* Difficulty / Topic */}
          <select
            className="w-full border p-2 rounded mb-3 bg-amber-100"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Text Input */}
          <textarea
            className="w-full border p-4 rounded h-40 mb-4"
            placeholder="Paste your notes or text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={handleGenerateQuiz}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              {loading ? "Generating..." : "Generate Questions"}
            </button>

            <button
              onClick={() => setText("")}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Clear
            </button>
          </div>
        </div>

        {/* QUESTIONS PANEL */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Attempt Questions</h2>

          {mcqs.length === 0 ? (
            <p className="text-gray-500">
              No quiz loaded — generate a quiz first.
            </p>
          ) : (
            <div>
              <div className="mb-3 text-sm text-gray-600">
                Question {activeIndex + 1} of {mcqs.length}
              </div>

              <div className="font-bold text-lg mb-4">
                {mcqs[activeIndex].question}
              </div>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {mcqs[activeIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className={`text-left p-3 rounded border ${
                      selectedOption === opt
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Correct / Wrong */}
              {result && (
                <div
                  className={`mt-4 p-3 rounded ${
                    result === "correct"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {result === "correct" ? "✅ Correct" : "❌ Wrong"}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Prev
                </button>
                <button
                  onClick={goNext}
                  disabled={activeIndex === mcqs.length - 1}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* REMOVE OLD "All Quizzes List" FROM HERE */}
        {/* History now shown ONLY in Dashboard and /quizzes page */}
      </div>
    </div>
  );
}
