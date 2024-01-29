import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";

export default function Canvas({
  elements,
}: {
  elements: ProjectElementInstance[];
}) {
  return (
    <MainCanvasDroppable>
      {elements.length > 0 &&
        elements.map((element) => (
          <CanvasElementWrapper key={element.id} element={element} />
        ))}
    </MainCanvasDroppable>
  );
}

function MainCanvasDroppable({ children }: { children?: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas-drop-area",
    data: {
      isCanvasDropArea: true,
    },
  });

  const style = {
    border: isOver ? "1px solid red" : "1px solid transparent",
    background: isOver ? "rgba(255, 0, 0, 0.1)" : "transparent",
  };

  return (
    <div ref={setNodeRef} className="relative flex grow" style={style}>
      {children}
    </div>
  );
}

function CanvasElementWrapper({
  element,
}: {
  element: ProjectElementInstance;
}) {
  const { attributes, listeners, isDragging, setNodeRef } = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isCanvasElement: true,
    },
  });

  const CanvasElement = ProjectElements[element.type].canvasComponent;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        position: "absolute",
        left: element.position.x,
        top: element.position.y,
        visibility: isDragging ? "hidden" : undefined,
      }}
    >
      <CanvasElement elementInstance={element} />
    </div>
  );
}
