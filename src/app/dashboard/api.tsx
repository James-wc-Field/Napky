import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../../amplifyconfiguration.json';
import { listProjects } from '../../graphql/queries';
import { createProject } from '../../graphql/mutations';

/**
 * Get all projects
 * @returns an array of all projects
 */
export async function getAllProjects() {
    Amplify.configure(config);
    const client = generateClient();
    return (await client.graphql({
        query: listProjects
    })).data.listProjects.items;
}

/**
 * Create a new project
 * @returns the id of the new project
 */
export async function createNewProject(){
    Amplify.configure(config);
    const client = generateClient();
    const project = (await client.graphql({
      query: createProject,
      variables: {
        input: {
          userId: "user",
          name: "untitled",
          description: "description",
          content: ""
        }
      }
    })).data.createProject;
    return project.id;
  }
