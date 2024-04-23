"use server";

import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "./amplifyServerUtils";
import { cookies } from "next/headers";

/**
 * Get the current authenticated user
 * @returns the current authenticated user
 */
export async function currentAuthenticatedUser() {
  const cookieStore = cookies;
  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { cookies: cookieStore },
    operation: async (contextSpec) => {
      try {
        return await getCurrentUser(contextSpec);
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });
  return authenticated;
}
