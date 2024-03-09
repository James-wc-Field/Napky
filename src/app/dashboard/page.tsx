import { Suspense } from "react";
import DashboardPage from "./dashboard";
import { Project } from "../../API";
import { currentAuthenticatedUser, getAllProjects } from "./api";
import { Button } from "@ui/button";
import Link from "next/link";

export default async function Page() {
  const user = await currentAuthenticatedUser();
  if (!user)
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
