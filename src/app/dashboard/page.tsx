import { Suspense } from "react";
import DashboardPage from "./dashboard";
import { getAllUserProjects } from "./api";
import { Button } from "@ui/button";
import Link from "next/link";
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
        url: og_image.src
      }
    ],
    siteName: 'Korkbo.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korkbo.com',
    description: 'A modern project organization tool.',
    images: [og_image.src],
  },
}

export default async function Page() {
  const currentUser = await currentAuthenticatedUser();
  if (!currentUser)
    return (
      <>
        <p>Not authenticated</p>
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </>
    );

  const projects: Project[] = await getAllUserProjects();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage projects={projects} />
    </Suspense>
  );
}
