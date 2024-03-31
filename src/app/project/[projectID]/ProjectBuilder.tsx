"use client";
import React, { useId, useMemo, useRef } from "react";
import {
  DndContext,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  PointerSensor,
} from "@dnd-kit/core";

import { Project } from "@src/API";
import { Save } from "lucide-react";
import useProject from "./hooks/useProject";
import { useEffect } from "react";
import BuildArea from "@/project/[projectID]/BuildArea";
import DragOverlayWrapper from "@/project/[projectID]/DragOverlayWrapper";
import usePreventZoom from "@/project/[projectID]/hooks/usePreventZoom";
import { ThemeToggle } from "@components/ThemeToggle";
import * as htmlToImage from "html-to-image";
import { saveProject } from "@/project/[projectID]/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function ProjectBuilder({ project }: { project: Project }) {
  const { useLoadElements, updateKey } = useProject();
  useLoadElements(project)
  // This stops the scrolling ability
  // document.body.style.overflow = "hidden";
  // Remove this if it causes issues with scrolling on the other pages. 
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = "hidden"
    }
  }, []);
  const id = useId();
  const { elements, updateProjectName, projectName } = useProject();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 2 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );
  usePreventZoom();

  return (
    <DndContext id={id} sensors={sensors} collisionDetection={pointerWithin}>
      <main className="flex flex-col w-full h-full max-h-90vh">

        {/* This is the Project "NavBar" */}
        <div className="flex border-b-1 border-border p-2 gap-2 items-center">
          <p className="truncate font-medium">Project</p>
          <span className="mr-2">
            <Input
              placeholder={project.name}
              onChange={(e) => updateProjectName(e.target.value)}
            />
          </span>
          <Button
            className="gap-1"
            onClick={() => saveProject(project.id, projectName, elements)
            }
          >
            <Save className="h-5 w-6" />
          </Button>
        </div>
        <BuildArea />
        <Popover>
          <PopoverTrigger asChild style={{ top: '95%', left: '50%', transform: 'translate(-50%, -50%)' }} className="absolute">
            <Button variant="outline">AI Summary</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">API Key</h4>
                <p className="text-sm text-muted-foreground">
                  Add your OpenAI API key here.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Input onChange={(e) => updateKey(e.target.value)}
                    id="width"
                    defaultValue=""
                    className="col-span-3 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
