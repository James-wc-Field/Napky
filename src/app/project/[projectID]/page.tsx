import React from "react";
import ProjectBuilder from "@canvas/ProjectBuilder";
import { Suspense } from "react";
import { Project } from "@src/API";
import {saveProject, getProjectData, generateSummary} from './api';
async function BuilderPage({ params }: { params: { projectID: string } }) {
  const projectID = params.projectID;
  const project = await getProjectData(projectID);
  // await generateSummary('https://www.popularwoodworking.com/how-to-build-shelves/','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');
  if (!project) return <p>Project not found</p>;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProjectBuilder project={project as Project} />
    </Suspense>
  )
}

export default BuilderPage;
