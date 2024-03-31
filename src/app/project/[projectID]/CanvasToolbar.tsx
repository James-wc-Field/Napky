import React, { forwardRef } from "react";
import ToolbarBtnElement from "@/project/[projectID]/ToolbarBtnElement";
import { ProjectElements } from "@/project/[projectID]/types/ProjectElements";
import { Card } from "@ui/card";
import { useDroppable } from "@dnd-kit/core";
import { Button } from "../../components/ui/button";
import { Save } from "lucide-react";
import * as htmlToImage from "html-to-image";
import useProject from "./hooks/useProject";

export const CanvasToolbar = forwardRef(function (props, ref: any) {
  const { } = useProject();
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
      <Button onClick={() => {
        htmlToImage.toJpeg(ref.current!).then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          link.href = dataUrl;
          link.click();
        });
      }} className="gap-1">
        <Save className="h-5 w-6" />
      </Button>
    </Card>
  );
});
