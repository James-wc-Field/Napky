import React from "react";
import simulatedDatabase from "../DBSimulation";
import ProjectBuilder from "@/app/components/ProjectBuilder";

function BuilderPage() {
  const project = simulatedDatabase[0];
  if (!project) {
    throw new Error("form not found");
  }
  return <ProjectBuilder project={project}/>
}

export default BuilderPage;
