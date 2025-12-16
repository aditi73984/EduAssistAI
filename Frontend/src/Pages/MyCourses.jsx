// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const MyCourses = () => {


//   const userId = localStorage.getItem("userId") || "guest";
// //const role = localStorage.getItem("role");

//   const enrolledCourses =
//     JSON.parse(localStorage.getItem(`enrolledCourses_${userId}`)) || [];

//     const creatorCourses =
// JSON.parse(localStorage.getItem(`creatorCourses_${userId}`)) || [];


//   const courseProgress =
//     JSON.parse(localStorage.getItem(`courseProgress_${userId}`)) || {};

//   const [completedCourses, setCompletedCourses] = useState([]);

//   const deleteCourse = async (id) => {
//   const res = await fetch(`http://localhost:5001/api/courses/${id}`, {
//     method: "DELETE",
//   });

//   const data = await res.json();

//   if (data.success) {
//     const updated = creatorCourses.filter((c) => c._id !== id);
//     localStorage.setItem("creatorCourses", JSON.stringify(updated));
//     alert("Deleted!");
//     window.location.reload();
//   }
// };

// const role = localStorage.getItem("role"); // "creator" or "student"



//   useEffect(() => {
//     const completed = enrolledCourses.filter((course) => {
//       const progress = courseProgress[course.id]?.progress || 0;
//       return progress === 100;
//     });
//     setCompletedCourses(completed);
//   }, [enrolledCourses, courseProgress]);

//   return (
//     <div className="px-6 py-10 max-w-6xl mx-auto">
//       <h1 className="text-4xl font-bold text-indigo-700 mb-10">
//         📘 My Courses
//       </h1>

//       {/* ------------------ ENROLLED COURSES ------------------ */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-bold text-purple-600 mb-5">
//           Enrolled Courses
//         </h2>

//         {enrolledCourses.length === 0 ? (
//           <p className="text-gray-600">No enrolled courses yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {enrolledCourses.map((course) => {
//               const progress = courseProgress[course.id]?.progress || 0;

//               return (
//                 <div
//                   key={course.id}
//                   className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-200"
//                 >
//                   <h3 className="text-xl font-bold text-indigo-700">
//                     {course.title}
//                   </h3>

//                   <p className="text-gray-600 mt-2">{course.description}</p>

//                   {/* PROGRESS BAR */}
//                   <div className="mt-4">
//                     <div className="w-full bg-gray-200 rounded-full h-3">
//                       <div
//                         className="bg-purple-600 h-3 rounded-full"
//                         style={{ width: `${progress}%` }}
//                       ></div>
//                     </div>
//                     <p className="mt-1 text-sm font-semibold text-purple-700">
//                       {progress}% Completed
//                     </p>
//                   </div>

//                   {/* OPEN COURSE BUTTON */}
//                   <Link
//                     to={course.link}
//                     className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
//                   >
//                     Continue Course
//                   </Link>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       {/* ------------------ COMPLETED COURSES ------------------ */}
//       <section className="mb-20">
//         <h2 className="text-2xl font-bold text-green-600 mb-5">
//           Completed Courses ✔️
//         </h2>

//         {completedCourses.length === 0 ? (
//           <p className="text-gray-600">No completed courses yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {completedCourses.map((course) => (
//               <div
//                 key={course.id}
//                 className="bg-green-50 p-6 rounded-2xl shadow border border-green-200"
//               >
//                 <h3 className="text-xl font-bold text-green-700">
//                   {course.title}
//                 </h3>

//                 <p className="text-gray-700 mt-2">{course.description}</p>

//                 <p className="mt-3 font-semibold text-green-700">
//                   🎉 Course Fully Completed (100%)
//                 </p>

//                 <Link
//                   to={course.link}
//                   className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
//                 >
//                   Revisit Course
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

      
//       {/* <section className="mb-20">
//         <h2 className="text-2xl font-bold text-gray-600 mb-5">
//            Added Courses(Creator only)
//         </h2>
//         {creatorCourses.length === 0 ? (
//           <p>No added courses yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {creatorCourses.map((course) => (
//               <div
//                 key={course._id}
//                 className="bg-white p-6 rounded-2xl shadow border"
//               >
//                 <h3 className="text-xl font-bold">{course.title}</h3>
//                 <p className="text-gray-600">{course.description}</p>

//                 <a
//                   href={course.assignmentPdfPath}
//                   className="text-blue-600 underline mt-2 inline-block"
//                   target="_blank"
//                 >
//                   Open Assignment PDF
//                 </a>

//                 <button
//                   className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
//                   onClick={() => deleteCourse(course._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//         </section> */}

//         {/* ------------------ ADDED COURSES (Only Creator) ------------------ */}
// {role === "creator" && (
//   <section className="mb-20">
//     <h2 className="text-2xl font-bold text-gray-600 mb-5">
//       Added Courses
//     </h2>

