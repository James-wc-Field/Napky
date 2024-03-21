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

export function ProjectCardDetails() {
  const image = "https://webneel.com/daily/sites/default/files/images/daily/05-2018/portrait-photography-by-dennis-drozhzhin.jpg";
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa enim nec dui nunc. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Tincidunt dui ut ornare lectus sit amet est. Elit eget gravida cum sociis natoque penatibus et magnis. Imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor. Integer enim neque volutpat ac. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Ultrices sagittis orci a scelerisque purus semper. In fermentum et sollicitudin ac orci phasellus egestas. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Sit amet porttitor eget dolor. Mi bibendum neque egestas congue quisque egestas diam in. Tincidunt dui ut ornare lectus sit amet. Fames ac turpis egestas maecenas. Enim neque volutpat ac tincidunt vitae semper quis lectus. In mollis nunc sed id. Id consectetur purus ut faucibus pulvinar elementum. Tincidunt id aliquet risus feugiat. Nisi est sit amet facilisis. Ante in nibh mauris cursus mattis molestie a. Sit amet nisl suscipit adipiscing bibendum est. Molestie at elementum eu facilisis sed odio morbi. Enim sed faucibus turpis in eu mi bibendum. Orci dapibus ultrices in iaculis. Risus pretium quam vulputate dignissim suspendisse in est ante in. Proin sed libero enim sed faucibus. Ut consequat semper viverra nam. Vitae justo eget magna fermentum iaculis. Lacus vel facilisis volutpat est velit egestas dui id ornare. Ipsum a arcu cursus vitae congue mauris. Elit eget gravida cum sociis natoque penatibus et magnis. Enim diam vulputate ut pharetra. Aliquam vestibulum morbi blandit cursus risus. In hac habitasse platea dictumst. Consectetur a erat nam at lectus urna. Cursus in hac habitasse platea dictumst quisque sagittis. Id faucibus nisl tincidunt eget nullam non. Vel elit scelerisque mauris pellentesque. Velit sed ullamcorper morbi tincidunt ornare. Semper quis lectus nulla at volutpat diam. Id venenatis a condimentum vitae. Eget gravida cum sociis natoque. Pellentesque massa placerat duis ultricies. Lobortis mattis aliquam faucibus purus in. Consectetur lorem donec massa sapien faucibus et molestie. Et tortor at risus viverra adipiscing at in tellus integer. Turpis nunc eget lorem dolor sed. Ipsum faucibus vitae aliquet nec. Et ligula ullamcorper malesuada proin libero. Eu consequat ac felis donec et odio pellentesque diam volutpat. Odio eu feugiat pretium nibh ipsum. Ipsum suspendisse ultrices gravida dictum. Est pellentesque elit ullamcorper dignissim cras. Eu turpis egestas pretium aenean pharetra magna. Euismod quis viverra nibh cras. Risus in hendrerit gravida rutrum quisque non tellus. Ultricies mi quis hendrerit dolor magna eget est lorem. Blandit massa enim nec dui nunc. Consectetur adipiscing elit pellentesque habitant. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Fringilla ut morbi tincidunt augue interdum velit. Vitae ultricies leo integer malesuada nunc vel risus commodo. Elit at imperdiet dui accumsan sit amet nulla facilisi morbi. Et malesuada fames ac turpis egestas integer eget aliquet nibh. Amet cursus sit amet dictum sit amet justo donec. Mattis nunc sed blandit libero volutpat. Euismod elementum nisi quis eleifend quam adipiscing. Dictum sit amet justo donec enim diam vulputate ut pharetra. Lacus viverra vitae congue eu consequat ac. Et malesuada fames ac turpis egestas maecenas pharetra. Sed libero enim sed faucibus turpis. Nullam eget felis eget nunc lobortis mattis aliquam faucibus. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Lorem dolor sed viverra ipsum nunc. Arcu odio ut sem nulla pharetra. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis.";

  return (
    <Card className="bg-card dark:bg-card h-cardDH w-cardDW border-none rounded-[2rem]">
      <CardContent className="flex m-3 h-full w-full">
        <div className="flex flex-col w-[600px] bg-content h-full">
          <CardTitle>Project Name</CardTitle>
          <p>UserName</p>
          <div className="container px-0">
            {image? <img src={image} className="rounded-2xl"/> : <MissingImage/>}
          </div>
          <p>Date Created: {}</p>
          <p>Date Modified: {}</p>
          <div className="flex h-full items-end pb-3">
            <Button className="text-4xl h-fit w-full py-3 rounded-full">Open Project</Button>
          </div>
        </div>
        <div className="w-full h-full p-2">
          <p className="text-2xl">Description</p>
          <ScrollArea className="border-solid border-2 h-[200px] w-full rounded-2xl p-2">
            <p className="m-1">{description}</p>
          </ScrollArea>
          <p className="text-2xl mt-2">Comments</p>
          <ScrollArea className="border-solid border-2 h-[400px] w-full rounded-2xl p-2">
            <p className="m-1">Map Comments Here</p>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}