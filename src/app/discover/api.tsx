"use server";

import { cookieBasedClient } from "@/lib/amplifyServerUtils";
import { listProjects } from "@/../graphql/queries";
import { currentAuthenticatedUser } from "@/lib/auth";

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
