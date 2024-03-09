"use client";

import React from "react";
import ProjectBuilder from "@canvas/ProjectBuilder";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/spinner";

export default function BuilderPage() {
  const params = useParams();
  const { projectID } = params;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectBuilder projectID={projectID as string} />
    </Suspense>
  );
}
