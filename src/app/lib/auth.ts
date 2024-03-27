"use server";

import { getCurrentUser } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "./amplifyServerUtils";
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
  } catch {
    console.log("No current user");
    return null;
  }
}
