import React from "react";
import simulatedDatabase from "../DBSimulation";
import ProjectBuilder from "@components/canvas/ProjectBuilder";

function BuilderPage() {
  const project = simulatedDatabase[0];
  if (!project) {
    throw new Error("form not found");
  }
  return <ProjectBuilder project={project}/>
}

export default BuilderPage;
