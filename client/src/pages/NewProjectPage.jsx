import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscBellDot } from "react-icons/vsc";
import Navbar from "./components/Navbar.jsx";

import { MainContext } from "../Context";
import {
  counter_addordelete,
  soundUrlReset,
  logoImg,
  socksImg,
  shawlImg,
  sweaterImg,
  scarf,
} from "../assets";
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
    <section className="relative bg-[#f4f1ee] justify-center py-8 min-h-dvh overflow-y-auto pb-28">
      <div className="px-6 pt-8">
        <header className="flex items-start justify-between mb-8">
          <div>
            <img src={logoImg} alt="KnitTrack" className="w-28 mb-1" />
            <p className="text-xl">Hello Joanna,</p>
          </div>

          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-full bg-[#726a6a] flex items-center justify-center text-2xl">
              <VscBellDot color="white" />
            </button>

            <div className="w-14 h-14 rounded-full border-4 border-mainMauve ">
              <img
                src={socksImg}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
        </header>

        <div className="flex items-center text-sm mb-8">
          <button className="cursor-pointer" onClick={() => navigate("/")}>
            <p className="font-medium text-terciary text-xl">Home › </p>
          </button>

          <span className="font-regular text-primary text-xl">Projects</span>
        </div>

        <h1 className="font-light text-lg mb-4">
          Feel like starting a new project?
        </h1>

        <input
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Project Name..."
          className="w-full bg-mainMauve border border-[#6f5b5c] rounded px-4 py-4 text-lg mb-6 placeholder-terciary"
        />

        <div className="flex justify-end mt-4 mb-6">
          <button
            onClick={createProject}
            className="border bg-primary rounded-lg px-4 py-3 font-semibold text-light "
          >
            + New Project
          </button>
        </div>

        <div className="flex items-end justify-between mb-5">
          <h2 className="text-md leading-10">
            What you have been working on...
          </h2>
          <button
            onClick={() => navigate("/projectspage")}
            className="text-sm cursor-pointer text-primary hover:text-mainMauve"
          >
            ALL WIPS →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {firstFourProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className="relative p-2 bg-mainMauve rounded-lg overflow-hidden cursor-pointer"
            >
              <button
                aria-label="Delete project"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteProject(project.id);
                }}
                className="absolute p-6 top-2 right-2 z-10 w-7 h-8 rounded-full bg-[#6f5b5c] text-white font-light justify-center items-center flex border-2 text-2xl cursor-pointer"
              >
                ×
              </button>

              <img
                src={project.image}
                alt={project.name}
                className="w-full h-28 object-cover rounded-md"
              />

              <div className="p-2">
                <p className="text-lg font-semibold text-primary uppercase">
                  {project.name}
                </p>

                <div className="flex items-center justify-between">
                  <p className="font-semibold text-light">Status</p>

                  <div className="bg-accentLight font-semibold text-primary rounded-full px-3 py-2 text-sm">
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
      <Navbar />
    </section>
  );
}
