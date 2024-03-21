import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card"
import { MissingImage } from "./MissingImage"

export function ProjectCard() {
  const image = "";
  const description = "";
  

  return (
    <Card className="bg-card dark:bg-card h-fit w-cardSW border-none"> 
    {/* <>shadow-2xl shadow-secondary</> */}
    <CardHeader className="p-2">
      <CardTitle className="">Project Name</CardTitle>
      <p>UserId</p>
    </CardHeader>
    <CardContent className="p-0">
      <div className="container px-0">
        {image? <img src={image} className=""/> : <MissingImage/>}
      </div>
      <div className="max-h-sampleDesc overflow-clip m-2">
        {description? <p>{description}</p>: <p>No description for this project</p>}
      </div>
    </CardContent>
  </Card>
  )
}