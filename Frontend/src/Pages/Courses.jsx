// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Course = () => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const navigate = useNavigate();

//   // NEW STATES
//   const [popupMessage, setPopupMessage] = useState("");
//   const [activeCourse, setActiveCourse] = useState(null);
//   const [search, setSearch] = useState("");
//   const [showMore, setShowMore] = useState(false);


// const userId = localStorage.getItem("userId") || "guest";


//   // Load stored course progress
//   const courseProgress = JSON.parse(localStorage.getItem(`courseProgress_${userId}`)) || {};


// const enrolledCourses = JSON.parse(localStorage.getItem(`enrolledCourses_${userId}`)) || [];

//   // LOAD CREATOR ADDED COURSES (NEW LOGIC)
// const creatorCourses = JSON.parse(localStorage.getItem(`creatorCourses_${userId}`)) || [];

//   // DEFAULT COURSES
//   const defaultCourses = [
//     {
//       id: 1,
//       title: "Python Fundamentals",
//       color: "purple",
//       description:
//         "Learn the building blocks of Python with hands-on exercises and clear explanations.",
//       link: "/Course/Python-1",
//     },
//     {
//       id: 2,
//       title: "Object-Oriented Programming (OOP)",
//       color: "green",
//       description:
//         "Master OOP in Python to write reusable and organized code for real-world applications.",
//       link: "/Course/Python-2",
//     },
//     {
//       id: 3,
//       title: "Python for AI & Data Science",
//       color: "blue",
//       description:
//         "Apply Python to analyze data, build machine learning models, and work on AI projects.",
//       link: "/Course/Python-3",
//     },
//   ];

//   // 🔥 FINAL COURSES SHOWN ON SCREEN
//   const courses = [...defaultCourses, ...creatorCourses];

//   const benefits = [
//     "Hands-on projects for every topic",
//     "Learn at your own pace",
//     "Real-world examples included",
//     "Step-by-step explanations",
//   ];

//   // ENROLL FUNCTION
//   const handleEnroll = (course) => {
//     setActiveCourse(course.id);

//     // Save course in localStorage
//     const updatedCourses = [...enrolledCourses, course];
// localStorage.setItem(`enrolledCourses_${userId}`, JSON.stringify(updatedCourses));

//     // Popup
//     setPopupMessage("Course added successfully!");

//     // After 2 seconds
//     setTimeout(() => {
//       setPopupMessage("");
//       setActiveCourse(null);
//     }, 3000);
//   };


//   // Smart Search System
//   let searchResults = courses.filter((c) =>
//     c.title.toLowerCase().includes(search.toLowerCase())
//   );

//   // If no search → normal display
//   let finalCourseList =
//     search.trim() === ""
//       ? showMore
//         ? courses
//         : courses.slice(0, 9)
//       : [...searchResults, ...courses.filter((c) => !searchResults.includes(c))];

//   // If no match
//   useEffect(() => {
//     if (search.trim() !== "" && searchResults.length === 0) {
//       setPopupMessage("No course found");
//       setTimeout(() => {
//         setPopupMessage("");
//       }, 2000);
//     }
//   }, [search]);

//   // COURSE TIME TRACKING -----------------------------------
//   const startCourseTracking = (course) => {
//     const courseId = course.id;

//     let timerStart = Date.now();

//     localStorage.setItem("activeCourseTimer", JSON.stringify({ courseId, timerStart }));

//     navigate(course.link);
//   };

//   useEffect(() => {
//     const timerData = JSON.parse(localStorage.getItem("activeCourseTimer"));

//     if (!timerData) return;

//     const { courseId, timerStart } = timerData;

//     const interval = setInterval(() => {
//       let now = Date.now();
//       let timeSpent = Math.floor((now - timerStart) / 1000);

//       if (timeSpent > 1800) timeSpent = 1800; // MAX 30 min

//       let progress = Math.floor((timeSpent / 1800) * 100);

