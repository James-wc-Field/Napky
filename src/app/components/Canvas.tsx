import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";

export default function Canvas({
  elements,
  scrollableRef,
}: {
  elements: ProjectElementInstance[];
  scrollableRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <MainCanvasDroppable scrollableRef={scrollableRef}>
      {elements.length > 0 &&
        elements.map((element) => (
          <CanvasElementWrapper key={element.id} element={element} />
        ))}
    </MainCanvasDroppable>
  );
}

function MainCanvasDroppable({
  children,
  scrollableRef,
}: {
  children?: React.ReactNode;
  scrollableRef: React.RefObject<HTMLDivElement>;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas-drop-area",
    data: {
      isCanvasDropArea: true,
    },
  });
  const showScroll = () => {
    console.log(`scrollTop = ${scrollableRef.current?.scrollTop}`);
    console.log(`scrollLeft = ${scrollableRef.current?.scrollLeft}`);
  };

  return (
    <div
      ref={scrollableRef}
      onClick={showScroll}
      id="scrollable-canvas"
      className="absolute inset-0 overflow-auto w-full h-full"
    >
      <div
        ref={setNodeRef}
        className="relative w-[1000px] h-[1000px]
          bg-[url(/paper.svg)] dark:bg-[url(/dark-paper.svg)]"
      >
        {children}
      </div>
    </div>
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
