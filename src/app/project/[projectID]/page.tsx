import React from "react";
import ProjectBuilder from "@canvas/ProjectBuilder";
import { Suspense } from "react";
import { Project } from "../../../API";
import {saveProject, getProjectData} from './api';
async function BuilderPage({ params }: { params: { projectID: string } }) {
  const projectID = params.projectID;
  const project = await getProjectData(projectID);
  if (!project) return <p>Project not found</p>;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProjectBuilder project={project as Project} />
    </Suspense>
  )
}

export default BuilderPage;
