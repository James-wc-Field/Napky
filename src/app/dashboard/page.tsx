import {getAllProjects} from './api';
import { Suspense } from 'react';
import {Projects} from './projects';
import {Project} from '@/API';
import {createNewProject} from './api';
export default async function Page() {
  const projects: Project[] = await getAllProjects();

  async function newProjectPath(){
    const id = await createNewProject();
    return `/project/${id}`;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Projects projects={projects} projectPath = { await newProjectPath()} /> 
    </Suspense>
  );
}
