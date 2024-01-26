"use client";

import React from "react";
import Toolbar from "./BuilderToolbar";
import { DragEndEvent, useDndMonitor } from "@dnd-kit/core";
import Canvas from "./Canvas";
import useProject from "./hooks/useProject";
import { ElementsType, ProjectElements } from "./ProjectElements";
import { idGenerator } from "../lib/idGenerator";

export default function Builder() {
  const { elements, addElement } = useProject();

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
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
    },
  });

  return (
    <div className="flex w-full h-full">
      <Toolbar />
      <Canvas elements={elements} />
    </div>
  );
}
