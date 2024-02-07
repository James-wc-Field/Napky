import { ReactNode } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";
import { Button, Card } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";
import useProject from "./hooks/useProject";
import DragOverlayWrapper from "./DragOverlayWrapper";

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

function MainCanvasDroppable({ children }: { children?: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas-drop-area",
    data: {
      isCanvasDropArea: true,
    },
  });

  const { updateZoomLevel, zoomLevel, updateScrollLeft, updateScrollTop } =
    useProject();

  const minScale = 0.2;
  const maxScale = 3;
  function handleButtonPress(type: "plus" | "minus") {
    updateZoomLevel((prev) => {
      if (prev <= minScale && type === "minus") return prev;
      if (prev >= maxScale && type === "plus") return prev;
      if (type === "plus") return prev * 1.2;
      return prev / 1.2;
    });
  }

  return (
    <>
      <div
        className="absolute inset-0 overflow-auto flex items-center"
        onScroll={(e) => {
          updateScrollLeft(e.currentTarget.scrollLeft);
          updateScrollTop(e.currentTarget.scrollTop);
        }}
      >
        <div
          className="m-auto"
          style={{
            width: `calc(4000px * ${zoomLevel})`,
            height: `calc(3000px * ${zoomLevel})`,
          }}
        >
          <div
            // change background image to nothing if scale is less than 1
            className="w-[4000px] h-[3000px] dark:bg-[url(/dark-paper.svg)]"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top left",
              background: zoomLevel < 0.3 ? "none" : undefined,
            }}
          >
            <div
              id="canvas-drop-area"
              ref={setNodeRef}
              className="bg-white/20 w-full h-full"
            >
              {children}
            </div>
            {/* <DragOverlayWrapper /> */}
          </div>
        </div>
      </div>
      <Card className="absolute top-4 right-4 gap-2 p-2">
        <Button onPress={() => handleButtonPress("plus")}>
          <PlusIcon className="w-6" />
        </Button>
        <Button onPress={() => handleButtonPress("minus")}>
          <MinusIcon className="w-6" />
        </Button>
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
