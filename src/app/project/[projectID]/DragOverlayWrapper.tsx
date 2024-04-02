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
import { ElementsType, ProjectElements } from "@/project/[projectID]/types/ProjectElements";
import { useProjectStore } from "./storeProvider";
import { useShallow } from "zustand/react/shallow";

export default function DragOverlayWrapper() {
  const removeSelectedElements = useProjectStore((state) => state.removeSelectedElements);
  const selectedElements = useProjectStore((state) => state.selectedElements);
  const elements = useProjectStore((state) => state.elements);
  const zoomLevel = useProjectStore((state) => state.zoomLevel);
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);


  useDndMonitor({
    onDragStart: (event: DragStartEvent) => {
      console.log("Drag start", event);
      setDraggedItem(event.active);
    },
    onDragCancel: (event: DragCancelEvent) => {
      setDraggedItem(null);
      removeSelectedElements();
    },
    onDragEnd: (event: DragEndEvent) => {
      setDraggedItem(null);
      removeSelectedElements();

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
      "new-element-drag-overlay",
      "root"
    );
    node = <CanvasElementComponent elementInstance={tempElement} />;
  }

  const isCanvasElement = draggedItem.data?.current?.isCanvasElement;
  const isListElement = draggedItem.data?.current?.isListElement;
  if (isCanvasElement || isListElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((element) => element.id === elementId);
    const isSelected = element?.selected;

    if (!element) return <div>Dragged element not found</div>;
    if (isSelected) {
      node = <>
        {selectedElements().map((element) => {
          const CanvasElementComponent =
            ProjectElements[element.type as ElementsType].canvasComponent;
          return <CanvasElementComponent key={element.id} elementInstance={element} />;
        })}</>;
    } else {
      const CanvasElementComponent =
        ProjectElements[element.type as ElementsType].canvasComponent;
      node = <CanvasElementComponent elementInstance={element} />;
    }
  }

  const overScale: Modifier = ({ transform, over }) => {
    if (!over?.data?.current?.isToolbar || !over) {
      return {
        ...transform,
        scaleX: zoomLevel,
        scaleY: zoomLevel,
      };
    }
    return {
      ...transform,
      scaleX: 1,
      scaleY: 1,
    };
  };

  const style = {
    transformOrigin: "0 0",
    width: "100%",
  };

  return (
    <DragOverlay
      adjustScale
      style={style}
      transition="transform 0.2s cubic-bezier(.22,1.31,.28,1.19)" // Slow when devtools are open, remove for dev for now
      modifiers={[overScale]}
    >
      {node}
    </DragOverlay>
  );
}
