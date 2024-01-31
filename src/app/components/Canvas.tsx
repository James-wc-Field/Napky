import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";
import { Card } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";

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

  const [zoomLevel, setZoomLevel] = React.useState(1);

  const handleZoomIn = () => {
    setZoomLevel((prev) => {
      return prev + 0.1;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      return prev - 0.1;
    });
  };

  return (
    <>
      <div
        ref={scrollableRef}
        onClick={showScroll}
        id="canvas-scrollable-area"
        className="absolute inset-0 overflow-auto"
      >
        <div
          id="canvas-drop-area"
          ref={setNodeRef}
          className="w-fit h-fit bg-white/20"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center",
          }}
        >
          <div className="w-[2500px] h-[2500px] dark:bg-[url(/dark-paper.svg)]">
            {children}
          </div>
        </div>
      </div>
      <Card className="absolute top-4 right-6 flex flex-col gap-2 p-3">
        <button onClick={handleZoomIn}>
          <PlusIcon className="w-6" />
        </button>
        <button onClick={handleZoomOut}>
          <MinusIcon className="w-6" />
        </button>
      </Card>
    </>
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
