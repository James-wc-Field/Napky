import { ReactNode } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";
import { Button, Card } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";
import useProject from "./hooks/useProject";

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

  const {
    updateZoomLevel,
    zoomLevel,
    updateScrollLeft,
    updateScrollTop,
    canvasSize,
  } = useProject();

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
        className="absolute inset-0 flex overflow-auto items-center bg-neutral-700"
        onScroll={(e) => {
          updateScrollLeft(e.currentTarget.scrollLeft);
          updateScrollTop(e.currentTarget.scrollTop);
        }}
      >
        <div
          className="m-auto"
          style={{
            width: canvasSize.width * zoomLevel,
            height: canvasSize.height * zoomLevel,
          }}
        >
          <div
            id="canvas-drop-area"
            ref={setNodeRef}
            className="w-full h-full bg-white/10"
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top left",
              border: isOver ? "4px dashed" : undefined,
              borderColor: isOver ? "gray" : undefined,
            }}
          >
            {children}
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
  const { attributes, listeners, isDragging, setNodeRef } = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isCanvasElement: true,
    },
  });

  const style: React.CSSProperties = {
    position: "absolute",
    left: element.position.x,
    top: element.position.y,
    visibility: isDragging ? "hidden" : undefined,
  };

  const CanvasElement = ProjectElements[element.type].canvasComponent;
  return (
    <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
      <CanvasElement elementInstance={element} />
    </div>
  );
}
