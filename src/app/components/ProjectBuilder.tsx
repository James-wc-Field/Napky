"use client";

import React, { useEffect, useId } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from "@dnd-kit/core";

import { Project } from "../project/SchemaSimulation";
import SaveProjectBtn from "./SaveProjectBtn";
import BuildArea from "./BuildArea";
import DragOverlayWrapper from "./DragOverlayWrapper";

function ProjectBuilder({ project }: { project: Project }) {
  const id = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 1 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );

  usePreventZoom();
  return (
    <DndContext id={id} sensors={sensors} collisionDetection={pointerWithin}>
      <main className="flex flex-col w-full h-full">
        <div className="flex justify-between border-b-1 border-slate-500 p-2 gap-2 items-center">
          <h2 className="truncate font-medium">
            <span className="mr-2">Project:</span>
            {project.name}
          </h2>
          <SaveProjectBtn />
        </div>
        <BuildArea />
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default ProjectBuilder;

/**
 * Prevents default zoom behavior (zooming the entire page,
 *  including nav- and toolbar) when using the mouse wheel
 */
function usePreventZoom() {
  useEffect(() => {
    function preventZoom(e: WheelEvent) {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    }

    window.addEventListener("wheel", preventZoom, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventZoom);
    };
  }, []);
}
