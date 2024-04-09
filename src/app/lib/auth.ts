"use server";

import { getCurrentUser } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "./amplifyServerUtils";
import { cookies } from "next/headers";

/**
 * Get the current authenticated user
 * @returns the current authenticated user
 */
export async function currentAuthenticatedUser() {
  const cookieStore = cookies;
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies:cookieStore },
    operation: (contextSpec) => getCurrentUser(contextSpec),
  });
}
