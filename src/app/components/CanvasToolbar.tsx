import React from "react";
import ToolbarBtnElement from "./ToolbarBtnElement";
import { ProjectElements } from "./ProjectElements";
import { Card } from "@components/ui/card";
import { useDroppable } from "@dnd-kit/core";
import { Separator } from "@radix-ui/react-separator";

export default function CanvasToolbar() {
  const { setNodeRef } = useDroppable({
    id: "toolbar-area",
    data: { isToolbar: true },
  });
  return (
    <Card
      ref={setNodeRef}
      className="absolute top-4 left-4 flex flex-col p-2 gap-2 rounded-2xl dark:bg-zinc-900 shadow-md w-fit h-fit"
      style={{ zIndex: 5 }}
    >
      <ToolbarBtnElement projectElement={ProjectElements.TextBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.LinkBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.ListBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.TodoBlock} />
    </Card>
  );
}
