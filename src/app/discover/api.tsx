import { cookieBasedClient } from "@/lib/amplifyServerUtils";
import { listProjects } from "@/../graphql/queries";
import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

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
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Get all projects not created by the user
 * @returns an array of all projects not created by the user
 */
export async function getAllProjects() {
  const user = await currentAuthenticatedUser();
  return (
    await cookieBasedClient.graphql({
      query: listProjects,
      variables: {
        limit: 1000,
        filter: {
          userId: { ne: user?.userId },
        },
      },
    })
  ).data.listProjects.items;
}
