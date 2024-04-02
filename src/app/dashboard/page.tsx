import { Suspense } from "react";
import DashboardPage from "./dashboard";
import { getAllUserProjects } from "./api";
import { Button } from "@ui/button";
import Link from "next/link";
import { Project } from "@src/API";
import { currentAuthenticatedUser } from "@/lib/auth";

export default async function Page() {
  const currentUser = await currentAuthenticatedUser();
  if (!currentUser)
    return (
      <>
        <p>Not authenticated</p>
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
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
