import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Haptics } from "@capacitor/haptics";
import CelebrationScreen from "./CelebrationScreen";

import { MainContext } from "../Context";

import {
  cheers_finished_sound,
  counter_addordelete,
  soundUrlReset,
  runningGif,
} from "../assets";

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;
}

function calculateProgress(project) {
  if (!project.milestones?.length) return 0;

  const completed = project.milestones.filter((m) => m.done).length;
  return Math.round((completed / project.milestones.length) * 100);
}

function playSound(url) {
  const audio = new Audio(url);
  audio.currentTime = 0;
  audio.volume = 1;
  audio.play().catch((error) => console.log("Sound failed:", error));
}

async function triggerHaptic() {
  try {
    await Haptics.vibrate({ duration: 500 });
  } catch (error) {
    console.log("Haptics error:", error);
  }
}

export default function ProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { projects, setProjects } = useContext(MainContext);

  const [milestoneText, setMilestoneText] = useState("");
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const timerRef = useRef(null);
  const lastTimerUpdateRef = useRef(null);

  const currentProject = projects.find((project) => project.id === projectId);

  useEffect(() => {
    if (!timerRunning || !currentProject) return;

    lastTimerUpdateRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((now - lastTimerUpdateRef.current) / 1000);

      if (diff > 0) {
        lastTimerUpdateRef.current = now;

        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectId
              ? { ...project, timeSpent: project.timeSpent + diff }
              : project,
          ),
        );
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timerRunning, currentProject, projectId, setProjects]);

  function increaseRow() {
    playSound(counter_addordelete);
    triggerHaptic();

    setProjects(
      projects.map((project) =>
        project.id === currentProject.id
          ? { ...project, rows: project.rows + 1 }
          : project,
      ),
    );
  }

  function decreaseRow() {
    playSound(counter_addordelete);
    triggerHaptic();

    setProjects(
      projects.map((project) =>
        project.id === currentProject.id
          ? { ...project, rows: Math.max(0, project.rows - 1) }
          : project,
      ),
    );
  }

  function addMilestone() {
    const text = milestoneText.trim();
    if (!text) return;

    playSound(counter_addordelete);

    setProjects(
      projects.map((project) =>
        project.id === currentProject.id
          ? {
              ...project,
              milestones: [...project.milestones, { text, done: false }],
            }
          : project,
      ),
    );

    setMilestoneText("");
  }

  function toggleMilestone(index) {
    const milestone = currentProject.milestones[index];
    const willBeDone = !milestone.done;

    setProjects(
      projects.map((project) =>
        project.id === currentProject.id
          ? {
              ...project,
              milestones: project.milestones.map((m, i) =>
                i === index ? { ...m, done: willBeDone } : m,
              ),
            }
          : project,
      ),
    );

    if (willBeDone) {
      triggerHaptic();
      playSound(cheers_finished_sound);
      setShowCelebration(true);
    }
  }

  function deleteMilestone(index) {
    playSound(soundUrlReset);

    setProjects(
      projects.map((project) =>
        project.id === currentProject.id
          ? {
              ...project,
              milestones: project.milestones.filter((_, i) => i !== index),
            }
          : project,
      ),
    );
  }

  function resetTimer() {
    playSound(soundUrlReset);
    setTimerRunning(false);

    setProjects(
      projects.map((project) =>
        project.id === currentProject.id
          ? { ...project, timeSpent: 0 }
          : project,
      ),
    );
  }
  if (!currentProject) {
    return (
      <section className="screen active">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h1>Project not found</h1>
      </section>
    );
  }

  if (showCelebration) {
    return <CelebrationScreen onClose={() => setShowCelebration(false)} />;
  }

  return (
    <section id="projectScreen" className="screen active">
      <button
        id="backHomeBtn"
        className="back-btn"
        onClick={() => {
          setTimerRunning(false);
          setTimerModalOpen(false);
          navigate("/");
        }}
      >
        ← Back
      </button>
      <p id="projectTitle" className="font-semibold text-secondary text-xl">
        Title
      </p>

      <h1 className="font-semibold text-2xl px-2">{currentProject.name}</h1>

      <div id="projectImage">
        <img
          src={currentProject.image}
          alt={currentProject.name}
          className="project-detail-image"
        />
      </div>
      <div className="flex justify-left pl-4 py-4 items-center flex-row leading-3 bg-light border border-accentLight rounded-4xl">
        <p className="text-primary text-lg pr-2 font-semibold"> Status: </p>
        <p
          id="progressText"
          className="bg-accentLight text-lg p-2 rounded-4xl text-accentPink font-semibold "
        >
          {calculateProgress(currentProject)}%{" "}
        </p>
        <p className="font-light pl-2 text-lg">Project complete</p>
      </div>
      <div className="flex justify-left pl-4 py-4 mt-4 items-center flex-row leading-3 bg-light border border-accentLight rounded-4xl">
        <p className="text-primary text-lg pr-2 font-semibold">
          {" "}
          Time Invested:{" "}
        </p>
        <p className="bg-accentLight text-lg p-2 rounded-4xl text-accentPink font-semibold ">
          {formatTime(currentProject.timeSpent)}{" "}
        </p>
        <p className="font-light pl-2 text-lg">Knitting time!</p>
      </div>

      <div className="counter flex flex-col w-full ">
        <p className="text-lg w-30">Row Counter</p>

        <div className="flex items-center text-accentLight">
          <button id="decreaseRowBtn" onClick={decreaseRow}>
            −
          </button>

          <span id="rowCount" className="text-accentPink">
            {currentProject.rows}
          </span>

          <button id="increaseRowBtn" onClick={increaseRow}>
            +
          </button>
        </div>
      </div>

      <div className="add-row bg-mainMauve rounded-4xl px-5 py-2">
        <input
          id="milestoneInput"
          value={milestoneText}
          className="placeholder-light"
          onChange={(e) => setMilestoneText(e.target.value)}
          placeholder="Add a new milestone..."
        />

        <button
          className="cursor-pointer rounded-4xl bg-secondary border-2 border-white hover:text-light text-white pb-5"
          id="addMilestoneBtn"
          onClick={addMilestone}
        >
          Add
        </button>
      </div>

      <ul id="milestonesList" className="mt-4">
        {currentProject.milestones.map((milestone, index) => (
          <li
            key={`${milestone.text}-${index}`}
            className={milestone.done ? "done" : ""}
          >
            <input
              className="pt-7"
              type="checkbox"
              checked={milestone.done}
              className="checked:bg-amber-300"
              onChange={() => toggleMilestone(index)}
            />

            <span>{milestone.text}</span>

            <button
              className="text-4xl text-primary cursor-pointer bg-secondary rounded-full h-10 w-10 flex justify-center items-center"
              onClick={() => deleteMilestone(index)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center justify-center">
        <p className="pt-3">Remember you can also track your time here!</p>

        <button
          id="openTimerModalBtn"
          className="main-btn text-2xl hover:text-light cursor-pointer bg-accentPink mt-4 text-accentLight rounded-3xl"
          onClick={() => setTimerModalOpen(true)}
        >
          Open Timer
        </button>
      </div>

      <div
        id="timerModal"
        className={timerModalOpen ? "modal" : "modal hidden"}
      >
        <div
          className="modal-backdrop"
          onClick={() => setTimerModalOpen(false)}
        />

        <div className="timer-modal-card flex text-center">
          <div className="flex justify-end h-15">
            <button
              id="modalCloseTimerBtn"
              className=" rounded-3xl text-2xl cursor-pointer text-accentPink hover:bg-mainMauve hover:text-light leading-2 bg-accentLight"
              onClick={() => setTimerModalOpen(false)}
            >
              x
            </button>
          </div>
          <div className="flex pb-4 pt-3 items-center justify-center">
            <h2>Time spent on this knit</h2>
          </div>

          <p
            id="modalTimerText"
            className="bg-accentPink rounded-3xl text-accentLight"
          >
            {formatTime(currentProject.timeSpent)}
          </p>

          <div className="timer-visual-slot">
            {timerRunning ? (
              <img
                id="timerRunningImage"
                src={runningGif}
                alt="Running sheep"
                className="timer-running-image"
              />
            ) : (
              <p
                id="timerIdleText"
                className=" text-md font-extrabold timer-idle-text"
              >
                Start the timer while you knit !
                <span className="text-sm inline-block w-fit  text-primary mt-4 font-regular bg-terciary rounded-2xl p-2 px-3">
                  {" "}
                  <span className="font-bold">Hint:</span> Close this modal and
                  the timer keeps going!
                </span>
              </p>
            )}
          </div>

          <div className="timer-buttons">
            <button
              id="modalStartTimerBtn"
              className="text-md bg-primary text-light hover:text-primary cursor-pointer hover:bg-mainMauve rounded-md"
              onClick={() => {
                playSound(counter_addordelete);
                setTimerRunning(!timerRunning);
              }}
            >
              {timerRunning ? "Pause" : "Start"}
            </button>

            <button
              id="modalResetTimerBtn"
              className=" border-2 border-primary text-primary hover:text-secondary hover:border-secondary cursor-pointer rounded-md"
              onClick={resetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
