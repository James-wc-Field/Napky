import React, { forwardRef } from "react";
import ToolbarBtnElement from "@/project/[projectID]/ToolbarBtnElement";
import { ProjectElements } from "@/project/[projectID]/types/ProjectElements";
import { Card } from "@ui/card";
import { useDroppable } from "@dnd-kit/core";
import { Button } from "../../components/ui/button";
import { Save } from "lucide-react";
import * as htmlToImage from "html-to-image";
import { uploadImage } from "./clientapi";
import { TrashIcon } from "@heroicons/react/24/solid";

export const CanvasToolbar = forwardRef(function (props, ref: any) {
  const { setNodeRef } = useDroppable({
    id: "toolbar-area",
    data: { isToolbar: true },
  });
  return (
    <Card
      ref={setNodeRef}
      className="absolute top-4 left-4 flex flex-col p-2 gap-2"
      style={{ zIndex: 5 }}
    >
      <ToolbarBtnElement projectElement={ProjectElements.TextBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.LinkBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.ListBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.TodoBlock} />
      <Trash />
    </Card>
  );
})


export function Trash() {
  const { isOver, setNodeRef } = useDroppable({
    id: "trash-list-droppable",
    data: { isTrash: true },
  });
  return (
    <Button ref={setNodeRef} className={`gap-1 ${isOver ? "bg-red-200" : ""}`}>
      <TrashIcon className="h-6 w-6" />
    </Button>
  )
}
