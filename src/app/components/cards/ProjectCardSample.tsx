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
  const image = "https://photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg";
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  

  return (
    <Card className="bg-card dark:bg-card h-fit w-cardW border-none"> 
    {/* <>shadow-2xl shadow-secondary</> */}
    <CardHeader className="p-2">
      <CardTitle className="">Project Name</CardTitle>
      <p>UserId</p>
    </CardHeader>
    <CardContent className="p-0">
      <div className="container px-0">
        {image? <img src={image} className=""/> : <MissingImage/>}
      </div>
      <div className="max-h-sampleD overflow-clip m-2">
        {description? <p>{description}</p>: <p>No description for this project</p>}
      </div>
    </CardContent>
  </Card>
  )
}