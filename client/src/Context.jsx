import React, { createContext, useEffect, useRef, useState } from "react";

export const MainContext = createContext();

const STORAGE_KEY = "knitTrackProjects";

export function ContextProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);

  const timerRef = useRef(null);
  const lastTimerUpdateRef = useRef(null);

  const currentProject = projects.find(
    (project) => project.id === currentProjectId
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (!timerRunning || !currentProjectId) return;

    lastTimerUpdateRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((now - lastTimerUpdateRef.current) / 1000);

      if (diff > 0) {
        lastTimerUpdateRef.current = now;

        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === currentProjectId
              ? { ...project, timeSpent: project.timeSpent + diff }
              : project
          )
        );
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timerRunning, currentProjectId]);

  return (
    <MainContext.Provider
      value={{
        projects,
        setProjects,
        currentProject,
        currentProjectId,
        setCurrentProjectId,
        timerRunning,
        setTimerRunning,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}