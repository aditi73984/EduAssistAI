import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaBug,
  FaProjectDiagram,
  FaLaptopCode,
  FaPuzzlePiece,
  FaCode,
  FaClipboard,
  FaDownload,
} from "react-icons/fa";



const LANGS = [
  { id: "javascript", label: "JavaScript", commentLine: "//", multiline: true },
  { id: "python", label: "Python", commentLine: "#", multiline: false },
  { id: "java", label: "Java", commentLine: "//", multiline: true },
  { id: "c", label: "C", commentLine: "//", multiline: true },
  { id: "cpp", label: "C++", commentLine: "//", multiline: true },
];

export default function AICodingFull() {
  // top panel selection
  const [activePanel, setActivePanel] = useState("quiz");

  // Global language selection (affects panels unless overridden)
  const [globalLang, setGlobalLang] = useState("javascript");

  // -------------------- Explain --------------------
  const [explainLangOverride, setExplainLangOverride] = useState("");
  const explainLang = explainLangOverride || globalLang;
  const [explainCodeInput, setExplainCodeInput] = useState("// Paste code here\nconsole.log('hello');");
  const [explainResult, setExplainResult] = useState("");

  // -------------------- Fix Code --------------------
  const [fixLangOverride, setFixLangOverride] = useState("");
  const fixLang = fixLangOverride || globalLang;
  const [fixCodeInput, setFixCodeInput] = useState("// JS sample with issues\nif(a==b) console.log('ok')\nvar x = 2");
  const [fixResult, setFixResult] = useState("");
  const [fixSuggestions, setFixSuggestions] = useState([]);

  // -------------------- Code Generator --------------------
  const [genLangOverride, setGenLangOverride] = useState("");
  const genLang = genLangOverride || globalLang;
  const [genPrompt, setGenPrompt] = useState("A function to compute factorial");
  const [genResult, setGenResult] = useState("");

  // -------------------- Debugger --------------------
  const [debugLangOverride, setDebugLangOverride] = useState("");
  const debugLang = debugLangOverride || globalLang;
  const [debugCodeInput, setDebugCodeInput] = useState("// Paste code to analyze for issues\nfor(;;) {}\nlet x; console.log(y);");
  const [debugFindings, setDebugFindings] = useState([]);
  

  // -------------------- Quiz/Coding Challenge --------------------
  // Problems now have starter templates per language
  const problems = [
    {
      id: 1,
      title: "Two Sum (simplified)",
      difficulty: "Easy",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Return the first valid pair.",
      example: "Input: nums = [2,7,11,15], target = 9 -> Output: [0,1]",
      starterCode: {
        javascript: `// implement function twoSum(nums, target)\nfunction twoSum(nums, target) {\n  // your code here\n}`,
        python: `# implement function two_sum(nums, target)\ndef two_sum(nums, target):\n    # your code here\n    pass`,
        java: `// implement twoSum as static method in a class\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // your code here\n        return new int[]{-1,-1};\n    }\n}`,
      },
      functionName: { javascript: "twoSum", python: "two_sum", java: "twoSum" },
      tests: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] },
      ],
    },
    {
      id: 2,
      title: "Reverse Integer (output value)",
      difficulty: "Medium",
      description:
        "Given a 32-bit signed integer, reverse digits of an integer. If reversing causes overflow, return 0. (Simplified: assume inputs won't overflow in our tests)",
      example: "Input: 123 -> Output: 321",
      starterCode: {
        javascript: `// implement function reverseInt(x)\nfunction reverseInt(x) {\n  // your code here\n}`,
        python: `# implement function reverse_int(x)\ndef reverse_int(x):\n    # your code here\n    pass`,
        java: `public class Solution {\n    public static int reverseInt(int x) {\n        // your code here\n        return 0;\n    }\n}`,
      },
      functionName: { javascript: "reverseInt", python: "reverse_int", java: "reverseInt" },
      tests: [
        { input: [123], expected: 321 },
        { input: [-123], expected: -321 },
        { input: [120], expected: 21 },
      ],
    },
    {
      id: 3,
      title: "Is Palindrome (string)",
      difficulty: "Easy",
      description:
        "Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
      example: `Input: "A man, a plan, a canal: Panama" -> Output: true`,
      starterCode: {
        javascript: `// implement function isPalindrome(s)\nfunction isPalindrome(s) {\n  // your code here\n}`,
        python: `# implement function is_palindrome(s)\ndef is_palindrome(s):\n    # your code here\n    pass`,
        java: `public class Solution {\n    public static boolean isPalindrome(String s) {\n        // your code here\n        return false;\n    }\n}`,
      },
      functionName: { javascript: "isPalindrome", python: "is_palindrome", java: "isPalindrome" },
      tests: [
        { input: ["A man, a plan, a canal: Panama"], expected: true },
        { input: ["race a car"], expected: false },
        { input: [""], expected: true },
      ],
    },
  ];

  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [problemLangOverride, setProblemLangOverride] = useState("");
  const problemLang = problemLangOverride || globalLang;
  const [userCode, setUserCode] = useState(problems[0].starterCode.javascript);
  const [testResults, setTestResults] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const toastRef = useRef(null);

  const [username, setUsername] = useState(() => localStorage.getItem("ac_username") || "anonymous");
  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ac_leaderboard") || "[]");
    } catch (e) {
      return [];
    }
  });

  // -------------------- Helpers --------------------
  const toast = (msg) => {
    if (!toastRef.current) return alert(msg);
    const el = toastRef.current;
    el.textContent = msg;
    el.style.opacity = "1";
    setTimeout(() => {
      if (el) el.style.opacity = "0";
    }, 1600);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (e) {
      alert("Copy failed");
    }
  };

  const downloadAsFile = (filename, content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  // language helpers
  const getLangMeta = (id) => LANGS.find((l) => l.id === id) || LANGS[0];

  // -------------------- Explain Logic (language-aware) --------------------
  const explainCode = async () => {
  setExplainResult("⏳ Generating explanation...");

  try {
    const res = await fetch("http://localhost:5001/api/explain-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: explainLang,
        code: explainCodeInput
      }),
    });

    const data = await res.json();
    setExplainResult(data.explanation || "No explanation received.");
  } catch (err) {
    setExplainResult("❌ Error connecting to AI server");
  }
};



  
  const fixCode = async () => {
  setFixResult("⏳ Fixing code...");

  try {
    const res = await fetch("http://localhost:5001/api/fix-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: fixLang,
        code: fixCodeInput
      }),
    });

    const data = await res.json();
    setFixResult(data.fixed || "No fix received.");
  } catch (err) {
    setFixResult("❌ Error connecting to AI server");
  }
};


  // -------------------- Code Generator (multi-language)
  const makeFn = (s) => {
    const fn = s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    return fn || "generated_fn";
  };

  

