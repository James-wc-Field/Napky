"use client";

import { Card, cn } from "@nextui-org/react";
import React from "react";
import DesignerSidebar from "./DesignerSidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";

export default function Designer() {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      console.log(
        "DRAG END:",
        `x=${event.delta.x.toFixed(2)}`,
        `y=${event.delta.x.toFixed(2)}`
      );
    },
  });

  return (
    <div className="flex w-full h-full">
      <DesignerSidebar />
      <div className="p-4 w-full">
        <Card
          ref={droppable.setNodeRef}
          className={cn(
            "max-w-[920px] h-full m-auto flex flex-col grow \
            items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        ></Card>
      </div>
    </div>
  );
}
