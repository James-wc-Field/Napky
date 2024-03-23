import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card"
import { MissingImage } from "./MissingImage"
import { Project } from '../../../API';
import { Button } from "../ui/button";
import Link from "next/link";

interface ProjectsProps {
  project: Project;
}

export function ProjectCard(props: ProjectsProps) {
  const image = "";
  const { project } = props;
  

  return (
    <Card className="bg-card h-fit w-cardSW border-none"> 
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
    <Button className="text-2xl h-fit m-2 py-1 rounded-full" asChild>
      <Link href={`../project/${project.id}`}>View</Link>
    </Button>
  </Card>
  )
}