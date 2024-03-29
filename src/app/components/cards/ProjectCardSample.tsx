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

interface ProjectsProps {
  project: Project;
}

export function ProjectCard(props: ProjectsProps) {
  const { project } = props;


  return (
    <Card className="bg-card dark:bg-card h-fit w-cardSW border-none">
      {/* <>shadow-2xl shadow-secondary</> */}
      <CardHeader className="p-2">
        <CardTitle className="">{project.name}</CardTitle>
        <p>{project.userId}</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="container px-0">
          <Image
            src={"/images/placeholder.jpg"}
            width={300}
            height={200}
            alt={"Placeholder"}
            className="rounded-md select-none"
          />
        </div>
        <div className="max-h-sampleDesc overflow-clip m-2">
          {project ? <p>{project.description}</p> : <p>No description for this project</p>}
        </div>
      </CardContent>
      <Button className="text-2xl h-fit m-2 py-1 rounded-full" asChild>
        <Link href={`../project/${project.id}`}>View</Link>
      </Button>
    </Card>
  )
}