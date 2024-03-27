import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card"
import { MissingImage } from "./MissingImage"
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Project } from '../../../API';
import Link from "next/link";

interface ProjectsProps {
  project: Project;
}

export function ProjectCardDetails(props: ProjectsProps) {
  const image = "";
  // "https://webneel.com/daily/sites/default/files/images/daily/05-2018/portrait-photography-by-dennis-drozhzhin.jpg"
  const { project } = props;

  return (
    <Card className="bg-card dark:bg-card h-cardDH w-cardDW border-none rounded-[2rem] p-2">
      <CardContent className="flex m-3 h-full w-full">
        <div className="flex flex-col w-[600px] h-full">
          <CardTitle>{project.name}</CardTitle>
          <p>{project.userId}</p>
          <div className="container px-0">
            {image? <img src={image} className="rounded-2xl"/> : <MissingImage/>}
          </div>
          <p>Date Created: {project.createdAt.substring(0,10)}</p>
          <p>Date Modified: {project.updatedAt.substring(0,10)}</p>
          <div className="flex h-full items-end pb-3">
            <Button className="text-4xl h-fit w-full py-3 rounded-full" asChild>
              <Link href={`../project/${project.id}`}>View</Link>
              </Button>
          </div>
        </div>
        <div className="w-full h-full p-2">
          <p className="text-2xl">Description</p>
          <ScrollArea className="border-solid border-2 h-[200px] w-full rounded-2xl p-2 bg-content">
            <p className="m-1">{project.description}</p>
          </ScrollArea>
          <p className="text-2xl mt-2">Comments</p>
          <ScrollArea className="border-solid border-2 h-[400px] w-full rounded-2xl p-2 bg-content">
            <p className="m-1">Map Comments Here</p>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}