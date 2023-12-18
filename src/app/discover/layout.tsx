import Image from 'next/image';
import { Lusitana, Rubik_Maze } from 'next/font/google';

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <div className="bg-main_purple h-fit max-w-full">
          <Image 
          src='/icon.png'
          height={80}
          width={80}
          className='ml-5 inline-block'
          alt='This is the filler Icon'
          />
          <span className='inline-block align-bottom pb-4 ml-5 font-extrabold text-5xl'>Napkey</span>
          </div>
   
        {children}
      </section>
    )
  }
