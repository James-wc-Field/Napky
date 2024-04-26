
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense } from 'react';
import Image from 'next/image'
import { NavigationBar } from './components/NavigationBar';
import { Button } from './components/ui/button';
import Link from 'next/link';
import og_image from '@/public/images/Project Sample.png';

export const metadata = {
  icons: {
    favicon: '/images/Korkbo.png',
    touchIcon: '/images/Korkbo.png',
  },
  openGraph: {
    title: 'Korkbo',
    url: 'https://www.korkbo.com/',
    type: 'website',
    description: 'A modern project organization tool.',
    images: [
      {
        url: "images/Project Sample.png"
      }
    ],
    siteName: 'Korkbo.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korkbo.com',
    description: 'A modern project organization tool.',
    images: ["images/Project Sample.png"],
  },
}

type props = {};

export default function Home(props: props) {
  return (
    <>
      <NavigationBar>
        <div style={{ marginLeft: "auto" }}>
          <Button variant={"ghost"} className="text-lg" asChild>
            <Link href={"/discover"}>Discover</Link>
          </Button>
        </div>
      </NavigationBar>
      <div className='flex md:justify-center items-center flex-col'>
        <div className='flex flex-col w-[calc(100%-20px)] md:flex-row md:ml-[10%] mt-8 mb-24'>
          <div className=' flex flex-col justify-center pb-4 pr-4'>
            <div className=' text-7xl mb-8 drop-shadow-lg'>
              Korkbo
            </div>
            <div className=' text-2xl mb-8 drop-shadow-md'>
              A modern project organization tool
            </div>
            <div className='relative w-fit text-2xl bg-secondary py-4 px-8 rounded-lg text-accent cursor-pointer'>
              {/* <div className='absolute w-full h-full left-0 top-0 rounded-2xl z-[-0.5] shadow-2xl animate-[pulse_2s_ease-in-out_infinite] outline-accent outline outline-4 outline-offset-0'></div> */}
              Try it out
            </div>
          </div>
          <div className='flex justify-start items-center'>
            <Image
              src="/images/Project Sample.PNG"
              width={2000}
              height={2000}
              alt="Project example"
              className='md:w-[90%] rounded-2xl border-[1px] border-slate-500 shadow-2xl'
            />
          </div>
        </div>
      </div>
      <div className='relative py-20 flex flex-col justify-center items-center bg-secondary'>
        <div className='w-fit text-5xl mb-16 drop-shadow-lg text-accent text-center'>Use modern tools</div>
        <div className='flex flex-col w-full px-20'>
          <div className='flex flex-col md:flex-row w-full justify-between'>
            <div className='flex flex-col basis-[30%]'>
              <Image
                src="/images/links-edited.png"
                width={2000}
                height={2000}
                alt="Project example"
                className='w-full'
              />
              <div className='text-center mt-4 text-3xl drop-shadow-lg text-accent md:hidden'>Link Management</div>
              <div className='text-center mt-4 text-xl drop-shadow-lg text-accent mb-16 md:hidden'>Store your links in your project rather than keeping them as open tabs.</div>
            </div>
            <div className='flex flex-col basis-[30%]'>
              <Image
                src="/images/climbing-holds-edited.png"
                width={2000}
                height={2000}
                alt="Project example"
                className='w-full'
              />
              <div className='text-center mt-4 text-3xl drop-shadow-lg text-accent md:hidden'>Project Organization</div>
              <div className='text-center mt-4 text-xl drop-shadow-lg text-accent mb-16 md:hidden'>Organize projects in freeform.</div>
            </div>
            <div className='flex flex-col basis-[30%]'>
              <Image
                src="/images/multimedia-edited.png"
                width={2000}
                height={2000}
                alt="Project example"
                className='w-full'
              />
              <div className='text-center mt-4 text-3xl drop-shadow-lg text-accent md:hidden'>More Than Just Text</div>
              <div className='text-center mt-4 text-xl drop-shadow-lg text-accent mb-16 md:hidden'>Attach pictures, videos, AI sumarizations, and more.</div>
            </div>
          </div>
          <div className=' hidden flex-col md:flex-row w-full justify-between md:flex'>
            <div className='flex flex-col basis-[30%]'>
              <div className='text-center mt-4 text-3xl drop-shadow-lg text-accent'>Link Management</div>
            </div>
            <div className='flex flex-col basis-[30%]'>
              <div className='text-center mt-4 text-3xl drop-shadow-lg text-accent'>Project Organization</div>
            </div>
            <div className='flex flex-col basis-[30%]'>
              <div className='text-center mt-4 text-3xl drop-shadow-lg text-accent'>More Than Just Text</div>
            </div>
          </div>
          <div className=' hidden flex-col md:flex-row w-full justify-between md:flex'>
            <div className='flex flex-col basis-[30%]'>
              <div className='text-center mt-4 text-xl drop-shadow-lg text-accent'>Store your links in your project rather than keeping them as open tabs.</div>
            </div>
            <div className='flex flex-col basis-[30%]'>
              <div className='text-center mt-4 text-xl drop-shadow-lg text-accent'>Organize projects in freeform.</div>
            </div>
            <div className='flex flex-col basis-[30%]'>
              <div className='text-center mt-4 text-xl drop-shadow-lg text-accent'>Attach pictures, videos, AI sumarizations, and more.</div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative flex justify-center items-center flex-col my-20 w-[calc(100%-20px)] mx-auto'>
        {/* <div className='absolute top-[0%] left-[-50%] w-[200%] h-[120%] rotate-[12deg] bg-primary z-[-1]'></div> */}
        <div className='w-fit text-6xl mb-12 drop-shadow-lg'>
          Collaboration
        </div>
        <Image
          src="/images/Collaboration.png"
          width={2000}
          height={2000}
          alt="Project example"
          className='md:w-[90%] rounded-2xl border-[1px] border-slate-500 shadow-2xl mb-12'
        />
        <div className='w-fit text-3xl mb-12 drop-shadow-md text-center max-w-[50%]'>
          All projects are public by default to allow community forum style sharing
        </div>
        <div className='relative w-fit text-3xl bg-secondary py-4 px-8 rounded-2xl text-accent cursor-pointer'>
          <div className='absolute w-full h-full left-0 top-0 rounded-2xl z-[-1] shadow-2xl animate-pulse outline-secondary outline outline- outline-offset-1'></div>
          See Projects
        </div>
      </div>
    </>

  )
}

