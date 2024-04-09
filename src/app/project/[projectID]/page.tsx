import React from "react";
import ProjectBuilder from "@/project/[projectID]/ProjectBuilder";
import { Suspense } from "react";
import { Project } from "@src/API";
import {saveProject, getProjectData, generateSummary} from './api';
import og_image from '../../../../public/images/Project Sample.png';

export async function generateMetadata({ params }: { params: { projectID: string } }) {
  const projectID = params.projectID;
  const project = await getProjectData(projectID);

  return {
    openGraph: {
      title: 'Korkbo',
      url: 'https://www.korkbo.com/project/' + params.projectID,
      type: 'website',
      description: project?.description ?? 'Try Korkbo, a modern project organization tool.',
      images: [
        {
          url: og_image.src // project.image here?... or whatever the property ends up being called.
        }
      ],
      siteName: 'Korkbo.com',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Korkbo.com',
      description:  project?.description ?? 'Try Korkbo, a modern project organization tool.',
      images: [
        og_image.src // project.image here?... or whatever the property ends up being called.
      ],
    },
  }
}

async function BuilderPage({ params }: { params: { projectID: string } }) {
  const projectID = params.projectID;
  const project = await getProjectData(projectID);
  // await generateSummary('https://www.popularwoodworking.com/how-to-build-shelves/','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');
  if (!project) return <p>Project not found</p>;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProjectBuilder project={project as Project} />
    </Suspense>
  )
}

export default BuilderPage;
