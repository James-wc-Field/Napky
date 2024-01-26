import {
  Active,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDndMonitor,
} from "@dnd-kit/core";
import React, { useState } from "react";
import { ElementsType, ProjectElements } from "./ProjectElements";
import { ToolbarBtnElementDragOverlay } from "./ToolbarBtnElement";

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event: DragStartEvent) => {
      setDraggedItem(event.active);
    },
    onDragCancel: (event: DragCancelEvent) => {
      setDraggedItem(null);
    },
    onDragEnd: (event: DragEndEvent) => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
  const isToolbarBtnElement = draggedItem.data?.current?.isToolbarBtnElement;

  if (isToolbarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = (
      <ToolbarBtnElementDragOverlay projectElement={ProjectElements[type]} />
    );
  } else {
    node = <div>Dragged element</div>;
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
