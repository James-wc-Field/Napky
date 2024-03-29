import { ProjectCard } from '@components/cards/ProjectCardSample';
import { ProjectCardDetails } from '@/components/cards/ProjectCardDetails';
import { Project } from '../../API';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image'

type props = {};

export default function LandingPageV2(props: props) {
    return (
      <div className='h-base'>
      <ScrollArea className='h-full'>
        <Suspense fallback={<p>Loading...</p>}>
            <div className='h-[60vh] flex justify-center items-center flex-col'>
                <div className='flex flex-row px-10 mt-20'>
                    <div className='basis-[30%] flex flex-col justify-center'>
                        <div className='w-fit text-7xl mb-12 drop-shadow-lg'>
                            Korkbo
                        </div>
                        <div className='w-fit text-4xl mb-12 drop-shadow-md'>
                            A modern project organization tool
                        </div>
                        <div className='relative w-fit text-3xl bg-secondary py-4 px-8 rounded-2xl text-accent cursor-pointer'>
                            <div className='absolute w-full h-full left-0 top-0 rounded-2xl z-[-0.5] shadow-2xl animate-[pulse_2s_ease-in-out_infinite] outline-accent outline outline-2 outline-offset-0'>
                            </div>
                            Try it out
                        </div>
                    </div>
                    <div className='basis-[70%]'>
                        <Image
                            src="/images/Project Sample.PNG"
                            width={2000}
                            height={2000}
                            alt="Project example"
                            className='w-full rounded-2xl border-[1px] border-slate-500 shadow-2xl'
                             />
                    </div>
                </div>
            </div>
            <div className='relative h-[calc(100vh-150px)] flex justify-center items-center flex-col'>
                <div className='absolute top-[0] left-[-50%] w-[200%] h-[100vh] rotate-12 bg-secondary z-[-1]'>
                </div>
                <div className='w-fit text-6xl mb-16 drop-shadow-lg text-accent'>
                    Tools
                </div>
                <div className='max-w-[50%] flex flex-col items-center justify-center'>
                    <div className='w-fit text-3xl mb-12 drop-shadow-md text-accent text-center border-4 border-white p-3 rounded-lg translate-x-16 translate-y-4'>
                        Free-form organizing power - no more lists
                    </div>
                    <div className='w-fit text-3xl mb-12 drop-shadow-md text-accent text-center border-4 border-white p-3 rounded-lg translate-x-[-3rem] translate-y-2'>
                        Add links directly to your project - no more "tabzilla"
                    </div>
                    <div className='w-fit text-3xl drop-shadow-md text-accent text-center border-4 border-white p-3 rounded-lg translate-x-24 translate-y-12'>
                        AI integrated tools for high-efficiency work 
                    </div>
                </div>
            </div>
            <div className='relative h-[calc(100vh-150px)] flex justify-center items-center flex-col'>
                <div className='absolute top-[0%] left-[-50%] w-[200%] h-[120%] rotate-[12deg] bg-primary z-[-1]'>
                    Hi
                </div>
                <div className='w-fit text-6xl mb-12 drop-shadow-lg'>
                    Collaboration
                </div>
                <div className='w-fit text-3xl mb-12 drop-shadow-md text-center max-w-[50%]'>
                    All projects are public by default to allow community forum style sharing
                </div>
                <div className='relative w-fit text-3xl bg-secondary py-4 px-8 rounded-2xl text-accent cursor-pointer'>
                    <div className='absolute w-full h-full left-0 top-0 rounded-2xl z-[-1] shadow-2xl animate-pulse outline-secondary outline outline- outline-offset-1'>

                    </div>
                    Try it out
                </div>
            </div>
        </Suspense>        
      </ScrollArea>
      </div>
    )
  }
