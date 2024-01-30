import React from "react";
import { ProjectElements } from "./ProjectElements";
import ToolbarBtnElement from "./ToolbarBtnElement";

function Toolbar() {
  return (
    <aside
      className="max-w-fit flex flex-col grow gap-2
    border-r-1 border-slate-500 bg-background h-full p-2"
    >
      <ToolbarBtnElement projectElement={ProjectElements.TextBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.LinkBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.ImageBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.ListBlock} />
      <ToolbarBtnElement projectElement={ProjectElements.TodoBlock} />
    </aside>
  );
}

export default Toolbar;
