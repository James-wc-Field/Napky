import {
  Active,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  Modifier,
  useDndMonitor,
} from "@dnd-kit/core";
import React, { useState } from "react";
import { ElementsType, ProjectElements } from "./ProjectElements";
import useProject from "./hooks/useProject";

export default function DragOverlayWrapper() {
  const { elements, zoomLevel } = useProject();
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
    const element = elements.find((element) => element.id === elementId);
    if (element?.type === "ImageBlock") return null; // Don't show overlay for images, causes flicker

    if (!element) return <div>Dragged element not found</div>;

    const CanvasElementComponent =
      ProjectElements[element.type].canvasComponent;
    node = <CanvasElementComponent elementInstance={element} />;
  }

  const compensateScale: Modifier = ({ transform, over }) => {
    if (!over)
      return {
        ...transform,
        scaleX: zoomLevel,
        scaleY: zoomLevel,
      };
    if (over.id === "canvas-drop-area")
      return {
        ...transform,
        scaleX: zoomLevel,
        scaleY: zoomLevel,
      };
    return transform;
  };

  return (
    <DragOverlay
      style={{ transformOrigin: "0 0" }}
      adjustScale
      modifiers={[compensateScale]}
    >
      {node}
    </DragOverlay>
  );
}
