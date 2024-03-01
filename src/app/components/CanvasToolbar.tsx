import React from "react";
import ToolbarBtnElement from "./ToolbarBtnElement";
import { ProjectElements } from "./ProjectElements";
import { Card } from "@nextui-org/react";
import { useDroppable } from "@dnd-kit/core";

export default function CanvasToolbar() {
  const { setNodeRef } = useDroppable({
    id: "toolbar-area",
    data: { isToolbar: true },
  });
  return (
    <Card
      ref={setNodeRef}
      className="absolute top-4 left-4 gap-2 p-2"
      style={{ zIndex: 5 }}
    >
      <ToolbarBtnElement projectElement={ProjectElements.TextBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.LinkBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.ListBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.TodoBlock} />
    </Card>
  );
}
