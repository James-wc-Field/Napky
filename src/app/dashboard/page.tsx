import { Suspense } from "react";
import DashboardPage from "./dashboard";
import { Project } from "../../API";
import { currentAuthenticatedUser, getAllProjects } from "./api";
import { Button } from "@ui/button";
import Link from "next/link";
import { Amplify } from 'aws-amplify';
import config from '@/../amplifyconfiguration.json';
import { cookies } from 'next/headers';
import { getCurrentUser } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/amplifyServerUtils";
import { get } from "http";

// async function getUser() {
//   try {
//     const currentUser = await runWithAmplifyServerContext({
//       nextServerContext: { cookies },
//       operation: async (contextSpec) => {
//         getCurrentUser(contextSpec);
//       }
//     });
//     console.log("CURRENT", currentUser);
//     return currentUser;
//   } catch (e) {
//     return null;
//   }

// }
export default async function Page() {
  const currentUser = await currentAuthenticatedUser();
  console.log("CURRENT USER",currentUser);
  if (!currentUser)
    return (
      <>
        <p>Not authenticated</p>
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </>
    );

  const projects: Project[] = await getAllProjects();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage projects={projects} />
    </Suspense>
  );
}
