'use client'
import React, { useEffect } from "react";
import ProjectBuilder from "@/project/[projectID]/ProjectBuilder";
import { Suspense } from "react";
import { useProjectStore } from "./storeProvider";
import { useShallow } from "zustand/react/shallow";
function BuilderPage({ params }: { params: { projectID: string } }) {
  const projectID = params.projectID;
  const { fetch } = useProjectStore(useShallow((state) => state));
  useEffect(() => {
    fetch(projectID);
  }, [projectID, fetch]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProjectBuilder />
    </Suspense>
  )
}

export default BuilderPage;
