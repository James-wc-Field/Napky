"use client";
import React, { useId } from "react";
import {
  DndContext,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  PointerSensor,
} from "@dnd-kit/core";

import { Project } from "@src/API";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import useProject from "./hooks/useProject";
import { useEffect } from "react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import BuildArea from "@canvas/BuildArea";
import DragOverlayWrapper from "@canvas/DragOverlayWrapper";
import usePreventZoom from "@canvas/hooks/usePreventZoom";
import { ThemeToggle } from "@components/ThemeToggle";
import { saveProject } from "@/project/[projectID]/api";

export default function ProjectBuilder({ project }: { project: Project }) {
  const { loadElements } = useProject();
  useEffect(() => {
    if (project) {
      loadElements(JSON.parse(project.content || "[]"));
    }
  }, [project]);
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
        <main className="flex flex-col w-full h-full max-h-screen">
          <div className="flex justify-between border-b-1 border-slate-500 p-2 gap-2 items-center">
            <h2 className="truncate font-medium">
              <span className="mr-2">
                Project:
                <Input
                  placeholder={project.name}
                  onChange={(e) => updateProjectName(e.target.value)}
                ></Input>
              </span>
            </h2>
            <ThemeToggle />
            <Button
              className="gap-1"
              onClick={() => saveProject(project.id, projectName, elements)}
            >
              <DocumentCheckIcon className="h-5 w-6" />
              <p>Save</p>
            </Button>
          </div>

          <BuildArea />
        </main>
        <DragOverlayWrapper />
      </DndContext>
    // </body>
  );
}
