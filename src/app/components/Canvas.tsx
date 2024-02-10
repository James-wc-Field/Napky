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
    scrollTop,
    scrollLeft,
    updateScrollLeft,
    updateScrollTop,
  } = useProject();

  const minScale = 0.01;
  const maxScale = 5;
  function handleButtonPress(type: "plus" | "minus") {
    updateZoomLevel((prev) => {
      if (prev / 1.2 <= minScale && type === "minus") return prev;
      if (prev * 1.2 >= maxScale && type === "plus") return prev;
      if (type === "plus") return prev * 1.2;
      return prev / 1.2;
    });
  }

  function handleScroll(e: React.WheelEvent<HTMLDivElement>) {
    const { deltaX, deltaY } = e;
    if (e.ctrlKey) {
      updateZoomLevel((prev) => {
        if (prev / 1.05 <= minScale && deltaY > 0) return prev;
        if (prev * 1.05 >= maxScale && deltaY < 0) return prev;
        if (deltaY > 0) return prev / 1.05;
        return prev * 1.05;
      });
      return;
    }
    updateScrollLeft((prev) => prev - deltaX);
    updateScrollTop((prev) => prev - deltaY);
  }

  return (
    <>
      <div
        id="canvas-renderer"
        className="absolute w-full h-full top-0 left-0"
        style={{
          zIndex: 4,
        }}
        onWheel={handleScroll}
      >
        <div
          id="canvas-pane-droppable"
          className="absolute w-full h-full top-0 left-0 bg-white/20"
          style={{ zIndex: 1 }}
          ref={setNodeRef}
        >
          <div
            id="canvas-viewport"
            className="absolute top-0 left-0 w-full h-full"
            style={{
              transform: `translate3d(${scrollLeft}px, ${scrollTop}px, 0) scale(${zoomLevel})`,
              transformOrigin: "top left",
              zIndex: 2,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Canvas Controls */}
      <Card className="absolute top-4 right-4 gap-2 p-2" style={{ zIndex: 5 }}>
        <Button
          isIconOnly
          variant="flat"
          onPress={() => handleButtonPress("plus")}
        >
          <PlusIcon className="w-6" />
        </Button>
        <Button
          isIconOnly
          variant="flat"
          onPress={() => handleButtonPress("minus")}
        >
          <MinusIcon className="w-6" />
        </Button>
      </Card>

      {/* Background */}
      <svg className="absolute w-full h-full top-0 left-0">
        <pattern
          id="background"
          x={scrollLeft % (24 * zoomLevel)}
          y={scrollTop % (24 * zoomLevel)}
          width={24 * zoomLevel}
          height={24 * zoomLevel}
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(${zoomLevel}, ${zoomLevel})`}
        >
          <circle
            cx={zoomLevel}
            cy={zoomLevel}
            r={zoomLevel}
            fill="#91919a"
          ></circle>
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#background)"
        ></rect>
      </svg>
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
