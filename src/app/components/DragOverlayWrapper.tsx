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
import useProject from "./hooks/useProject";

export default function DragOverlayWrapper() {
  const { elements } = useProject();
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
    const type = draggedItem.data?.current?.type;
    const CanvasElementComponent =
      ProjectElements[type as ElementsType].canvasComponent;
    const tempElement = ProjectElements[type as ElementsType].construct(
      "new-element-drag-overlay"
    );
    node = <CanvasElementComponent elementInstance={tempElement} />;
  }

  const isCanvasElement = draggedItem.data?.current?.isCanvasElement;
  if (isCanvasElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const draggedElement = elements.find((element) => element.id == elementId);

    if (!draggedElement) return <div>Dragged element not found</div>;

    const CanvasElementComponent =
      ProjectElements[draggedElement.type].canvasComponent;
    node = <CanvasElementComponent elementInstance={draggedElement} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
}
