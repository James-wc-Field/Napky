import { Suspense } from "react";
import DashboardPage from "./dashboard";
import { Project } from '../../API';
import { getAllProjects } from "./api";

export default async function Page() {
  const projects: Project[] = await getAllProjects();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage projects={projects}/>
    </Suspense>
  );
}