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
import {saveProject, getProjectData} from './api';
async function BuilderPage({ params }: { params: { projectID: string } }) {
  const projectID = params.projectID;
  const project = await getProjectData(projectID);
  if (!project) return <p>Project not found</p>;
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProjectBuilder project={project as Project} saveProject={saveProject} />
    </Suspense>
  )
}

export default BuilderPage;
