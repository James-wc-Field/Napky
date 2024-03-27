import { Suspense } from "react";
import DashboardPage from "./dashboard";
import { currentAuthenticatedUser, getAllUserProjects } from "./api";
import { Button } from "@ui/button";
import Link from "next/link";
import { Project } from "@src/API";

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

  const projects: Project[] = await getAllUserProjects();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage projects={projects} />
    </Suspense>
  );
}