//     {creatorCourses.length === 0 ? (
//       <p className="text-gray-600">No courses added yet.</p>
//     ) : (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {creatorCourses.map((course) => (
//           <div
//             key={course._id}
//             className="bg-white p-6 rounded-2xl shadow border border-gray-200"
//           >
//             <h3 className="text-xl font-bold text-indigo-700">
//               {course.title}
//             </h3>

//             <p className="text-gray-600 mt-2">{course.description}</p>

//             <a
//               href={course.link}
//               className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
//             >
//               Open Course
//             </a>
//             <button
//                   className="mt-4 ml-0.5 px-4 py-2 bg-red-600 text-white rounded"
//                   onClick={() => deleteCourse(course._id)}
//                 >
//                   Delete
//                 </button>
//           </div>
//         ))}
//       </div>
//     )}
//   </section>
// )}



//       {/* EXPLORE MORE BUTTON */}
//       <div className="text-center mt-10">
//         <Link
//           to="/courses"
//           className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl shadow hover:bg-purple-600 transition"
//         >
//           Explore More Courses →
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default MyCourses;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const userId = localStorage.getItem("userId") || "guest";
  const role = localStorage.getItem("role");

  const enrolledCourses =
    JSON.parse(localStorage.getItem(`enrolledCourses_${userId}`)) || [];

  // const creatorCourses =
  //   JSON.parse(localStorage.getItem(`creatorCourses_${userId}`)) || [];

   const creatorId = localStorage.getItem("creatorId");

const creatorCourses =
  JSON.parse(localStorage.getItem(`creatorCourses_${creatorId}`)) || [];


  // 🟣 Course progress state
  const [courseProgressState, setCourseProgressState] = useState(
    JSON.parse(localStorage.getItem(`courseProgress_${userId}`)) || {}
  );

  const [completedCourses, setCompletedCourses] = useState([]);

  // 🔥 Sync live progress every 1 sec
  useEffect(() => {
    const interval = setInterval(() => {
      const updated =
        JSON.parse(localStorage.getItem(`courseProgress_${userId}`)) || {};
      setCourseProgressState(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Detect completed
  useEffect(() => {
    const completed = enrolledCourses.filter((course) => {
      const progress = courseProgressState[course.id]?.progress || 0;
      return progress === 100;
    });
    setCompletedCourses(completed);
  }, [enrolledCourses, courseProgressState]);

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-indigo-700 mb-10">📘 My Courses</h1>

      {/* ENROLLED */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-purple-600 mb-5">
          Enrolled Courses
        </h2>

        {enrolledCourses.length === 0 ? (
          <p className="text-gray-600">No enrolled courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => {
              const progress =
                courseProgressState[course.id]?.progress || 0;

              return (
                <div
                  key={course.id}
                  className="bg-white p-6 rounded-2xl shadow border"
                >
                  <h3 className="text-xl font-bold text-indigo-700">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 mt-2">{course.description}</p>

                  {/* PROGRESS BAR */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-purple-600 h-3 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-purple-700">
                      {progress}% Completed
                    </p>
                  </div>

                  <Link
                    to={course.link}
                    className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                  >
                    Continue Course
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* COMPLETED */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-green-600 mb-5">
          Completed Courses ✔️
        </h2>

        {completedCourses.length === 0 ? (
          <p className="text-gray-600">No completed courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-green-50 p-6 rounded-2xl shadow border border-green-200"
              >
                <h3 className="text-xl font-bold text-green-700">
                  {course.title}
                </h3>

                <p className="text-gray-700 mt-2">{course.description}</p>

                <p className="mt-3 font-semibold text-green-700">
                  🎉 Course Fully Completed (100%)
                </p>

                <Link
                  to={course.link}
                  className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Revisit Course
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

              {/* ------------------ ADDED COURSES (Only Creator) ------------------ */}
{role === "creator" && (
  <section className="mb-20">
    <h2 className="text-2xl font-bold text-gray-600 mb-5">
      Added Courses
    </h2>

    {creatorCourses.length === 0 ? (
      <p className="text-gray-600">No courses added yet.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {creatorCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-6 rounded-2xl shadow border border-gray-200"
          >
            <h3 className="text-xl font-bold text-indigo-700">
              {course.title}
            </h3>

            <p className="text-gray-600 mt-2">{course.description}</p>

            <a
              href={course.link}
              className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
            >
              Open Course
            </a>
            <button
                  className="mt-4 ml-0.5 px-4 py-2 bg-red-600 text-white rounded"
                  onClick={() => deleteCourse(course._id)}
                >
                  Delete
                </button>
          </div>
        ))}
      </div>
    )}
  </section>
)}


      {/* EXPLORE MORE */}
      <div className="text-center mt-10">
        <Link
          to="/course"
          className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl shadow hover:bg-purple-600 transition"
        >
          Explore More Courses →
        </Link>
      </div>
    </div>
  );
};

export default MyCourses;