//       let newProgressData = {
//         ...courseProgress,
//         [courseId]: { timeSpent, progress },
//       };

// localStorage.setItem(`courseProgress_${userId}`, JSON.stringify(newProgressData));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gray-50">

//       {/* POPUP */}
//       {popupMessage && (
//         <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse z-50">
//           {popupMessage}
//         </div>
//       )}

//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-purple-100 via-white to-blue-100 py-24 text-center">
//         <h1 className="text-5xl font-extrabold text-purple-700 mb-6">
//           Master Python Programming
//         </h1>
//         <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
//           Learn Python from basics to advanced AI and Data Science applications. Hands-on projects, real-world examples, and clear explanations to make you job-ready.
//         </p>
//         {!isLoggedIn && (
//           <Link
//             to="/login"
//             className="inline-block px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition duration-300"
//           >
//             Login to Unlock Courses
//           </Link>
//         )}
//         <div className="absolute top-0 left-0 w-40 h-40 bg-purple-200 rounded-full opacity-30 -translate-x-20 -translate-y-20"></div>
//         <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-200 rounded-full opacity-20 translate-x-32 translate-y-32"></div>
//       </section>

      // {/* Benefits Section */}
      // <section className="max-w-6xl mx-auto px-6 py-16">
      //   <h2 className="text-3xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
      //     Why Choose Our Courses
      //   </h2>
      //  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      //     {benefits.map((item, idx) => (
      //       <div
      //         key={idx}
      //         className="relative p-8 rounded-3xl text-white shadow-lg transform hover:-translate-y-3 hover:scale-105 transition duration-500 bg-gradient-to-br from-purple-500 to-indigo-500"
      //       >
      //         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-purple-600 font-bold text-xl">
      //           {idx + 1}
      //         </div>
      //         <p className="text-lg font-semibold text-center">{item}</p>
      //         <div className="absolute -top-5 -right-5 w-16 h-16 bg-white opacity-20 rounded-full"></div>
      //         <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white opacity-20 rounded-full"></div>
      //       </div>
      //     ))}
      //   </div>
      // </section>


      
//       {/* Search Section (Only Logged In) */}
//       {isLoggedIn && (
//         <section className="max-w-6xl mx-auto px-6 py-10">
//           <input
//             type="text"
//             placeholder="Search Courses..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full p-3 border rounded-xl shadow focus:ring focus:ring-purple-300"
//           />
//         </section>
//       )}


