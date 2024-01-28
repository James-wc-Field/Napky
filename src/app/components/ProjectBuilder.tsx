"use client";

import React, { useId } from "react";
import { Project } from "../builder/SchemaSimulation";
import SaveProjectBtn from "./SaveProjectBtn";
import Builder from "./Builder";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";

function ProjectBuilder({ project }: { project: Project }) {
  const id = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 2, delay: 75 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
  );

  return (
    <DndContext id={id} sensors={sensors}>
      <main className="flex flex-col w-full">
        <div className="flex justify-between border-b-1 border-slate-500 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="mr-2">Project:</span>
            {project.name}
          </h2>
          <SaveProjectBtn />
        </div>
        <div
          className="flex w-full flex-grow items-center justify-center
        relative overflow-y-auto h-[200px] bg-[url(/paper.svg)] dark:bg-[url(/dark-paper.svg)]"
        >
          <Builder />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default ProjectBuilder;
