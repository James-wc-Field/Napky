"use client";

import { Card, CardHeader, CardFooter, CardContent, CardTitle } from "@ui/card";
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

import Link from "next/link";
import { ThemeToggle } from "@components/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardPage() {
  return (
      <div
        className="container max-w-screen-2xl p-3 flex flex-row gap-3 max-h-base" /* <--- TODO: Fix this magic number at some point */
      >
        <Card className="flex basis-1/4 flex-col p-2">
          {/* This is angry for some reason */}
          <Button size="lg" asChild className="w-full"> 
            <Link href="/project/123">Create Project</Link>
          </Button>
          <Separator className="my-4" />
          {/* Home, favorites, trash */}
          <nav className="flex flex-col gap-2">
          </nav>
        </Card>
        <Card className="flex flex-col basis-3/4 gap-2 lg:basis-5/6">
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <ProjectCard
                  key={i}
                  title={`Project ${i + 1}`}
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
  );
}

function ProjectCard({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button>View</Button>
      </CardFooter>
    </Card>
  );
}
