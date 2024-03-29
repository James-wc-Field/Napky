"use client";

import { ProjectCard } from '@components/cards/ProjectCardSample';
import { ProjectCardDetails } from '@/components/cards/ProjectCardDetails';
import { Project } from '../../API';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense, useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

type props = {
  projects: Project[];
};

export default function DiscoverPage(props: props) {
  const { projects } = props;
  // stuff
  let column_count = 5;
  let project_Columns: Array<Array<Project>> = [];
  for (let col = 0; col < column_count; col++) {
    let column: Array<Project> = []
    project_Columns.push(column)
  }
  
  // This sorts the projects in the project list into the columns
  let curr_col = 0;
  for (let project of projects) {
    project_Columns[curr_col % column_count].push(project);
    curr_col++;
  } 
 
  return (
      <div className='h-base'>
      <ScrollArea className='h-full'>
        <p>Title Here? Welcome Banner?</p>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="flex justify-center gap-3 p-10">
          {
          project_Columns.map((column)=> {
            return (
              // these are the columns
              <div className="w-[18vw]">
                {
                  column.map((project: any) => {
                    return (
                      <div className={`w-full mb-8 bg-white`}>
                        <ProjectCard project={project}/>
                      </div>
                    )
                  })
                }

              </div>
            )

          })
        }
          </div>
        </Suspense>        
      </ScrollArea>
      </div>
    )
  }
