import { Card, CardContent, CardTitle } from "@ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Project } from "../../../API";
import Link from "next/link";

interface ProjectsProps {
  project: Project;
}

export function ProjectCardDetails(props: ProjectsProps) {
  const { project } = props;

  return (
    <Card className="bg-card dark:bg-card border-none rounded-md p-2">
      <CardContent className="flex h-full w-full">
        <div className="flex flex-col w-full h-full">
          <CardTitle>{project.name}</CardTitle>
          <p>{project.userId}</p>
          <div className="container px-0">
            <Image
              src={"/images/placeholder.jpg"}
              width={300}
              height={200}
              alt={"Placeholder"}
              className="rounded-md select-none"
            />
          </div>
          <p>Date Created: {project.createdAt.substring(0, 10)}</p>
          <p>Date Modified: {project.updatedAt.substring(0, 10)}</p>
          <div className="flex h-full items-end pb-3">
            <Button className="text-4xl h-fit w-full py-3 rounded-full" asChild>
              <Link href={`../project/${project.id}`}>View</Link>
            </Button>
          </div>
        </div>
        <div className="w-full h-full p-2">
          <p className="text-2xl">Description</p>
          <ScrollArea className="border-solid border-2 h-[100px] w-full rounded-2xl p-2 bg-content">
            <p className="m-1">{project.description}</p>
          </ScrollArea>
          <p className="text-2xl mt-2">Comments</p>
          <ScrollArea className="border-solid border-2 h-[200px] w-full rounded-2xl p-2 bg-content">
            <p className="m-1">Map Comments Here</p>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
