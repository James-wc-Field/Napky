import { ReactNode, use, useEffect, useMemo, useRef, useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "@canvas/types/ProjectElements";
import useProject from "@canvas/hooks/useProject";
import MiniMap from "@canvas/MiniMap";
import CanvasControls from "@canvas/CanvasControls";
import CanvasBackground from "@canvas/CanvasBackground";
import CanvasToolbar from "@canvas/CanvasToolbar";
import Selectable, {SelectableRef, useSelectable } from 'react-selectable-box';
export default function Canvas({
  elements,
}: {
  elements: ProjectElementInstance[];
}) {
  return (
    <MainCanvasDroppable>
      {elements.map((element) => {
        if (element.parentId !== "root") return null;
        return <CanvasElementWrapper key={element.id} element={element} />;
      })}
    </MainCanvasDroppable>
  );
}

function MainCanvasDroppable({ children }: { children?: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas-droppable",
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
    addSelectedElements,
    selectedElements,
    elements
  } = useProject();

  const handleScroll = (e: React.WheelEvent) => {
    const { deltaX, deltaY } = e;
    if (e.ctrlKey) {
      updateZoomLevel(deltaY < 0, 1.05);
      return;
    } else if (e.shiftKey) {
      updateScrollLeft(deltaY);
      return;
    }
    updateScrollLeft(deltaX);
    updateScrollTop(deltaY);
  };

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
  }, []);

  const [middleMouseIsDown, setMiddleMouseIsDown] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (middleMouseIsDown) {
      updateScrollLeft(-e.movementX);
      updateScrollTop(-e.movementY);
    }
  };

  const handleMouseUp = () => {
    setMiddleMouseIsDown(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1) {
      setMiddleMouseIsDown(true);
    }
  };
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      // Cleanup event listeners when component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [middleMouseIsDown]);

  const selectableRef = useRef<SelectableRef>(null);
  return (
    <>
      <Selectable ref={selectableRef} onStart={(e) => {
        if ((e.target as HTMLElement).id !== "canvas-viewport") {
          selectableRef.current?.cancel();
        }
      }}
      onEnd={(value)=> {
        addSelectedElements(value as ProjectElementInstance[])
      }}>

        <div
          id="canvas-renderer"
          className="absolute w-full h-full top-0 left-0"
          style={{ zIndex: 4 }}
          onWheel={handleScroll}
          onMouseDown={handleMouseDown}
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
      </Selectable>
      <CanvasToolbar />
      <CanvasControls />
      {/* <MiniMap /> */}
      <CanvasBackground />
    </>
  );
}

function CanvasElementWrapper({
  element,
}: {
  element: ProjectElementInstance;
}) {
  const { attributes, listeners, isDragging, setNodeRef: setDragRef } = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isCanvasElement: true,
    },
  });

  const { setNodeRef:setSelectRef,isSelected} = useSelectable({value: element});
  const style: React.CSSProperties = {
    position: "absolute",
    left: element.position.x,
    top: element.position.y,
    visibility: isDragging ? "hidden" : undefined,
    width: element.size.width,
    cursor: isSelected ? "move" : "default",
    border: isSelected ? '1px solid #1677ff' : undefined
  };

  const CanvasElement = useMemo(() => {
    return ProjectElements[element.type].canvasComponent;
  }, [element]);
  return (
    <div style={style} ref={(ref) => {
      setDragRef(ref);
      setSelectRef(ref);
    }} {...listeners} {...attributes}>
      <CanvasElement elementInstance={element} />
    </div>
  );
}
