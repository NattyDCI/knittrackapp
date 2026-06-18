import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


import { MainContext } from "../Context";
import { counter_addordelete, logoImg, soundUrlReset } from "../assets";
import { getProjectImage } from "../utils/projectImages";

function playSound(url) {
  const audio = new Audio(url);
  audio.currentTime = 0;
  audio.volume = 1;
  audio.play().catch((error) => console.log("Sound failed:", error));
}

function calculateProgress(project) {
  if (!project.milestones?.length) return 0;
  const completed = project.milestones.filter((m) => m.done).length;
  return Math.round((completed / project.milestones.length) * 100);
}

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { projects, setProjects } = useContext(MainContext);

  const [newProjectName, setNewProjectName] = useState("");

  const firstFourProjects = projects.slice(0, 4);

  function createProject() {
    const name = newProjectName.trim();
    if (!name) return;

    playSound(counter_addordelete);

    const newProject = {
      id: crypto.randomUUID(),
      name,
      image: getProjectImage(name),
      rows: 0,
      timeSpent: 0,
      milestones: [],
    };

    setProjects([newProject, ...projects]);
    setNewProjectName("");
  }

  function deleteProject(projectId) {
    playSound(soundUrlReset);
    setProjects(projects.filter((project) => project.id !== projectId));
  }

  return (
    <section className="min-h-screen bg-[#f4f1ee] flex justify-center px-4 py-6">
      <div className="w-full max-w-[430px] bg-white rounded-[32px] overflow-hidden pb-24">
        <div className="px-6 pt-8">
          <header className="flex items-start justify-between mb-8">
            <div>
              <img src={logoImg} alt="KnitTrack" className="w-28 mb-1" />
              <p className="text-xl">Hello Joanna,</p>
            </div>

            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full bg-[#f4f1ee]">
                🔔
              </button>
              <div className="w-12 h-12 rounded-full bg-[#d8b4fe]" />
            </div>
          </header>

          <div className="flex items-center gap-2 text-sm mb-8">
            <button onClick={() => navigate("/")}>Home</button>
            <span>›</span>
            <strong>Projects</strong>
          </div>

          <h1 className="text-2xl mb-4">Feel like starting a new project?</h1>

          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project Name..."
            className="w-full bg-[#e8bfdc] border border-[#6f5b5c] rounded px-4 py-4 text-lg mb-3"
          />

          <div className="flex justify-end mb-10">
            <button
              onClick={createProject}
              className="border border-black rounded-lg px-4 py-3 font-semibold"
            >
              + New Project
            </button>
          </div>

          <div className="flex items-end justify-between mb-5">
            <h2 className="text-2xl">What you have been working on...</h2>
            <button className="text-sm">ALL WIPS →</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {firstFourProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="relative bg-[#d8cfcf] rounded-lg overflow-hidden cursor-pointer"
              >
                <button
                  aria-label="Delete project"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteProject(project.id);
                  }}
                  className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-[#6f5b5c] text-white"
                >
                  ×
                </button>

                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-28 object-cover"
                />

                <div className="p-2">
                  <p>{project.name}</p>

                  <div className="flex items-center justify-between">
                    <p>Status</p>

                    <div className="bg-[#7a5f62] text-white rounded-full px-3 py-2 text-sm">
                      {calculateProgress(project)}%
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!projects.length && (
            <p className="text-center mt-8 text-gray-500">
              No projects yet. Create your first one.
            </p>
          )}
        </div>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#c7b4bf] rounded-t-[28px] px-8 py-5 flex justify-between text-4xl">
          <button onClick={() => navigate("/")}>⌂</button>
          <button className="text-pink-500">▣</button>
          <button>☰</button>
          <button>⚙</button>
        </nav>
      </div>
    </section>
  );
}