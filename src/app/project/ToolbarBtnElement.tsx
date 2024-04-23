"use client";

import React from "react";
import { ProjectElement } from "@/[projectID]/types/ProjectElements";
import { Button } from "@ui/button";
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
    <Button
      ref={setNodeRef}
      className="flex flex-col w-full h-full aspect-square p-2 gap-1 cursor-grab"
      variant={"outline"}
      {...listeners}
      {...attributes}
    >
      <Icon className="w-4 h-4" />
      <p className="text-xs font-normal">{label}</p>
    </Button>
  );
}
