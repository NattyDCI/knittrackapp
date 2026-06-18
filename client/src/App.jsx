// import React, { useEffect, useRef, useState, useContext } from "react";
// import p5 from "p5";
// import { Haptics } from "@capacitor/haptics";
// import { MainContext } from "./Context";


// import "./style.css";

// import {
//   shawlImg,
//   scarf,
//   sweaterImg,
//   socksImg,
//   default_yarn,
//   runningGif,
//   logoImg,
//   cheers_finished_sound,
//   counter_addordelete,
//   soundUrlReset
// } from "./assets";



// const imageLibrary = {
//   shawl: shawlImg,
//   scarf: scarf,
//   sweater: sweaterImg,
//   socks: socksImg,
//   default: default_yarn,
// };

// function getProjectImage(projectName) {
//   const name = projectName.toLowerCase();

//   if (name.includes("shawl")) return imageLibrary.shawl;
//   if (name.includes("scarf")) return imageLibrary.scarf;
//   if (name.includes("sweater")) return imageLibrary.sweater;
//   if (name.includes("socks")) return imageLibrary.socks;

//   return imageLibrary.default;
// }

// function formatTime(totalSeconds) {
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//     2,
//     "0",
//   )}:${String(seconds).padStart(2, "0")}`;
// }

// function calculateProgress(project) {
//   if (!project.milestones.length) return 0;

//   const completed = project.milestones.filter((m) => m.done).length;
//   return Math.round((completed / project.milestones.length) * 100);
// }

// function playSound(url) {
//   const audio = new Audio(url);
//   audio.currentTime = 0;
//   audio.volume = 1;
//   audio.play().catch((error) => console.log("Sound failed:", error));
// }

// async function triggerHaptic() {
//   try {
//     await Haptics.vibrate({ duration: 500 });
//   } catch (error) {
//     console.log("Haptics error:", error);
//   }
// }

// export default function App() {


//   const { STORAGE_KEY} =
//     useContext(MainContext);

//   const [patternSearch, setPatternSearch] = useState("");
//   const [patterns, setPatterns] = useState([]);

//   async function searchRavelryPatterns() {
//     const response = await fetch(
//       `http://localhost:3001/api/ravelry/patterns?q=${encodeURIComponent(
//         patternSearch,
//       )}`,
//     );

//     const data = await response.json();
//     setPatterns(data.patterns || []);
//   }


//   const [projects, setProjects] = useState(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [currentProjectId, setCurrentProjectId] = useState(null);
//   const [screen, setScreen] = useState("home");
//   const [newProjectName, setNewProjectName] = useState("");
//   const [milestoneText, setMilestoneText] = useState("");
//   const [timerModalOpen, setTimerModalOpen] = useState(false);
//   const [timerRunning, setTimerRunning] = useState(false);

//   const timerRef = useRef(null);
//   const lastTimerUpdateRef = useRef(null);
//   const p5Ref = useRef(null);

//   const currentProject = projects.find((p) => p.id === currentProjectId);

//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
//   }, [projects]);

//   useEffect(() => {
//     if (!timerRunning || !currentProjectId) return;

//     lastTimerUpdateRef.current = Date.now();

//     timerRef.current = setInterval(() => {
//       const now = Date.now();
//       const diff = Math.floor((now - lastTimerUpdateRef.current) / 1000);

//       if (diff > 0) {
//         lastTimerUpdateRef.current = now;

//         setProjects((prevProjects) =>
//           prevProjects.map((project) =>
//             project.id === currentProjectId
//               ? { ...project, timeSpent: project.timeSpent + diff }
//               : project,
//           ),
//         );
//       }
//     }, 1000);

//     return () => clearInterval(timerRef.current);
//   }, [timerRunning, currentProjectId]);

//   useEffect(() => {
//   if (screen !== "celebration") return;
//   if (!p5Ref.current) return;

//   const sketch = (p) => {
//     let yarns = [];

//     p.setup = () => {
//       p.createCanvas(320, 320);

