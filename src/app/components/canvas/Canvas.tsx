import { ReactNode, use, useEffect, useMemo, useRef, useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "@canvas/types/ProjectElements";
import useProject from "@canvas/hooks/useProject";
import MiniMap from "@canvas/MiniMap";
import CanvasControls from "@canvas/CanvasControls";
import CanvasBackground from "@canvas/CanvasBackground";
import CanvasToolbar from "@canvas/CanvasToolbar";
import { Resizable } from 'react-resizable';
import useResizable from '@canvas/hooks/useResizable';
import Selectable, { SelectableRef, useSelectable } from 'react-selectable-box';
import { useCallback } from "react";
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
  const selectableRef = useRef<SelectableRef>(null);
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
    removeSelectedElements,
    selectedElements,
    removeElement,
    changeSelectedElements
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

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Delete") {
      selectedElements.forEach((element) => {
        removeElement(element.id);
      });
      removeSelectedElements();
    };
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
  }, []);

  const [middleMouseIsDown, setMiddleMouseIsDown] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (middleMouseIsDown) {
      selectableRef.current?.cancel();
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
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedElements]);

  return (
    <>
      <Selectable ref={selectableRef} value={selectedElements} onStart={(e) => {
        if ((e.target as HTMLElement).id !== "canvas-viewport") {
          selectableRef.current?.cancel();
        }
      }}
        onEnd={(value) => {
          changeSelectedElements(value as ProjectElementInstance[])
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
  const resizeRef = useRef<HTMLDivElement>(null);
  const {updateElement, zoomLevel} = useProject()
  const [isResizing, setIsResizing] = useState(false)
  const [startSize, setStartSize] = useState({ width: element.size.width, height: element.size.height })
  const [startPos, setStartPos] = useState({ x: element.position.x, y: element.position.y })
  const { setNodeRef: setSelectRef, isSelected } = useSelectable({ value: element });
  const style: React.CSSProperties = {
    position: "absolute",
    left: element.position.x,
    top: element.position.y,
    visibility: isDragging ? "hidden" : undefined,
    width: element.size.width,
    height: element.size.height,
    cursor: isSelected ? "move" : "default",
    border: isSelected ? '1px solid #1677ff' : undefined,
  };

  const CanvasElement = useMemo(() => {
    return ProjectElements[element.type].canvasComponent;
  }, [element]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = startSize.width + e.clientX - startPos.x
      const newHeight = startSize.height + e.clientY - startPos.y
      updateElement(element.id,  {
        ...element,
        size: {
          width: newWidth,
          height: newHeight
        }
    })
    },
    [isResizing, startSize, startPos]
  )

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, handleMouseMove])
  return (
    <div style={style} ref={(ref) => {
      setDragRef(ref);
      setSelectRef(ref);
    }}
    >
      <div {...listeners} {...attributes}>
        <CanvasElement elementInstance={element} />
      </div>
      <div
        className="resize-handle"
        onMouseDown={(e) => {
          console.log('mousedown')
          e.preventDefault()
          setIsResizing(true)
          setStartPos({ x: e.clientX, y: e.clientY })
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '10px',
          height: '10px',
          backgroundColor: 'grey',
          cursor: 'nwse-resize',
        }}
      ></div>
    </div>
  );
}
