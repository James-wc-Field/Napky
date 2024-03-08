"use client";
import Image from "next/image";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@ui/dialog";
import { Card, CardHeader, CardContent } from "@ui/card";
import { Label } from "@ui/label";
import { Input } from "@ui/input";

export default function Page(projectID: string) {
  // database call to get project data
  // loading dummy data for now

  return (
    <Card key={projectID}>
      <CardHeader className="py-2 flex-col items-start">
        <h1 className="text-xl font-bold">Project: {projectID}</h1>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Image
          width={300}
          height={200}
          alt="Project Image"
          src="/images/placeholder.jpg"
          className="rounded-md"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Project {projectID}</DialogTitle>
            </DialogHeader>
            <Image
              width={300}
              height={200}
              alt="Project Image"
              src="/images/placeholder.jpg"
              className="rounded-md"
            />
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              quisquam, voluptatibus, voluptatum veritatis doloribus reiciendis
              aperiam ipsam accusantium eum aliquam nesciunt aspernatur expedita
              sequi atque voluptatem a, autem debitis dolor?
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
