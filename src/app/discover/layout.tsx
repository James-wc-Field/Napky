import Image from 'next/image';
import { Lusitana, Rubik_Maze } from 'next/font/google';
import  { NavigationBar } from "@/app/components/navigation/NavigationBar";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className='bg-background-light dark:bg-background-dark'>
        {/* Include shared UI here e.g. a header or sidebar */}
        {children}
      </section>
    )
  }