const generateCodeRealTime = async () => {
  if (!genPrompt.trim()) return toast("Enter a prompt first");

  try {
    const res = await fetch("http://localhost:5001/api/generate-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: genLang, prompt: genPrompt }),
    });

    if (!res.ok) throw new Error("Failed to generate code");

    const data = await res.json();
    setGenResult(data.code || "// No code returned");
  } catch (err) {
    console.error("Code Generator Error:", err);
    toast("AI Code Generation Failed: " + err.message);
  }
};



  
const analyzeDebug = async () => {
  setDebugFindings(["⏳ Analyzing your code with AI…"]);

  try {
    const res = await fetch("http://localhost:5001/api/debug-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: debugLang,
        code: debugCodeInput
      }),
    });

    const data = await res.json();

    if (data.error) {
      setDebugFindings([`❌ Error: ${data.error}`]);
    } else {
      const formatted = data.findings
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      setDebugFindings(formatted);
    }
  } catch (err) {
    console.error(err);
    setDebugFindings(["❌ AI Debugger failed: " + err.message]);
  }
};



  // -------------------- Quiz/Coding helpers --------------------
  // Evaluates user's JS function(s) safely in a wrapper (still executes code in browser)
  const runTestsForProblem = (probIndex) => {
    const prob = problems[probIndex];
    const lang = problemLang;
    const code = userCode;
    const results = [];
    let passCount = 0;
    try {
      if (lang !== "javascript") {
        // For non-JS, we cannot execute tests in-browser. Provide hint instead.
        prob.tests.forEach((t, idx) => {
          results.push({ ok: false, expected: t.expected, got: null, input: t.input, note: "Run supported only for JavaScript in this browser judge" });
        });
        setTestResults(results);
        toast("Run-tests: only JavaScript execution is supported in-browser. You can copy/download solution.");
        setAttempts((a) => a + 1);
        return;
      }

      // Build wrapper which returns each test's result
      const wrapper = `(function(){\n${code}\nreturn {${prob.tests
        .map((t, idx) => {
          return `__t${idx}: (typeof ${prob.functionName.javascript || prob.functionName.javascript} !== 'undefined') ? (function(){ try { return { ok: true, out: ${prob.functionName.javascript}.apply(null, ${JSON.stringify(
            t.input
          )}) }; } catch(e) { return { ok: false, err: e.message }; } })() : { ok: false, err: 'Function not defined' }`;
        })
        .join(",\n")}};\n})()`;

      const res = new Function(`return ${wrapper}`)();

      prob.tests.forEach((t, idx) => {
        const run = res[`__t${idx}`];
        if (!run.ok) {
          results.push({ ok: false, expected: t.expected, got: run.err || null, input: t.input });
        } else {
          const got = run.out;
          const equal = deepEqual(got, t.expected);
          results.push({ ok: equal, expected: t.expected, got, input: t.input });
          if (equal) passCount++;
        }
      });
    } catch (e) {
      prob.tests.forEach((t) => results.push({ ok: false, expected: t.expected, got: e.message, input: t.input }));
    }

    setTestResults(results);
    setAttempts((a) => a + 1);

    if (passCount === prob.tests.length) {
      const entry = { user: username || "anonymous", problemId: problems[probIndex].id, attempts: attempts + 1, time: Date.now() };
      const updated = [...leaderboard.filter((b) => !(b.user === entry.user && b.problemId === entry.problemId)), entry];
      setLeaderboard(updated);
      localStorage.setItem("ac_leaderboard", JSON.stringify(updated));
      toast("All tests passed! Leaderboard updated.");
    }
  };

  const deepEqual = (a, b) => {
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch (e) {
      return a === b;
    }
  };

  const resetProblemEditor = (idx) => {
    setCurrentProblemIndex(idx);
    const lang = problemLang;
    setUserCode(problems[idx].starterCode[lang] || problems[idx].starterCode.javascript);
    setTestResults([]);
    setAttempts(0);
  };

  const saveUsername = () => {
    localStorage.setItem("ac_username", username);
    toast("Username saved");
  };

  // initialize
  useEffect(() => {
    setUserCode(problems[0].starterCode.javascript);
  }, []);

  // ================= UI =================
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-800">
      {/* toast */}
      <div ref={toastRef} className="fixed top-5 right-5 z-50 bg-indigo-600 text-white px-4 py-2 rounded shadow" style={{ opacity: 0 }} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Left Nav */}
        <div className="space-y-4">
          {[
            ["explain", "Code Explain", <FaLightbulb />],
            ["fix", "Fix Code", <FaBug />],
            ["generate", "Code Generator", <FaProjectDiagram />],
            ["debug", "Realtime Debugger", <FaLaptopCode />],
            ["quiz", "Coding Quiz", <FaPuzzlePiece />],
          ].map(([key, name, icon]) => (
            <motion.div
              whileHover={{ scale: 1.03, rotateY: 8 }}
              whileTap={{ scale: 0.98, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className={`p-4 rounded-xl cursor-pointer shadow-lg bg-white transform-gpu perspective-1000 ${activePanel === key ? "ring-2 ring-indigo-500" : ""}`}
              onClick={() => setActivePanel(key)}
              key={key}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center gap-3 text-lg">
                <span className="text-indigo-600">{icon}</span>
                <span className="font-medium">{name}</span>
              </div>
            </motion.div>
          ))}

          {/* global language selector */}
          <div className="p-4 rounded-xl bg-white shadow-lg">
            <div className="text-sm font-medium mb-2">Global Language</div>
            <select value={globalLang} onChange={(e) => setGlobalLang(e.target.value)} className="w-full border p-2 rounded">
              {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
            <div className="text-xs text-gray-500 mt-2">Panels use global language unless you override per-panel.</div>
          </div>
        </div>

        {/* Right panels */}
        <div className="md:col-span-3">
          {/* top bar */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <FaCode className="text-indigo-600" /> AI Coding Toolkit (Multi-language)
            </h1>
          </div>

          {/* EXPLAIN */}
          {activePanel === "explain" && (
            <Panel title="Code Explain" icon={<FaLightbulb />}>
              <div className="flex gap-2 items-center mb-2">
                <div className="text-sm">Language:</div>
                <select value={explainLangOverride} onChange={(e) => setExplainLangOverride(e.target.value)} className="border p-1 rounded">
                  <option value="">(use global: {getLangMeta(globalLang).label})</option>
                  {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                </select>
              </div>
              <textarea value={explainCodeInput} onChange={(e) => setExplainCodeInput(e.target.value)} className="w-full h-44 border p-3 rounded font-mono text-sm bg-gray-50" />
              <div className="flex gap-2 mt-3">
                <button onClick={explainCode} className="btn-primary">Explain</button>
                <button onClick={() => { setExplainCodeInput(""); setExplainResult(""); }} className="btn-secondary">Clear</button>
                <button onClick={() => copyToClipboard(explainCodeInput)} className="btn-ghost">Copy</button>
              </div>
              <motion.pre layout className="mt-4 bg-white p-4 rounded h-56 overflow-auto font-mono text-sm shadow-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {explainResult || "Explanation will appear here..."}
              </motion.pre>
            </Panel>
          )}

          {/* FIX */}
          {activePanel === "fix" && (
            <Panel title="Fix Code" icon={<FaBug />}>
              <div className="flex gap-2 items-center mb-2">
                <div className="text-sm">Language:</div>
                <select value={fixLangOverride} onChange={(e) => setFixLangOverride(e.target.value)} className="border p-1 rounded">
                  <option value="">(use global: {getLangMeta(globalLang).label})</option>
                  {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                </select>
              </div>
              <textarea value={fixCodeInput} onChange={(e) => setFixCodeInput(e.target.value)} className="w-full h-44 border p-3 rounded font-mono text-sm bg-gray-50" />
              <div className="flex gap-2 mt-3">
                <button onClick={fixCode} className="btn-primary">Fix Code</button>
                <button onClick={() => { setFixCodeInput(""); setFixResult(""); setFixSuggestions([]); }} className="btn-secondary">Reset</button>
                <button onClick={() => copyToClipboard(fixResult)} className="btn-ghost">Copy Fixed</button>
                <button onClick={() => downloadAsFile("fixed_code.txt", fixResult)} className="btn-ghost"><FaDownload /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <pre className="bg-white p-3 rounded h-44 overflow-auto font-mono text-sm shadow-inner">{fixResult || "Fixed code will appear here..."}</pre>
                <div className="bg-white p-3 rounded h-44 overflow-auto text-sm shadow-inner">
                  <b>Suggestions</b>
                  <div className="mt-2">
                    {fixSuggestions.length ? fixSuggestions.map((s, i) => (<div key={i}>• {s}</div>)) : <div className="text-gray-500">No suggestions yet — run Fix Code.</div>}
                  </div>
                </div>
              </div>
            </Panel>
          )}

          {/* GENERATOR */}
          {activePanel === "generate" && (
            <Panel title="Code Generator" icon={<FaProjectDiagram />}>
              <div className="flex gap-2">
                <select value={genLangOverride} onChange={(e) => setGenLangOverride(e.target.value)} className="border p-2 rounded">
                  <option value="">(use global: {getLangMeta(globalLang).label})</option>
                  {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                </select>
                <input value={genPrompt} onChange={(e) => setGenPrompt(e.target.value)} className="border p-2 rounded flex-1" placeholder="Enter code prompt (e.g. 'function to reverse array')" />
                <button onClick={generateCodeRealTime} className="btn-primary">Generate</button>
              </div>

              <div className="flex gap-2 mt-3">
                <button onClick={() => copyToClipboard(genResult)} className="btn-ghost">Copy</button>
                <button onClick={() => downloadAsFile("generated_code.txt", genResult)} className="btn-ghost"><FaDownload /></button>
              </div>

              <pre className="mt-4 bg-white p-4 rounded h-56 overflow-auto font-mono text-sm shadow-inner">{genResult || "// Generated code will appear here..."}</pre>
            </Panel>
          )}

          {/* DEBUG */}
          {activePanel === "debug" && (
            <Panel title="Realtime Debugger" icon={<FaLaptopCode />}>
              <div className="flex gap-2 items-center mb-2">
                <div className="text-sm">Language:</div>
                <select value={debugLangOverride} onChange={(e) => setDebugLangOverride(e.target.value)} className="border p-1 rounded">
                  <option value="">(use global: {getLangMeta(globalLang).label})</option>
                  {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                </select>
              </div>
              <textarea value={debugCodeInput} onChange={(e) => setDebugCodeInput(e.target.value)} className="w-full h-44 border p-3 rounded font-mono text-sm bg-gray-50" />
              <div className="flex gap-2 mt-3">
                <button onClick={analyzeDebug} className="btn-primary">Analyze</button>
                <button onClick={() => { setDebugCodeInput(""); setDebugFindings([]); }} className="btn-secondary">Reset</button>
                <button onClick={() => copyToClipboard(debugFindings.join("\n"))} className="btn-ghost">Copy Findings</button>
              </div>

              <ul className="mt-4 bg-white p-3 rounded h-44 overflow-auto text-sm shadow-inner">
                {debugFindings.map((f, i) => (<li key={i}>⚠️ {f}</li>))}
                {debugFindings.length === 0 && <li className="text-gray-500">Run analysis to see findings.</li>}
              </ul>
            </Panel>
          )}

          {/* QUIZ / CODING PANEL - upgraded UI */}
          {activePanel === "quiz" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Sidebar */}
                <div className="col-span-1 backdrop-blur-lg bg-white/70 rounded-2xl p-4 shadow-xl border border-white/50">
                  <div className="font-semibold text-lg mb-3">Problems</div>
                  {problems.map((p, idx) => (
                    <div key={p.id} className={`p-3 rounded-xl cursor-pointer mb-2 transition shadow-sm ${idx === currentProblemIndex ? "bg-indigo-100 border border-indigo-300" : "bg-white hover:bg-gray-100"}`} onClick={() => resetProblemEditor(idx)}>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-800">{p.title}</div>
                          <div className="text-xs text-gray-500">{p.difficulty}</div>
                        </div>
                        <span className="text-xs text-gray-400">#{p.id}</span>
                      </div>
                    </div>
                  ))}

                  <div className="mt-5">
                    <div className="font-semibold mb-1 text-sm">Username</div>
                    <input className="w-full border rounded-lg p-2 text-sm" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <button className="mt-2 w-full bg-indigo-500 text-white p-2 rounded-lg" onClick={saveUsername}>Save</button>
                  </div>

                  <div className="mt-5 text-sm">
                    <div className="font-semibold mb-2">Leaderboard (local)</div>
                    <div className="text-xs text-gray-600">
                      {leaderboard.length === 0 && "No completions yet."}
                      {leaderboard.map((b, i) => <div key={i} className="py-1 border-b">{b.user} — Problem #{b.problemId} — attempts: {b.attempts}</div>)}
                    </div>
                  </div>
                </div>

                {/* Main coding panel */}
                <div className="col-span-2 backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-xl border border-white/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xl font-semibold text-gray-800">{problems[currentProblemIndex].title}</div>
                      <div className="text-sm text-gray-500">{problems[currentProblemIndex].difficulty} — #{problems[currentProblemIndex].id}</div>
                    </div>
                    <div className="text-gray-500 text-sm">Attempts: {attempts}</div>
                  </div>

                  <div className="mt-4 text-sm">
                    <b>Description:</b>
                    <div className="text-gray-700 whitespace-pre-wrap mt-1">{problems[currentProblemIndex].description}</div>
                    <div className="text-xs text-gray-500 mt-2"><b>Example:</b> {problems[currentProblemIndex].example}</div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="text-sm">Language:</div>
                    <select value={problemLangOverride} onChange={(e) => { setProblemLangOverride(e.target.value); setUserCode(problems[currentProblemIndex].starterCode[e.target.value || globalLang] || problems[currentProblemIndex].starterCode.javascript); }} className="border p-1 rounded">
                      <option value="">(use global: {getLangMeta(globalLang).label})</option>
                      {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                    </select>
                    <div className="text-xs text-gray-500 ml-2">Note: Running tests in-browser is supported for JavaScript only.</div>
                  </div>

                  <div className="mt-4">
                    <div className="font-medium mb-2">Your Code</div>
                    <textarea className="w-full h-60 p-3 font-mono text-sm bg-gray-900 text-green-300 rounded-xl border border-gray-700 shadow-inner" value={userCode} onChange={(e) => setUserCode(e.target.value)} />
                    <div className="flex gap-3 mt-3">
                      <button onClick={() => runTestsForProblem(currentProblemIndex)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">Run Tests</button>
                      <button onClick={() => { setUserCode(problems[currentProblemIndex].starterCode[problemLang || globalLang]); setTestResults([]); }} className="px-4 py-2 bg-gray-200 rounded-lg shadow">Reset</button>
                      <button onClick={() => copyToClipboard(userCode)} className="px-3 py-2 border rounded-lg">Copy</button>
                      <button onClick={() => downloadAsFile(`problem_${problems[currentProblemIndex].id}_solution.txt`, userCode)} className="px-3 py-2 border rounded-lg"><FaDownload /></button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="font-medium text-lg mb-2">Test Results</div>
                    {testResults.length === 0 && <div className="text-gray-500 text-sm">Run tests to see results (JS runs here). For other languages, copy/download code and run locally.</div>}
                    {testResults.map((r, i) => (
                      <div key={i} className={`p-3 rounded-xl mb-2 ${r.ok ? "bg-green-100 border border-green-300" : "bg-red-100 border border-red-300"}`}>
                        <div><b>Test {i + 1}:</b> {r.ok ? " Passed" : " Failed"}{r.note ? ` — ${r.note}` : ""}</div>
                        <div className="text-xs text-gray-700 mt-1">Input: {JSON.stringify(r.input)}</div>
                        <div className="text-xs text-gray-700">Expected: {JSON.stringify(r.expected)}</div>
                        <div className="text-xs text-gray-700">Got: {JSON.stringify(r.got)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                <b>Note:</b> This runs JavaScript code in your browser using the Function constructor. Be careful — do not paste or run untrusted code. For Python/Java/C/C++ you will get templates and can copy/download solutions to run locally or in a language-specific judge.
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* styles (local) */}
      <style>{`
        .btn-primary { padding: 0.5rem 1rem; background-color: #4f46e5; color: white; border-radius: 0.375rem; border: none; cursor: pointer; }
        .btn-secondary { padding: 0.5rem 1rem; background-color: #e5e7eb; color: #111827; border-radius: 0.375rem; border: none; cursor: pointer; }
        .btn-ghost { padding: 0.25rem 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.375rem; background: white; cursor: pointer; }
        .perspective-1000 { perspective: 1000px; }
        .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace; }
      `}</style>
    </div>
  );
}

// ---------- Reusable Panel Component ----------
function Panel({ title, icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotateX: 2 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <span className="text-indigo-600">{icon}</span>
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
