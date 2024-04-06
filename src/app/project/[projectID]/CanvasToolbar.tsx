import React from "react";
import ToolbarBtnElement from "@/project/[projectID]/ToolbarBtnElement";
import { ProjectElements } from "@/project/[projectID]/ProjectElements";
import { Card } from "@ui/card";
import { useDroppable } from "@dnd-kit/core";
import { Button } from "../../components/ui/button";
import { Save } from "lucide-react";

export default function CanvasToolbar() {
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
      <Button className="gap-1">
        <Save className="h-5 w-6" />
      </Button>
    </Card>
  );
}
