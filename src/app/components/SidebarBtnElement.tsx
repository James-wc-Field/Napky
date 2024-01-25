"use client";

import React from "react";
import { ProjectElement } from "./ProjectElements";
import { Button, Card, cn } from "@nextui-org/react";
import { useDraggable } from "@dnd-kit/core";

export default function SidebarBtnElement({
  projectElement,
}: {
  projectElement: ProjectElement;
}) {
  const { label, icon: Icon } = projectElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${projectElement.type}`,
    data: {
      type: projectElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Card
      onPressChange={(e) => {}}
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

export function SidebarBtnElementDragOverlay({
  projectElement,
}: {
  projectElement: ProjectElement;
}) {
  const { label, icon: Icon } = projectElement.designerBtnElement;

  return (
    <Button
      variant="bordered"
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
    >
      <Icon className="h-8 w-8 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
