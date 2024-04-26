import React from "react";
import ProjectBuilder from "@/project/[projectID]/ProjectBuilder";
import { Project } from "@src/API";
import { saveProject, getProjectData, generateSummary } from './project/[projectID]/api';
import og_image from '../../../../public/images/Project Sample.png';
import { NavigationBar } from "@/components/NavigationBar";
import { ProjectStoreProvider } from "./project/[projectID]/storeProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const metadata = {
  openGraph: {
    title: 'Korkbo',
    url: 'https://www.korkbo.com/',
    type: 'website',
    description: 'A modern project organization tool.',
    images: [
      {
        url: "images/Project Sample.png"
      }
    ],
    siteName: 'Korkbo.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korkbo.com',
    description: 'A modern project organization tool.',
    images: ["images/Project Sample.png"],
  },
}


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

export default function BuilderPage() {
  return (
    <div className="flex flex-col min-h-screen max-h-screen min-w-full">
      <main className="flex grow">
        <div className="w-full mx-auto overflow-hidden">
          <NavigationBar>
            <></>
          </NavigationBar>
          <ProjectStoreProvider>
            <ProjectBuilder />
          </ProjectStoreProvider>
        </div>
      </main>
    </div>
  )
}
