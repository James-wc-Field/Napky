import React from 'react'
import { Suspense } from 'react';
import LandingPage from './landing';
import { Project } from '../../API';
import { getAllProjects } from '@/dashboard/api';


export default async function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LandingPage/>
    </Suspense>
  )
  }

