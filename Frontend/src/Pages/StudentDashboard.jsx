import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import QuizHistory from "../components/QuizHistory";

export default function StudentDashboardRevamped() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [showQuizHistory, setShowQuizHistory] = useState(false);


  const toggleDark = () => {
    setDarkMode((d) => {
      const newTheme = !d ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return !d;
    });
  };

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  // Demo data
  const progress = [
    { id: 1, title: "React Basics", percent: 72 },
    { id: 2, title: "Data Structures", percent: 48 },
    { id: 3, title: "Machine Learning", percent: 33 },
  ];

  const learningData = [
    { name: "Week 1", minutes: 120 },
    { name: "Week 2", minutes: 200 },
    { name: "Week 3", minutes: 150 },
    { name: "Week 4", minutes: 240 },
    { name: "Week 5", minutes: 300 },
  ];

  const pieData = [
    { name: "Courses", value: 6 },
    { name: "Quizzes", value: 14 },
    { name: "Assignments", value: 4 },
  ];

  const COLORS = ["#00C49F", "#0088FE", "#FFBB28"];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      {/* Navbar */}
      <header
        className={`${
          darkMode ? "bg-gray-800" : "bg-white shadow-sm"
        } sticky top-0 z-40`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded hover:bg-gray-200/50"
            >
              ☰
            </button>
            <h1 className="text-xl font-semibold">Student Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleDark} className="px-3 py-1 rounded border">
              {darkMode ? "Light" : "Dark"}
            </button>

            <div className="flex items-center gap-3">
              {/* ✅ UPDATED NAME DISPLAY */}
              <div className="flex flex-col leading-tight text-right">
                <span className="text-sm font-medium">
                  {(localStorage.getItem("firstName") || "").trim()}{" "}
                  {(localStorage.getItem("lastName") || "").trim()}
                </span>

                <span className="text-xs text-gray-500">
                  {localStorage.getItem("role") || "Student"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="col-span-12 md:col-span-3 lg:col-span-2 rounded-lg p-4 bg-white/70 shadow-md">
            <nav className="flex flex-col gap-3">
              <a href="/my-courses" className="px-3 py-2 rounded hover:bg-gray-100">
                📘 My Courses
              </a>
              <a href="/quizzes" className="px-3 py-2 rounded hover:bg-gray-100">
  🧠 Quizzes
</a>


             
            </nav>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Learning Streak</h4>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: "62%",
                    background: "linear-gradient(90deg,#34d399,#06b6d4)",
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                7 days streak • Keep going!
              </p>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <section className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
          {/* Top stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-white shadow flex flex-col gap-2">
              <div className="text-sm text-gray-500">Total Courses</div>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-xs text-green-600">+2 this month</div>
            </div>

            <div className="p-4 rounded-lg bg-white shadow flex flex-col gap-2">
              <div className="text-sm text-gray-500">Quizzes Taken</div>
              <div className="text-2xl font-bold text-blue-600">34</div>
              <div className="text-xs text-red-500">-1 this month</div>
            </div>

            <div className="p-4 rounded-lg bg-white shadow flex flex-col gap-2">
              <div className="text-sm text-gray-500">Avg Accuracy</div>
              <div className="text-2xl font-bold text-blue-600">82%</div>
              <div className="text-xs text-green-600">+5% vs last week</div>
            </div>

            {/* 3D Card */}
            <div className="p-2 rounded-lg bg-white shadow flex flex-col">
              <div className="text-sm text-gray-500 px-2">3D Preview</div>
              <div className="flex-1 h-44 w-full rounded-md overflow-hidden">
                <Canvas style={{ height: 176 }}>
                  <ambientLight />
                  <directionalLight position={[2, 5, 2]} />
                  <RotatingCube />
                  <OrbitControls enableZoom={false} />
                </Canvas>
              </div>
              <div className="px-2 py-2 text-xs text-gray-500">
                Rotate to explore • shows course progress in 3D
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2 p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2 text-blue-600">Study Time (last 5 weeks)</h3>
              <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={learningData}>
                    <defs>
                      <linearGradient
                        id="colorMinutes"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="minutes"
                      stroke="#8884d8"
                      fill="url(#colorMinutes)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2 text-blue-600">Content Breakdown</h3>
              <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Table + Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-600">My Courses</h3>
                <button className="text-sm px-3 py-1 border rounded">
                  View all
                </button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">Course</th>
                    <th className="py-2">Progress</th>
                    <th className="py-2">Due</th>
                  </tr>
                </thead>
                <tbody>
                  {progress.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="py-3">{c.title}</td>
                      <td className="py-3">
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-3 rounded-full"
                            style={{
                              width: `${c.percent}%`,
                              background:
                                "linear-gradient(90deg,#f97316,#ef4444)",
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {c.percent}% completed
                        </div>
                      </td>
                      <td className="py-3">
                        {c.id === 1 ? "2 days" : "1 week"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-3 text-blue-600">Recent Activity</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>✅ Completed quiz: "React Basics" • 12 Nov 2025</li>
                <li>📝 Submitted assignment: "DSA Homework" • 10 Nov 2025</li>
                <li>🔔 New course added: "Intro to ML" • 5 Nov 2025</li>
                <li>🏆 Earned badge: "Consistency" • 1 Nov 2025</li>
              </ul>
            </div>
          </div>

        

          <div className="text-xs text-gray-500">Last synced: Nov 12, 2025</div>
        </section>
      </div>
    </div>
  );
}

// 3D Rotating Cube Component
function RotatingCube() {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.6;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#06b6d4" metalness={0.4} roughness={0.2} />
    </mesh>
  );
}
