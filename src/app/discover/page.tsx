'use client'
import React from 'react'
import { ProjectCard } from '@components/cards/ProjectCardSample'
import { ProjectCardDetails } from '@/components/cards/ProjectCardDetails'


export default function Page() {

  return (
    <div className='flex w-full h-full justify-center'>
      <ProjectCardDetails/>
    </div>
  )
  }
