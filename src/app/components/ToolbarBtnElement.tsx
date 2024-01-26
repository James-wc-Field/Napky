"use client";

import React, { useId } from "react";
import { ProjectElement } from "./ProjectElements";
import { Card, cn } from "@nextui-org/react";
import { useDraggable } from "@dnd-kit/core";

export default function ToolbarBtnElement({
  projectElement,
}: {
  projectElement: ProjectElement;
}) {
  const { label, icon: Icon } = projectElement.toolbarElement;
  const draggable = useDraggable({
    id: `builder-btn-${projectElement.type}`,
    data: {
      type: projectElement.type,
      isToolbarBtnElement: true,
    },
  });
  const id = useId();

  return (
    <Card
      id={id}
      ref={draggable.setNodeRef}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab justify-center items-center",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Card>
  );
}

export function ToolbarBtnElementDragOverlay({
  projectElement,
}: {
  projectElement: ProjectElement;
}) {
  const { label, icon: Icon } = projectElement.toolbarElement;
  const id = useId();

  return (
    <Card
      id={id}
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab justify-center items-center"
    >
      <Icon className="h-8 w-8 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Card>
  );
}
