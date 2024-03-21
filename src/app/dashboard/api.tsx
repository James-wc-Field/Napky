"use server";

import { cookieBasedClient } from "@/lib/amplifyServerUtils";
import { listProjects } from "../../graphql/queries";
import { createProject } from "../../graphql/mutations";
import { getCurrentUser } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils';
import config from '@/../amplifyconfiguration.json';
import { cookies } from 'next/headers';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
// import { cookieClient } from "@/amplifyServerUtils";
/**
 * Get all projects
 * @returns an array of all projects
 */
export async function getAllProjects() {
  return (
    await cookieBasedClient.graphql({
      query: listProjects,
    })
  ).data.listProjects.items;
}

/**
 * Create a new project
 * @returns the id of the new project
 */
export async function createNewProject() {
  const project = (
    await cookieBasedClient.graphql({
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
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec)
  });
  return user;
}