//       for (let i = 0; i < 25; i++) {
//         yarns.push({
//           x: p.random(p.width),
//           y: p.random(-300, 0),
//           speed: p.random(1, 3),
//           size: p.random(24, 38),
//           rotation: p.random(-0.5, 0.5),
//           spin: p.random(-0.015, 0.015),
//           color: p.random([
//             "#14b5e8",
//             "#705d5d",
//             "#d9a7a7",
//             "#f0c7b7",
//             "#c9a66b",
//             "#8f6f5e",
//           ]),
//         });
//       }
//     };

//     function drawYarnSkein(x, y, size, rotation, yarnColor) {
//       p.push();
//       p.translate(x, y);
//       p.rotate(rotation);

//       const w = size * 1.15;
//       const h = size * 1.8;

//       p.noStroke();
//       p.fill(yarnColor);
//       p.ellipse(0, -h * 0.22, w, h * 0.75);
//       p.ellipse(0, h * 0.22, w, h * 0.75);

//       p.fill("#e6e3df");
//       p.stroke("#1f1f1f");
//       p.strokeWeight(1.5);
//       p.beginShape();
//       p.vertex(-w * 0.48, -h * 0.22);
//       p.vertex(w * 0.48, -h * 0.22);
//       p.vertex(w * 0.48, h * 0.22);
//       p.vertex(-w * 0.48, h * 0.22);
//       p.endShape(p.CLOSE);

//       p.noFill();
//       p.stroke("#1f1f1f");
//       p.strokeWeight(1.4);

//       p.arc(-w * 0.18, -h * 0.35, w * 0.55, h * 0.45, -1.2, 0.15);
//       p.arc(0, -h * 0.28, w * 0.45, h * 0.38, 2.7, 3.8);
//       p.arc(-w * 0.12, h * 0.33, w * 0.58, h * 0.42, 1.4, 2.9);
//       p.arc(w * 0.05, h * 0.28, w * 0.65, h * 0.5, 1.6, 3.1);

//       p.line(w * 0.22, h * 0.03, w * 0.2, h * 0.17);
//       p.line(w * 0.3, h * 0.05, w * 0.27, h * 0.2);

//       p.pop();
//     }

//     p.draw = () => {
//       p.background(250, 240, 230);

//       yarns.forEach((yarn) => {
//         drawYarnSkein(
//           yarn.x,
//           yarn.y,
//           yarn.size,
//           yarn.rotation,
//           yarn.color,
//         );

//         yarn.y += yarn.speed;
//         yarn.rotation += yarn.spin;

//         if (yarn.y > p.height + 60) {
//           yarn.y = p.random(-120, 0);
//           yarn.x = p.random(p.width);
//         }
//       });
//     };
//   };

//   const instance = new p5(sketch, p5Ref.current);

//   return () => {
//     instance.remove();
//   };
// }, [screen]);



//   function createProject() {
//     const name = newProjectName.trim();
//     if (!name) return;

//     playSound(counter_addordelete);

//     const newProject = {
//       id: crypto.randomUUID(),
//       name,
//       image: getProjectImage(name),
//       rows: 0,
//       timeSpent: 0,
//       milestones: [],
//     };

//     setProjects([...projects, newProject]);
//     setNewProjectName("");
//     setScreen("home");
//   }

//   function deleteProject(projectId) {
//     playSound(soundUrlReset);
//     triggerHaptic();

//     setProjects(projects.filter((p) => p.id !== projectId));

//     if (currentProjectId === projectId) {
//       setCurrentProjectId(null);
//       setTimerRunning(false);
//     }
//   }

//   function openProject(projectId) {
//     setCurrentProjectId(projectId);
//     setScreen("project");
//   }

//   function increaseRow() {
//     if (!currentProject) return;

//     playSound(counter_addordelete);
//     triggerHaptic();

//     setProjects(
//       projects.map((project) =>
//         project.id === currentProject.id
//           ? { ...project, rows: project.rows + 1 }
//           : project,
//       ),
//     );
//   }

//   function decreaseRow() {
//     if (!currentProject) return;

//     playSound(counter_addordelete);
//     triggerHaptic();

//     setProjects(
//       projects.map((project) =>
//         project.id === currentProject.id
//           ? { ...project, rows: Math.max(0, project.rows - 1) }
//           : project,
//       ),
//     );
//   }