// ---------------------------
// Below is just some more components that I might use later on this one

// <div className='relative h-[60vh] flex justify-center items-center flex-col bg-primary'>
//     {/* <div className='absolute top-[0] left-[-50%] w-[200%] h-[100vh] rotate-12 bg-secondary z-[-1]'></div> */}
//     <div className='w-fit text-6xl mb-16 drop-shadow-lg text-accent'>
//         Tools
//     </div>
//     <div className='max-w-[50%] flex flex-col items-center justify-center'>
//         <div className='w-fit text-3xl mb-12 drop-shadow-md text-accent text-center border-4 border-white p-3 rounded-lg translate-x-16 translate-y-4'>
//             Free-form organizing power - no more lists
//         </div>
//         <div className='w-fit text-3xl mb-12 drop-shadow-md text-accent text-center border-4 border-white p-3 rounded-lg translate-x-[-3rem] translate-y-2'>
//             Add links directly to your project - no more "tabzilla"
//         </div>
//         <div className='w-fit text-3xl drop-shadow-md text-accent text-center border-4 border-white p-3 rounded-lg translate-x-24 translate-y-12'>
//             AI integrated tools for high-efficiency work 
//         </div>
//     </div>
// </div>


function HomeOther() {
  return (
    <>
      <NavigationBar>
        <div style={{ marginLeft: "auto" }}>
          <Button variant={"ghost"} className="text-lg" asChild>
            <Link href={"/discover"}>Discover</Link>
          </Button>
        </div>
      </NavigationBar>
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
                  Add links directly to your project - no more {"tabzilla"}
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
    </>
  )
}
