"use server";

import { cookieBasedClient } from "@/lib/amplifyServerUtils";
import { createComments } from "@src/graphql/mutations";

/**
 * Create a new project
 * @returns the id of the new project
 */
export async function createNewFeedback(feedback: string) {
  const project = (
    await cookieBasedClient.graphql({
      query: createComments,
      variables: {
        input: {
          comment: feedback,
        },
      },
    })
  ).data.createComments;
  return project.id;
}
