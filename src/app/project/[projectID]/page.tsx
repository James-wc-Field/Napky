'use client'
import React, { useEffect } from "react";
import ProjectBuilder from "@/project/[projectID]/ProjectBuilder";
import { Suspense } from "react";
import { useProjectStore } from "./storeProvider";
import { useShallow } from "zustand/react/shallow";
import { Project } from "@src/API";
import { saveProject, getProjectData, generateSummary } from './api';
import og_image from '../../../../public/images/Project Sample.png';


// Put this into the non interactive version of the project. 

// export async function generateMetadata({ params }: { params: { projectID: string } }) {
//   const projectID = params.projectID;
//   const project = await getProjectData(projectID);

//   return {
//     openGraph: {
//       title: 'Korkbo',
//       url: 'https://www.korkbo.com/project/' + params.projectID,
//       type: 'website',
//       description: project?.description ?? 'Try Korkbo, a modern project organization tool.',
//       images: [
//         {
//           url: og_image.src // project.image here?... or whatever the property ends up being called.
//         }
//       ],
//       siteName: 'Korkbo.com',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: 'Korkbo.com',
//       description:  project?.description ?? 'Try Korkbo, a modern project organization tool.',
//       images: [
//         og_image.src // project.image here?... or whatever the property ends up being called.
//       ],
//     },
//   }
// }

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
