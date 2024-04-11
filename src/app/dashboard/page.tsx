import { Suspense } from "react";
import DashboardPage from "./dashboard";
import { getAllUserProjects } from "./api";
import { Project } from "@src/API";
import { currentAuthenticatedUser } from "@/lib/auth";
import { Metadata } from "next";


export const metadata: Metadata = {
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

export default async function Page() {
  const projects: Project[] = await getAllUserProjects();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage projects={projects} />
    </Suspense>
  );
}
