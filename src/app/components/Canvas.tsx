import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";
import { Card } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";
import { TransformComponent, useTransformEffect } from "react-zoom-pan-pinch";

export default function Canvas({
  elements,
}: {
  elements: ProjectElementInstance[];
  scrollableRef: React.RefObject<HTMLDivElement>;
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

  return (
    <TransformComponent
      wrapperStyle={{
        maxWidth: "100%",
        maxHeight: "100%",
        position: "absolute",
      }}
    >
      <div id="canvas-drop-area" ref={setNodeRef} className="bg-white/20">
        <div className="w-[10000px] h-[10000px] dark:bg-[url(/dark-paper.svg)]">
          {children}
        </div>
      </div>
    </TransformComponent>
  );
}

function CanvasElementWrapper({
  element,
}: {
  element: ProjectElementInstance;
}) {
  const { attributes, listeners, isDragging, setNodeRef, transform } =
    useDraggable({
      id: element.id + "-drag-handler",
      data: {
        type: element.type,
        elementId: element.id,
        isCanvasElement: true,
      },
    });

  // Only transform images since we will not use an overlay
  // - using an overlay causes the image to flicker
  const isImage = element.type === "ImageBlock";
  const style: React.CSSProperties = {
    position: "absolute",
    left: element.position.x,
    top: element.position.y,
    transform:
      transform && isImage
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : "",
    visibility: isDragging && !isImage ? "hidden" : undefined,
  };

  const CanvasElement = ProjectElements[element.type].canvasComponent;
  return (
    <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
      <CanvasElement elementInstance={element} />
    </div>
  );
}
