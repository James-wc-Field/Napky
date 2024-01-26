"use client";

import React from "react";
import { ProjectElement } from "./ProjectElements";
import { Card, cn } from "@nextui-org/react";
import { useDraggable } from "@dnd-kit/core";

export default function ToolbarBtnElement({
  projectElement,
}: {
  projectElement: ProjectElement;
}) {
  const { label, icon: Icon } = projectElement.toolbarElement;
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `builder-btn-${projectElement.type}`,
    data: {
      type: projectElement.type,
      isToolbarBtnElement: true,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab justify-center items-center",
        isDragging && "ring-2 ring-primary"
      )}
      {...listeners}
      {...attributes}
    >
      <Icon className="h-8 w-8 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Card>
  );
}