//       {/* Course Cards Section */}
//       {isLoggedIn && (
//         <section className="max-w-6xl mx-auto px-6 py-16">
//           <h2 className="text-4xl font-bold text-center mb-12 text-indigo-600">
//             Python Courses
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {finalCourseList.map((course) => {
//               const isEnrolled = enrolledCourses.some((c) => c.id === course.id);
//               const progress =
//                 courseProgress[course.id]?.progress || 0;

//               return (
//                 <div
//                   key={course.id}
//                   className={`bg-white rounded-3xl p-8 shadow-xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border-t-4 border-${course.color}-500`}
//                 >
//                   <h3 className={`text-2xl font-bold text-${course.color}-700 mb-4`}>
//                     {course.title}
//                   </h3>
//                   <p className="text-gray-600 mb-6">{course.description}</p>


//                   {/* Show Progress */}
//                   {isEnrolled && (
//                     <p className="mb-4 font-semibold text-green-600">
//                       Progress: {progress}%
//                     </p>
//                   )}

//                   {/* BUTTON LOGIC UPDATED */}
//                   {!isEnrolled ? (
//                     <button
//                       onClick={() => handleEnroll(course)}
//                       className={`px-5 py-2 bg-${course.color}-500 text-black font-semibold rounded-lg shadow hover:bg-${course.color}-600 transition duration-300`}
//                     >
//                       {activeCourse === course.id ? "Enrolled..." : "Enroll"}
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => navigate(course.link)}
//                       className={`px-5 py-2 bg-${course.color}-600 text-black font-semibold rounded-lg shadow hover:bg-${course.color}-700 transition duration-300`}
//                     >
//                       Open Course to Complete
//                     </button>
//                   )}
//                 </div>
//               );
//             })}



//             {/* Explore More Box */}
//             {search.trim() === "" && !showMore && courses.length > 9 && (
//               <div
//                 onClick={() => setShowMore(true)}
//                 className="cursor-pointer bg-white border-2 border-purple-400 border-dashed rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center hover:bg-purple-50 transition"
//               >
//                 <div className="text-5xl mb-3">➡️</div>
//                 <h3 className="text-xl font-semibold text-purple-700">
//                   Explore More Courses
//                 </h3>
//               </div>
//             )}





//           </div>
//         </section>
//       )}

//       {/* Footer CTA Section */}
//       <section className="relative bg-gradient-to-r from-purple-400 via-purple-200 to-blue-300 py-20 text-center overflow-hidden">
//         <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 rounded-full opacity-30"></div>
//         <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-200 rounded-full opacity-20"></div>

//         <h3 className="text-4xl font-extrabold text-purple-900 mb-4">
//           Ready to Level Up Your Python Skills?
//         </h3>
//         <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
//           Join thousands of learners and start building real projects today. 
//           Unlock the full potential of Python for AI, Data Science, and web development.
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center gap-6">
//           {!isLoggedIn && (
//             <Link
//               to="/login"
//               className="px-6 py-3 bg-purple-600 text-black font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
//             >
//               Login to Get Started
//             </Link>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Course;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Course = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  const [popupMessage, setPopupMessage] = useState("");
  const [activeCourse, setActiveCourse] = useState(null);
  const [search, setSearch] = useState("");
  const [showMore, setShowMore] = useState(false);

  const userId = localStorage.getItem("userId") || "guest";

  // 🟣 Load course progress into React State
  const [progressState, setProgressState] = useState(
    JSON.parse(localStorage.getItem(`courseProgress_${userId}`)) || {}
  );

  const enrolledCourses =
    JSON.parse(localStorage.getItem(`enrolledCourses_${userId}`)) || [];

  // const creatorCourses =
  //   JSON.parse(localStorage.getItem(`creatorCourses_${userId}`)) || [];
   const creatorCourses = Object.keys(localStorage)
  .filter((key) => key.startsWith("creatorCourses_"))
  .flatMap((key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  });



  // Default courses
  const defaultCourses = [
    {
      id: 1,
      title: "Python Fundamentals",
      color: "purple",
      description:
        "Learn the building blocks of Python with hands-on exercises and clear explanations.",
      link: "/Course/Python-1",
    },
    {
      id: 2,
      title: "Object-Oriented Programming (OOP)",
      color: "green",
      description:
        "Master OOP in Python to write reusable and organized code for real-world applications.",
      link: "/Course/Python-2",
    },
    {
      id: 3,
      title: "Python for AI & Data Science",
      color: "blue",
      description:
        "Apply Python to analyze data, build machine learning models, and work on AI projects.",
      link: "/Course/Python-3",
    },
  ];

  const courses = [...defaultCourses, ...creatorCourses];

  const benefits = [
    "Hands-on projects for every topic",
    "Learn at your own pace",
    "Real-world examples included",
    "Step-by-step explanations",
  ];

  // --------------------- ENROLL -------------------------
  const handleEnroll = (course) => {
    setActiveCourse(course.id);

    const updated = [
      ...enrolledCourses,
      {
        id: course.id || course._id,
        title: course.title,
        description: course.description,
        link: course.link,
        color: course.color || "purple",
      },
    ];

    localStorage.setItem(`enrolledCourses_${userId}`, JSON.stringify(updated));

    setPopupMessage("Course added successfully!");

    setTimeout(() => {
      setPopupMessage("");
      setActiveCourse(null);
    }, 3000);
  };

  // -------------------- SEARCH -----------------------
  let searchResults = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  let finalCourseList =
    search.trim() === ""
      ? showMore
        ? courses
        : courses.slice(0, 9)
      : [...searchResults];

  useEffect(() => {
    if (search.trim() !== "" && searchResults.length === 0) {
      setPopupMessage("No course found");
      setTimeout(() => setPopupMessage(""), 2000);
    }
  }, [search]);

  // ------------------- TIMER PROGRESS -----------------
  useEffect(() => {
    const timerData = JSON.parse(
      localStorage.getItem(`activeCourseTimer_${userId}`)
    );
    if (!timerData) return;

    const { courseId, timerStart } = timerData;

    const interval = setInterval(() => {
      let now = Date.now();
      let timeSpent = Math.floor((now - timerStart) / 1000);
      if (timeSpent > 1800) timeSpent = 1800;

      let progress = Math.floor((timeSpent / 1800) * 100);

      const updated = {
        ...progressState,
        [courseId]: { timeSpent, progress },
      };

      localStorage.setItem(
        `courseProgress_${userId}`,
        JSON.stringify(updated)
      );
      setProgressState(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [userId, progressState]);

  // ------------------- START COURSE -------------------
  const startCourseTracking = (course) => {
    const timerStart = Date.now();

    localStorage.setItem(
      `activeCourseTimer_${userId}`,
      JSON.stringify({ courseId: course.id, timerStart })
    );

    navigate(course.link);
  };

  return (
    <div className="bg-gray-50">
      {popupMessage && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse z-50">
          {popupMessage}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-100 via-white to-blue-100 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-6">
          Master Python Programming
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Learn Python from basics to advanced AI and Data Science.
        </p>

        {!isLoggedIn && (
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition duration-300"
          >
            Login to Unlock Courses
          </Link>
        )}
      </section>


            {/* Benefits Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Why Choose Our Courses
        </h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-3xl text-white shadow-lg transform hover:-translate-y-3 hover:scale-105 transition duration-500 bg-gradient-to-br from-purple-500 to-indigo-500"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-purple-600 font-bold text-xl">
                {idx + 1}
              </div>
              <p className="text-lg font-semibold text-center">{item}</p>
              <div className="absolute -top-5 -right-5 w-16 h-16 bg-white opacity-20 rounded-full"></div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white opacity-20 rounded-full"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Search */}
      {isLoggedIn && (
        <section className="max-w-6xl mx-auto px-6 py-10">
          <input
            type="text"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded-xl shadow focus:ring focus:ring-purple-300"
          />
        </section>
      )}

      {/* Course Cards */}
      {isLoggedIn && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-indigo-600">
            Python Courses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {finalCourseList.map((course) => {
              const isEnrolled = enrolledCourses.some(
                (c) => c.id === course.id
              );

              const progress =
                progressState[course.id]?.progress || 0;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl p-8 shadow-xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500"
                >
                  <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 mb-6">{course.description}</p>

                  {/* Show progress */}
                  {isEnrolled && (
                    <p className="mb-4 font-semibold text-green-600">
                      Progress: {progress}%
                    </p>
                  )}

                  {!isEnrolled ? (
                    <button
                      onClick={() => handleEnroll(course)}
                      className="px-5 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition duration-300"
                    >
                      {activeCourse === course.id ? "Enrolling..." : "Enroll"}
                    </button>
                  ) : (
                    // <button
                    //   // onClick={() => startCourseTracking(course)}
                    //   onClick={() => {
                    //    startCourseTracking(course);
                    //    if (course.assignmentPdfPath) {
                    //     window.open(course.assignmentPdfPath, "_blank");
                    //       }
                    //    }}
                    //   className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300"
                    // >
                    <button
  onClick={() => {
    startCourseTracking(course);

    if (course.assignmentPdfPath) {
      window.open(course.assignmentPdfPath, "_blank", "noopener,noreferrer");
    } else {
      alert("No PDF attached to this course");
    }
  }}
  className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300"
>

                      Continue Course
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Course;
