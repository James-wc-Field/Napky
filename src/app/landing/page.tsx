import React from 'react'
import { Suspense } from 'react';
import LandingPage from './landing';
import LandingPageV2 from './landingV2';
import { Project } from '../../API';
import { getAllProjects } from '@/dashboard/api';


export default async function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LandingPageV2/>
    </Suspense>
  )
  }

