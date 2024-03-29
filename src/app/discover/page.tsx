import React from 'react'
import { Suspense } from 'react';
import DiscoverPage from './discover';
import { Project } from '../../API';
import { getAllProjects } from '@/discover/api';


export default async function Page() {
  const projects: Project[] = await getAllProjects();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DiscoverPage projects={projects}/>
    </Suspense>
  )
  }

