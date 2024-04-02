"use server";

import { cookieBasedClient } from "@/lib/amplifyServerUtils";
import { listProjects } from "@src/graphql/queries";
import { createProject } from "@src/graphql/mutations";
import { currentAuthenticatedUser } from "@/lib/auth";
import { getCurrentUser } from "aws-amplify/auth";

/**
 * Get all projects created by the user
 * @returns an array of all projects created by the user
 */
export async function getAllUserProjects() {
  const user = await currentAuthenticatedUser();
  if (!user) {
    return [];
  }
  return (
    await cookieBasedClient.graphql({
      query: listProjects,
      variables: {
        limit: 1000,
        filter: {
          userId: { eq: user.userId },
        },
      },
    })
  ).data.listProjects.items;
}

/**
 * Create a new project
 * @returns the id of the new project
 */
export async function createNewProject() {
  const user = await currentAuthenticatedUser();
  if (!user) {
    return null;
  }
  const project = (
    await cookieBasedClient.graphql({
      query: createProject,
      variables: {
        input: {
          userId: user.userId,
          name: "untitled",
          description: "",
          content: "",
        },
      },
    })
  ).data.createProject;
  return project.id;
}


export async function currentAuthenticated() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
    return { username, userId, signInDetails };
  } catch (err) {
    console.log(err);
    return { username: undefined, userId: undefined, signInDetails: undefined };
  }
}