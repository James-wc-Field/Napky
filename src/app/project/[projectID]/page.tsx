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
  }, [projectID]);
  // await generateSummary('https://www.popularwoodworking.com/how-to-build-shelves/','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');


  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProjectBuilder />
    </Suspense>
  )
}

export default BuilderPage;
