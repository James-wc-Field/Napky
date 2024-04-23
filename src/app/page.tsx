import React from "react";
import ProjectBuilder from "@/project/ProjectBuilder";


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
  return <ProjectBuilder />;
}
