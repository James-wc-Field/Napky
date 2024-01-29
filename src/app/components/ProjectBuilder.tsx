"use client";

import React, { useId } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import { Project } from "../builder/SchemaSimulation";
import SaveProjectBtn from "./SaveProjectBtn";
import DragOverlayWrapper from "./DragOverlayWrapper";
import Toolbar from "./BuilderToolbar";
import Canvas from "./Canvas";
import useProject from "./hooks/useProject";
import { ElementsType, ProjectElements } from "./ProjectElements";
import { idGenerator } from "../lib/idGenerator";

function ProjectBuilder({ project }: { project: Project }) {
  const id = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 1 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );

  const { elements, addElement } = useProject();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over, delta } = event;
    if (!active || !over) return;

    const isToolbarBtnElement = active.data?.current?.isToolbarBtnElement;
    if (isToolbarBtnElement) {
      const type = active.data?.current?.type;
      const newElement = ProjectElements[type as ElementsType].construct(
        idGenerator()
      );
      const canvasTop = over.rect.top;
      const canvasLeft = over.rect.left;
      const initialTop = active.rect.current.initial?.top || canvasTop;
      const initialLeft = active.rect.current.initial?.left || canvasLeft;
      const diffX = canvasLeft - initialLeft;
      const diffY = canvasTop - initialTop;

      addElement(newElement, delta.x - diffX, delta.y - diffY);
      console.log("NEW ELEMENT:", newElement);
    }

    const isCanvasElement = active.data?.current?.isCanvasElement;
    if (isCanvasElement) {
      const elementId = active.data?.current?.elementId;
      const dragged = elements.find((element) => element.id == elementId);

      if (!dragged) return;

      dragged.position.x += delta.x;
      dragged.position.y += delta.y;

      console.log("DRAGGED:", dragged);
    }
  }

  // Handlers for external file drop
  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    console.log(e.dataTransfer.items[0].getAsFile());
    console.log(e.dataTransfer.files);
    const f: File | null = e.dataTransfer.items[0].getAsFile();
    const type = "ImageBlock";
    const newElement = ProjectElements[type as ElementsType].construct(
      idGenerator()
    );
    addElement(newElement, 0, 0);

    e.preventDefault();
  }

  return (
    <DndContext id={id} sensors={sensors} onDragEnd={handleDragEnd}>
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
        overflow-y-auto h-[200px] bg-[url(/paper.svg)] dark:bg-[url(/dark-paper.svg)]"
        >
          <div className="flex w-full h-full">
            <Toolbar />
            <div
              id="file-drop-area"
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e)}
              className="flex grow"
            >
              <Canvas elements={elements} />
            </div>
          </div>
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default ProjectBuilder;
