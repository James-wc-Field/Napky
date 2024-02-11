import { ReactNode, useEffect, useRef } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";
import useProject from "./hooks/useProject";
import MiniMap from "./MiniMap";
import CanvasControls from "./CanvasControls";
import CanvasBackground from "./CanvasBackground";

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
    updateCanvasViewRect,
  } = useProject();

  function handleScroll(e: React.WheelEvent<HTMLDivElement>) {
    const { deltaX, deltaY } = e;
    if (e.ctrlKey) {
      updateZoomLevel(deltaY > 0, 1.05);
      return;
    } else if (e.shiftKey) {
      updateScrollLeft(deltaY);
      return;
    }
    updateScrollLeft(deltaX);
    updateScrollTop(deltaY);
  }

  const canvasViewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      const { current } = canvasViewRef;

      if (current) {
        const boundingBox = current.getBoundingClientRect();
        updateCanvasViewRect(boundingBox);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasViewRef]);

  return (
    <>
      <div
        id="canvas-renderer"
        className="absolute w-full h-full top-0 left-0"
        style={{
          zIndex: 4,
        }}
        onWheel={handleScroll}
        ref={canvasViewRef}
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
      <CanvasControls />
      <MiniMap />
      <CanvasBackground />
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
