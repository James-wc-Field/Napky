'use server'
import ProjectBuilder from "../../components/ProjectBuilder";
import { generateClient } from 'aws-amplify/api';
import { getProject } from "../../../graphql/queries";
import { Suspense } from "react";
import { Project } from "@/API";
import config from '../../../amplifyconfiguration.json'
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from "aws-amplify/auth";
import { createProject, updateProject } from "../../../graphql/mutations";
import { ProjectElementInstance } from "@/app/components/ProjectElements";


/**
 * saves a project to the database
 * @param elements a list of elements from a project to save
 */
export async function saveProject(projectId: string, name: string, elements: ProjectElementInstance[]){
    Amplify.configure(config);
    const client = generateClient();
    await client.graphql({
      query: updateProject,
      variables: {
        input: {
        id: projectId,
          userId: "user",
          name: name,
          description: "description",
          content: JSON.stringify(elements)
        }
      }
    });
  }

/**
 * gets project data based on the projectID
 * @param projectID the id of the project to get
 */
export async function getProjectData(projectID: string){
    Amplify.configure(config);
    // const {userId} = await getCurrentUser();
    const client = generateClient();
    return (await client.graphql({
      query: getProject,
      variables: { id: projectID }
    })).data.getProject;
}