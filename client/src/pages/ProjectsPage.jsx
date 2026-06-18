import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../Context";

function calculateProgress(project) {
  if (!project.milestones?.length) return 0;

  const completed = project.milestones.filter((m) => m.done).length;

  return Math.round(
    (completed / project.milestones.length) * 100
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();

  const { projects } = useContext(MainContext);

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
              className="project-card"
              onClick={() =>
                navigate(`/project/${project.id}`)
              }
            >
              <img
                src={project.image}
                alt={project.name}
                className="project-image"
              />

              <div className="card-content">
                <p className="project-name">
                  {project.name}
                </p>

                <div className="stats-line">
                  <p className="status-title">
                    Status
                  </p>

                  <div className="progress-pill">
                    {calculateProgress(project)}%
                  </div>
                </div>

                <p>
                  Rows: {project.rows}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}