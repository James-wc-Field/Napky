import Image from 'next/image';
import { Lusitana, Rubik_Maze } from 'next/font/google';
import  { NavigationBar } from "@components/navigation/NavigationBar";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        {children}
      </section>
    )
  }
