import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../Context";
import { soundUrlReset } from "../assets";


function calculateProgress(project) {
  if (!project.milestones?.length) return 0;

  const completed = project.milestones.filter((m) => m.done).length;

  return Math.round(
    (completed / project.milestones.length) * 100
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();

  const { projects, setProjects } = useContext(MainContext);

  function playSound(url) {
  const audio = new Audio(url);
  audio.currentTime = 0;
  audio.volume = 1;
  audio.play().catch((error) => console.log("Sound failed:", error));
}


    function deleteProject(projectId) {
      playSound(soundUrlReset);
      setProjects(projects.filter((project) => project.id !== projectId));
    }

  return (
    <section id="projectsScreen" className="screen active">
      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <h1>My Projects</h1>

      {!projects.length ? (
        <div>
          <p>No projects yet</p>

          <button
            className="main-btn"
            onClick={() => navigate("/new-project")}
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div id="projectsGrid">
          {projects.map((project) => (
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
                <p className="text-lg font-semibold text-primary uppercase">{project.name}</p>

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
      )}
    
    </section>
  );
}