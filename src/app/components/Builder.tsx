"use client";

import React from "react";
import Toolbar from "./BuilderToolbar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import Canvas from "./Canvas";
import useProject from "./hooks/useProject";
import { ElementsType, ProjectElements } from "./ProjectElements";
import { idGenerator } from "../lib/idGenerator";

export default function Builder() {
  const { elements, addElement, setElementPos } = useProject();
  const droppable = useDroppable({
    id: "builder-drop-area",
    data: {
      isBuilderDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isToolbarBtnElement = active.data?.current?.isToolbarBtnElement;

      if (isToolbarBtnElement) {
        const type = active.data?.current?.type;
        const newElement = ProjectElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(newElement);
        console.log("NEW ELEMENT:", newElement);
      } else {
        const { active, over, delta } = event;
        const dragged = elements.find((item) => item.id === active.id);
        if (!dragged) return;

        dragged.position.x += delta.x;
        dragged.position.y += delta.y;

        setElementPos(dragged, dragged.position.x, dragged.position.y);
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
