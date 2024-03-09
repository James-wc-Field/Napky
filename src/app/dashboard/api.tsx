import { generateClient } from "aws-amplify/api";
import { listProjects } from "../../graphql/queries";
import { createProject } from "../../graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth";

/**
 * Get all projects
 * @returns an array of all projects
 */
export async function getAllProjects() {
  const client = generateClient();
  return (
    await client.graphql({
      query: listProjects,
    })
  ).data.listProjects.items;
}

/**
 * Create a new project
 * @returns the id of the new project
 */
export async function createNewProject() {
  const client = generateClient();
  const project = (
    await client.graphql({
      query: createProject,
      variables: {
        input: {
          userId: "user",
          name: "untitled",
          description: "description",
          content: "",
        },
      },
    })
  ).data.createProject;
  return project.id;
}

export async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
    return { username, userId, signInDetails };
  } catch (err) {
    console.log(err);
    return null;
  }
}
