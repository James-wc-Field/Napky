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

import { Project } from "@/project/SchemaSimulation";
import SaveProjectBtn from "@canvas/SaveProjectBtn";
import BuildArea from "@canvas/BuildArea";
import DragOverlayWrapper from "@canvas/DragOverlayWrapper";
import usePreventZoom from "@canvas/hooks/usePreventZoom";
import { ThemeToggle } from "@components/ThemeToggle";

export default function ProjectBuilder({ project }: { project: Project }) {
  const id = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 2 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );

  usePreventZoom();
  return (
    <DndContext id={id} sensors={sensors} collisionDetection={pointerWithin}>
      
      <main className="flex flex-col w-full h-full max-h-[90vh]">
        <BuildArea />
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
