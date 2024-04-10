import { Suspense } from "react";
import DashboardPage from "./dashboard";
import { getAllUserProjects } from "./api";
import { Project } from "@src/API";

export default async function Page() {
  const projects: Project[] = await getAllUserProjects();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage projects={projects} />
    </Suspense>
  );
}
