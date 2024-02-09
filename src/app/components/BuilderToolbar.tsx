import React from "react";
import { ProjectElements } from "./ProjectElements";
import ToolbarBtnElement from "./ToolbarBtnElement";
import { useDroppable } from "@dnd-kit/core";

function Toolbar() {
  const { setNodeRef } = useDroppable({
    id: "toolbar-area",
    data: { isToolbar: true },
  });
  return (
    <aside
      ref={setNodeRef}
      className="flex-none flex flex-col gap-2 border-r-1 border-slate-500 p-2"
    >
      <ToolbarBtnElement projectElement={ProjectElements.TextBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.LinkBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.ListBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.TodoBlock} />
    </aside>
  );
}

export default Toolbar;
