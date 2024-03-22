import { ProjectCard } from '@components/cards/ProjectCardSample';
import { ProjectCardDetails } from '@/components/cards/ProjectCardDetails';
import { Project } from '../../API';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

type props = {
  projects: Project[];
};

export default function DiscoverPage(props: props) {
  const { projects } = props;
  // stuff
    return (
      <div className='h-base'>
      <ScrollArea className='h-full'>
        <p>Title Here? Welcome Banner?</p>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="flex flex-wrap gap-7 p-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project}/>
              ))}
          </div>
        </Suspense>        
      </ScrollArea>
      </div>
    )
  }
