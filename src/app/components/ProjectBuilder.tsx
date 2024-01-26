"use client";

import React, { useId } from "react";
import { Project } from "../builder/SchemaSimulation";
import SaveProjectBtn from "./SaveProjectBtn";
import Designer from "./Designer";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import Canvas from "./Canvas";

function ProjectBuilder({ project }: { project: Project }) {
  const id = useId();
  return (
    <div className="flex flex-col w-full">
      <DndContext id={id}>
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
            <Designer />
          </div>
        </main>
        <DragOverlayWrapper />
      </DndContext>
      <Canvas />
    </div>
  );
}

export default ProjectBuilder;