//   function addMilestone() {
//     const text = milestoneText.trim();
//     if (!currentProject || !text) return;

//     playSound(counter_addordelete);

//     setProjects(
//       projects.map((project) =>
//         project.id === currentProject.id
//           ? {
//               ...project,
//               milestones: [...project.milestones, { text, done: false }],
//             }
//           : project,
//       ),
//     );

//     setMilestoneText("");
//   }

//   function toggleMilestone(index) {
//     if (!currentProject) return;

//     const milestone = currentProject.milestones[index];
//     const willBeDone = !milestone.done;

//     setProjects(
//       projects.map((project) =>
//         project.id === currentProject.id
//           ? {
//               ...project,
//               milestones: project.milestones.map((m, i) =>
//                 i === index ? { ...m, done: willBeDone } : m,
//               ),
//             }
//           : project,
//       ),
//     );

//     if (willBeDone) {
//       triggerHaptic();
//       playSound(cheers_finished_sound);
//       setScreen("celebration");
//     }
//   }

//   function deleteMilestone(index) {
//     if (!currentProject) return;

//     playSound(soundUrlReset);

//     setProjects(
//       projects.map((project) =>
//         project.id === currentProject.id
//           ? {
//               ...project,
//               milestones: project.milestones.filter((_, i) => i !== index),
//             }
//           : project,
//       ),
//     );
//   }

//   function resetTimer() {
//     if (!currentProject) return;

//     playSound(soundUrlReset);
//     setTimerRunning(false);

//     setProjects(
//       projects.map((project) =>
//         project.id === currentProject.id
//           ? { ...project, timeSpent: 0 }
//           : project,
//       ),
//     );
//   }

//   function goHome() {
//     setTimerRunning(false);
//     setTimerModalOpen(false);
//     setScreen("home");
//   }

//   return (
//   <main id="app">
//     {screen === "home" && (
//       <section id="homeScreen" className="screen active">
//         <img src={logoImg} alt="KnitTrack" className="app-logo" />
//         <p className="subtitle">Track your knitting projects</p>

//         <input
//   value={patternSearch}
//   onChange={(e) => setPatternSearch(e.target.value)}
//   placeholder="Search patterns: scarf, socks, sweater..."
// />

// <button onClick={searchRavelryPatterns}>
//   Search Ravelry
// </button>

// <ul>
//   {patterns.map((pattern) => (
    
//     <li key={pattern.id}>
//       {console.log(pattern, "this is the object")}
//       <span>{pattern.name}</span>
//       <span>{pattern.designer?.name}</span>
//       <img src={pattern.first_photo.small_url} />
//     </li>
//   ))}
// </ul>

//         <button
//           id="showNewProjectBtn"
//           className="main-btn"
//           onClick={() => setScreen("newProject")}
//         >
//           New Project
//         </button>

//         <div id="projectsGrid">
//           {projects.map((project) => (
//             <article
//               key={project.id}
//               className="project-card"
//               onClick={() => openProject(project.id)}
//             >
//               <button
//                 className="delete-project-btn"
//                 aria-label="Delete project"
//                 onClick={(event) => {
//                   event.stopPropagation();
//                   deleteProject(project.id);
//                 }}
//               >
//                 ×
//               </button>

//               <img
//                 src={project.image}
//                 alt={project.name}
//                 className="project-image"
//               />

//               <div className="card-content">
//                 <p className="project-name">{project.name}</p>

//                 <div className="stats-line">
//                   <p className="status-title">Status</p>
//                   <div className="progress-pill">
//                     {calculateProgress(project)}%
//                   </div>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>
//     )}

//     {screen === "newProject" && (
//       <section id="newProjectScreen" className="screen active">
//         <button
//           id="cancelNewProjectBtn"
//           className="back-btn"
//           onClick={() => setScreen("home")}
//         >
//           ← Back
//         </button>

//         <h1>New Project</h1>
//         <p className="subtitle">Start something cozy</p>

//         <input
//           id="projectNameInput"
//           value={newProjectName}
//           onChange={(e) => setNewProjectName(e.target.value)}
//           placeholder="Project name"
//         />

