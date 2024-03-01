import React from "react";
import ProjectBuilder from "@/app/components/ProjectBuilder";
import { generateClient } from 'aws-amplify/api';
import { getProject } from "@/graphql/queries";
import { Suspense } from "react";
import { Project } from "@/API";

async function BuilderPage({ params }: { params: { projectID: string } }) {
  const projectID = params.projectID;
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Project projectID={projectID} />
    </Suspense>
  )
}

async function Project({ projectID }: { projectID: string }) {
  const client = generateClient();
  const project = (await client.graphql({
    query: getProject,
    variables: { id: projectID }
  })).data.getProject;
  return (
    <div>
      <ProjectBuilder project={project as Project} />
    </div>
  )
}


export default BuilderPage;
