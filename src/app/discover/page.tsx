import React from "react";
import { Suspense } from "react";
import { getAllProjects } from "@/discover/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { LoadingSpinner } from "@/components/ui/spinner";

export default function Page() {
  return (
    <div className="h-base">
      <ScrollArea className="h-full">
        <p>Title Here? Welcome Banner?</p>
        <Suspense fallback={<Loading />}>
          <ProjectList />
        </Suspense>
      </ScrollArea>
    </div>
  );
}

async function ProjectList() {
  const projects = await getAllProjects();

  return (
    <div className="flex flex-wrap gap-7 p-10">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  );
}
