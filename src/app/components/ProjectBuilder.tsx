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
import { TransformWrapper } from "react-zoom-pan-pinch";

function ProjectBuilder({ project }: { project: Project }) {
  const id = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 1 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );

  const { elements, addElement, updateElement } = useProject();
  const scrollableRef = React.useRef<HTMLDivElement>(null);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over, delta, collisions } = event;
    if (!active || !over) return;

    const scrolledleft = scrollableRef.current?.scrollLeft || 0;
    const scrolledTop = scrollableRef.current?.scrollTop || 0;

    // Create new element
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

      addElement(
        newElement,
        delta.x - diffX - scrolledleft,
        delta.y - diffY - scrolledTop
      );
      console.log("NEW ELEMENT:", newElement);
    }

    // Drag existing element
    const isCanvasElement = active.data?.current?.isCanvasElement;
    if (isCanvasElement) {
      const elementId = active.data?.current?.elementId;
      const dragged = elements.find((element) => element.id == elementId);

      if (!dragged) return;

      updateElement(dragged.id, {
        ...dragged,
        position: {
          x: dragged.position.x + delta.x,
          y: dragged.position.y + delta.y,
        },
      });

      console.log("DRAGGED:", dragged);
      console.log(dragged.position.x, dragged.position.y);
    }
  }

  // Handler for external file drop
  function externalDropHandler(e: React.DragEvent<HTMLDivElement>) {
    if (!e.dataTransfer.items) return;

    for (const file of Array.from(e.dataTransfer.files)) {
      console.log("FILE:", file);

      const reader = new FileReader();

      reader.onload = (event) => {
        const src = event.target?.result as string;
        const type = "ImageBlock";
        const newElement = ProjectElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(newElement);
        updateElement(newElement.id, {
          ...newElement,
          extraAttributes: {
            ...newElement.extraAttributes,
            src: src,
          },
        });
      };

      reader.readAsDataURL(file);
    }
    e.preventDefault();
  }

  return (
    <DndContext id={id} sensors={sensors} onDragEnd={handleDragEnd}>
      <main className="flex flex-col w-full h-full">
        {/* Top bar */}
        <div className="flex justify-between border-b-1 border-slate-500 p-2 gap-2 items-center">
          <h2 className="truncate font-medium">
            <span className="mr-2">Project:</span>
            {project.name}
          </h2>
          <SaveProjectBtn />
        </div>

        {/* Toolbar/Canvas area */}
        <div className="flex flex-row grow">
          <Toolbar /> {/* Toolbar is set to flex-none */}
          <div
            id="file-drop-area"
            onDrop={(e) => externalDropHandler(e)}
            onDragOver={(e) => e.preventDefault()}
            className="relative flex-1"
          >
            <Canvas elements={elements} scrollableRef={scrollableRef} />
          </div>
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default ProjectBuilder;
