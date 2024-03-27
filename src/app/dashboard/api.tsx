"use server";

import { cookieBasedClient } from "@/lib/amplifyServerUtils";
import { listProjects } from "@src/graphql/queries";
import { createProject } from "@src/graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { cookies } from "next/headers";

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

/**
 * Get the current authenticated user
 * @returns the current authenticated user
 */
export async function currentAuthenticatedUser() {
  try {
    return await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
  } catch {
    console.log("No current user")
    return null;
  }
}
