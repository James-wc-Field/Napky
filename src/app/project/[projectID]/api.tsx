'use server'
import { getProject } from "../../../graphql/queries";
import { updateProject } from "../../../graphql/mutations";
import { ProjectElementInstance } from "@canvas/types/ProjectElements";
import { cookieBasedClient } from '@/lib/amplifyServerUtils';


/**
 * saves a project to the database
 * @param elements a list of elements from a project to save
 */
export async function saveProject(projectId: string, name: string, elements: ProjectElementInstance[]){
    await cookieBasedClient.graphql({
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
    return (await cookieBasedClient.graphql({
      query: getProject,
      variables: { id: projectID }
    })).data.getProject;
}