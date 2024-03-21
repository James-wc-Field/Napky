'use client'
import React from 'react'
import { ProjectCard } from '@components/cards/ProjectCardSample'
import { ProjectCardDetails } from '@/components/cards/ProjectCardDetails'
import { Suspense } from 'react';
import { getAllProjects } from '@/dashboard/api';
import { Project } from '../../API';


export default async function Page() {
  const projects: Project[] = await getAllProjects();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProjectCardDetails key={projects? projects.at(0).id : 0} project={projects? projects.at(0): null}/>
    </Suspense>
  )
  }
