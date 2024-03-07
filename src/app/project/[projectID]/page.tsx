import React from "react";
import ProjectBuilder from "../../components/ProjectBuilder";
import { generateClient } from 'aws-amplify/api';
import { getProject } from "../../../graphql/queries";
import { Suspense } from "react";
import { Project } from "@/API";
import config from '../../../amplifyconfiguration.json'
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from "aws-amplify/auth";
import { createProject } from "../../../graphql/mutations";
import { ProjectElementInstance } from "@/app/components/ProjectElements";
async function BuilderPage({ params }: { params: { projectID: string } }) {
  const projectID = params.projectID;
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Project projectID={projectID} />
    </Suspense>
  )
}
async function saveProject(elements: ProjectElementInstance[]){
  'use server'
  const client = generateClient();
  await client.graphql({
    query: createProject,
    variables: {
      input: {
        userId: "user",
        name: "name",
        description: "description",
        content: JSON.stringify(elements)
      }
    }
  });
}

async function Project({ projectID }: { projectID: string }) {
  Amplify.configure(config);
  // const {userId} = await getCurrentUser();
  const client = generateClient();
  const project = (await client.graphql({
    query: getProject,
    variables: { id: projectID }
  })).data.getProject;
  console.log(project);
  return (
    <div>
      <ProjectBuilder project={project as Project} saveProject={saveProject}/>
    </div>
  )
}

export default BuilderPage;
