import React from "react";
import { Suspense } from "react";
import { getAllProjects } from "@/discover/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { LoadingSpinner } from "@/components/ui/spinner";
import og_image from '@/public/images/Project Sample.png';
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: 'Korkbo',
    url: 'https://www.korkbo.com/discover',
    type: 'website',
    description: 'A modern project organization tool. Browse projects.',
    images: [
      {
        url: og_image.src
      }
    ],
    siteName: 'Korkbo.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korkbo.com',
    description: 'A modern project organization tool. Browse projects.',
    images: [og_image.src],
  },
}

export default function Page() {
  return (
    <div className="h-base">
      <ScrollArea className="h-full">
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
