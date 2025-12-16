import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaMicrophone, FaVolumeUp } from "react-icons/fa";

export default function AiDoubtSolver() {
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("doubt_msgs") || "[]");
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  // TTS speed saved in localStorage
  const [ttsRate, setTtsRate] = useState(() => {
    return parseFloat(localStorage.getItem("doubt_tts_rate") || "1");
  });

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/doubt/history");
        const data = await res.json();
        setMessages(data);
        localStorage.setItem("doubt_msgs", JSON.stringify(data));
      } catch {
        console.warn("Using cached messages");
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    localStorage.setItem("doubt_msgs", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("doubt_tts_rate", String(ttsRate));
  }, [ttsRate]);

  // SPEECH TO TEXT
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }

    const recog = new window.webkitSpeechRecognition();
    recog.interimResults = false;
    recog.continuous = false;
    recog.lang = "en-US";

    recog.onstart = () => setListening(true);
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);

    recog.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + spoken : spoken));
    };

    recog.start();
  };

  // PLAY TTS ON TAP
  const playTTS = (text) => {
    if (!("speechSynthesis" in window)) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = ttsRate;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input.trim(), createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);

    const textToSend = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/doubt/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSend }),
      });

      const data = await res.json();
      const fullAI = data.reply;

      const aiTempId = Date.now();

      // Push empty AI message
      setMessages((prev) => [...prev, { _id: aiTempId, sender: "ai", text: "", createdAt: new Date().toISOString() }]);

      // STREAM word-by-word
      const words = fullAI.split(" ");
      let index = 0;

      const delay = Math.max(30, 90 / ttsRate);

      const interval = setInterval(() => {
        index++;
        setMessages((prev) =>
          prev.map((m) =>
            m._id === aiTempId ? { ...m, text: words.slice(0, index).join(" ") } : m
          )
        );

        if (index >= words.length) clearInterval(interval);
      }, delay);

      // Refresh from DB to sync IDs
      const hist = await fetch("http://localhost:5001/api/doubt/history");
      if (hist.ok) {
        const dbMsgs = await hist.json();
        setMessages(dbMsgs);
        localStorage.setItem("doubt_msgs", JSON.stringify(dbMsgs));
      }

    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "ai", text: "Error contacting AI.", createdAt: new Date().toISOString() }]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center pt-10 px-4">
      <h1 className="text-4xl font-extrabold text-indigo-700">AI Doubt Solver</h1>
      <p className="text-gray-600 mt-1">Text, Speech, AI streaming, and TTS</p>

      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-xl mt-6 p-5 rounded-2xl shadow-xl h-[75vh] flex flex-col border">
        
        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto pr-2">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
  key={msg._id ?? idx}
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  className={`my-3 p-3 rounded-xl max-w-[90%] shadow relative ${
    msg.sender === "user" ? "ml-auto bg-blue-200" : "mr-auto bg-gray-200"
  }`}
>
  <div className="whitespace-pre-wrap text-gray-800 mt-3">{msg.text}</div>

  {/* Speaker + Stop icons for AI messages */}
  {msg.sender === "ai" && (
    <div className="absolute right-2 top-2 flex gap-2">
      
      {/* Play Voice */}
      <button
        onClick={() => playTTS(msg.text)}
        className="text-indigo-600 hover:text-indigo-800"
      >
        <FaVolumeUp size={18} />
      </button>

      {/* Stop Voice */}
      <button
        onClick={() => window.speechSynthesis.cancel()}
        className="text-red-600 hover:text-red-800"
      >
        ❌
      </button>

    </div>
  )}

  <div className="text-xs text-gray-500 mt-1">
    {new Date(msg.createdAt).toLocaleString()}
  </div>
</motion.div>

            ))}
          </AnimatePresence>

          {loading && (
            <div className="mt-2 text-gray-500 font-semibold animate-pulse">
              AI is thinking...
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="mt-3 flex items-center gap-3">

          {/* SPEECH TO TEXT */}
          <button
            onClick={startListening}
            className={`p-3 bg-green-100 rounded-xl shadow hover:bg-green-200 ${
              listening ? "animate-pulse" : ""
            }`}
          >
            <FaMicrophone className="text-green-600" />
          </button>

          {/* TEXT INPUT */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents newline
      sendMessage();
    }
  }}
            placeholder="Ask your doubt..."
            className="flex-1 p-3 rounded-xl border shadow bg-white"
          />

          {/* TTS SPEED */}
          <select
            value={ttsRate}
            onChange={(e) => setTtsRate(parseFloat(e.target.value))}
            className="border rounded px-2 py-2"
          >
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>

          {/* SEND */}
          <button
            onClick={sendMessage}
            className="p-3 px-4 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700"
          >
            <FaPaperPlane />
          </button>
        </div>

      </div>
    </div>
  );
}
