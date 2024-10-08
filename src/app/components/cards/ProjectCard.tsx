"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import Image from "next/image";
import { Project } from "../../../API";
import { Button } from "../ui/button";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent } from "@ui/dialog";
import { ProjectCardDetails } from "./ProjectCardDetails";
import { useEffect, useState } from "react";
import { getPreviewUrl } from "@/dashboard/clientapi";

interface ProjectsProps {
  project: Project;
}

export function ProjectCard(props: ProjectsProps) {
  const { project } = props;
  function buttonPress() {
    console.log("button press: " + project.id);
  }

  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    async function fetchPreviewUrl() {
      const url = await getPreviewUrl(project.id);
      if (!url) return;
      setUrl(url.href);
    }
    fetchPreviewUrl();
  });

  return (
    <Dialog>
      <Card className="bg-card dark:bg-card h-fit w-cardSW border-none p-1">
        {/* <>shadow-2xl shadow-secondary</> */}
        <CardHeader className="p-2">
          <CardTitle className="">{project.name}</CardTitle>
          <p>{project.userId}</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="container px-0">
            <Image
              src={url || "/images/placeholder.jpg"}
              width={300}
              height={200}
              alt={"Placeholder"}
              className="rounded-md select-none"
              unoptimized
            />
          </div>
          <div className="max-h-sampleDesc overflow-clip m-2">
            {project ? (
              <p>{project.description}</p>
            ) : (
              <p>No description for this project</p>
            )}
          </div>
        </CardContent>
        <div className="flex justify-center">
          <DialogTrigger asChild>
            <Button
              className="text-lg h-fit m-2 py-1 rounded-full"
              onClick={buttonPress}
            >
              View
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ProjectCardDetails project={project} />
          </DialogContent>
          <Button className="text-lg h-fit m-2 py-1 rounded-full" asChild>
            <Link href={`../project/${project.id}`}>Open</Link>
          </Button>
        </div>
      </Card>
    </Dialog>
  );
}
