"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/card"
import Image from "next/image";
import { Project } from '../../../API';
import { Button } from "../ui/button";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ProjectCardDetails } from "./ProjectCardDetails";
import { MissingImage } from "./MissingImage";

interface ProjectsProps {
  project: Project;
}

export function ProjectCard(props: ProjectsProps) {
  const { project } = props;
  const image = "";
  function buttonPress() {
    console.log("button press: " + project.id);
  }

  return (
    <>
    <Dialog.Root modal={true}>
    <Card className="bg-card dark:bg-card h-fit w-cardSW border-none p-1"> 
    {/* <>shadow-2xl shadow-secondary</> */}
    <CardHeader className="p-2">
      <CardTitle className="">{project.name}</CardTitle>
      <p>{project.userId}</p>
    </CardHeader>
    <CardContent className="p-0">
      <div className="container px-0">
        {image? <img src={image} className=""/> : <MissingImage/>}
      </div>
      <div className="max-h-sampleDesc overflow-clip m-2">
        {project? <p>{project.description}</p>: <p>No description for this project</p>}
      </div>
    </CardContent>
    <div className="flex justify-center">
    <Dialog.Trigger asChild>
    <Button className="text-lg h-fit m-2 py-1 rounded-full" onClick={buttonPress}>
      View
    </Button>
    </Dialog.Trigger>
    <Button className="text-lg h-fit m-2 py-1 rounded-full" asChild>
      <Link href={`../project/${project.id}`}>Open</Link>
    </Button>
    </div>
  </Card>
  <Dialog.Portal>
  <Dialog.Overlay className="DialogOverlay">
    <Dialog.Content>
      <ProjectCardDetails project={project}/>
    </Dialog.Content>
  </Dialog.Overlay>
  </Dialog.Portal>
  </Dialog.Root>
    </>
  )
}