//         <button
//           id="createProjectBtn"
//           className="main-btn"
//           onClick={createProject}
//         >
//           Create Project
//         </button>
//       </section>
//     )}

//     {screen === "project" && currentProject && (
//       <section id="projectScreen" className="screen active">
//         <button id="backHomeBtn" className="back-btn" onClick={goHome}>
//           ← Back
//         </button>

//         <h1 id="projectTitle">{currentProject.name}</h1>

//         <div id="projectImage">
//           <img
//             src={currentProject.image}
//             alt={currentProject.name}
//             className="project-detail-image"
//           />
//         </div>

//         <p id="progressText">
//           {calculateProgress(currentProject)}% project complete
//         </p>

//         <p id="timeInvestedText">
//           {formatTime(currentProject.timeSpent)}
//         </p>

//         <div className="counter">
//           <button id="decreaseRowBtn" onClick={decreaseRow}>
//             −
//           </button>

//           <span id="rowCount">{currentProject.rows}</span>

//           <button id="increaseRowBtn" onClick={increaseRow}>
//             +
//           </button>
//         </div>

//         <div className="add-row">
//           <input
//             id="milestoneInput"
//             value={milestoneText}
//             onChange={(e) => setMilestoneText(e.target.value)}
//             placeholder="New milestone"
//           />

//           <button id="addMilestoneBtn" onClick={addMilestone}>
//             Add
//           </button>
//         </div>

//         <ul id="milestonesList">
//           {currentProject.milestones.map((milestone, index) => (
//             <li
//               key={`${milestone.text}-${index}`}
//               className={milestone.done ? "done" : ""}
//             >
//               <input
//                 type="checkbox"
//                 checked={milestone.done}
//                 onChange={() => toggleMilestone(index)}
//               />

//               <span>{milestone.text}</span>

//               <button onClick={() => deleteMilestone(index)}>×</button>
//             </li>
//           ))}
//         </ul>

//         <button
//           id="openTimerModalBtn"
//           className="main-btn"
//           onClick={() => setTimerModalOpen(true)}
//         >
//           Open Timer
//         </button>

//         <div
//           id="timerModal"
//           className={timerModalOpen ? "modal" : "modal hidden"}
//         >
//           <div
//             className="modal-backdrop"
//             onClick={() => setTimerModalOpen(false)}
//           />

//           <div className="timer-modal-card">
//             <div className="back-btn-container">

//               <button
//                 id="modalCloseTimerBtn"
//                 className="back-btn"
//                 onClick={() => setTimerModalOpen(false)}
//                 >
//                 x
//               </button>
//             </div>

//             <h2>Time spent on this knit</h2>

//             <p id="modalTimerText">
//               {formatTime(currentProject.timeSpent)}
//             </p>

//             <div className="timer-visual-slot">
//               {timerRunning ? (
//                 <img
//                   id="timerRunningImage"
//                   src={runningGif}
//                   alt="Running sheep"
//                   className="timer-running-image"
//                 />
//               ) : (
//                 <p id="timerIdleText" className="timer-idle-text">
//                   Start the timer while you knit
//                 </p>
//               )}
//             </div>

//             <div className="timer-buttons">
//               <button
//                 id="modalStartTimerBtn"
//                 onClick={() => {
//                   playSound(counter_addordelete);
//                   setTimerRunning(!timerRunning);
//                 }}
//               >
//                 {timerRunning ? "Pause" : "Start"}
//               </button>

//               <button id="modalResetTimerBtn" onClick={resetTimer}>
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     )}

//     {screen === "celebration" && (
//       <section id="celebrationScreen" className="screen active">
//         <h1>Milestone completed!</h1>
//         <p className="subtitle">Great job!</p>

//         <div id="p5-container" ref={p5Ref}></div>

//         <button
//           id="closeCelebrationBtn"
//           className="main-btn"
//           onClick={() => setScreen("project")}
//         >
//           Continue
//         </button>
//       </section>
//     )}
//   </main>
// );
// }


import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <main id="app">
      <AppRoutes />
    </main>
  );
}