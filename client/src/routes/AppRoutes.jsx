import {  Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import NewProjectPage from "../pages/NewProjectPage";
import ProjectPage from "../pages/ProjectPage";
import ProjectsPage from "../pages/ProjectsPage";
import RavelryPage from "../pages/RavelryPage";
import SearchResultsPage from "../pages/SearchResultsPage";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-project" element={<NewProjectPage />} />
        <Route path="/projectspage" element={<ProjectsPage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
        <Route path="/ravelry" element={<RavelryPage />} />
        <Route path= "/search/:query" element={<SearchResultsPage/>} />
      </Routes>
  );
}