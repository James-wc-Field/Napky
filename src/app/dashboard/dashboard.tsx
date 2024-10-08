"use client";

import { Card } from "@ui/card";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Input } from "@ui/input";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from 'react';
import { Project } from "@src/API";
import { createNewProject } from "./api";
import { getPreviewUrl } from "./clientapi";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/components/cards/ProjectCard";

type props = {
  projects: Project[];
};

export default function DashboardPage(props: props) {
  const { projects } = props;
  const router = useRouter();
  return (
    <div className="flex flex-col h-full">
      <div
        className="container max-w-screen-2xl p-3 flex flex-row gap-3 max-h-base" /* <--- TODO: Fix this magic number at some point */>
        <Card className="flex basis-1/4 flex-col p-2">
          <Button size="lg" className="w-full" onClick={async () => router.push(`../project/${await createNewProject()}`)}>
            Create Project
          </Button>
          <Separator className="my-4" />
          {/* Home, favorites, trash */}
          <nav className="flex flex-col gap-2">
          </nav>
        </Card>
        <Card className="flex flex-col basis-3/4 gap-2 lg:basis-5/6  bg-background">
          <div className="flex flex-row items-center gap-2 p-2">
            <Input
              type="search"
              placeholder="Search Projects..."
              className="flex-1"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Filter</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Most Recent</DropdownMenuItem>
                  <DropdownMenuItem>Most Popular</DropdownMenuItem>
                  <DropdownMenuItem>Most Funded</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Ascending</DropdownMenuItem>
                  <DropdownMenuItem>Descending</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ScrollArea className="p-2 max-h-full">
            <Suspense fallback={<p>Loading...</p>}>
              <div className="flex flex-wrap gap-4">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </Suspense>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
