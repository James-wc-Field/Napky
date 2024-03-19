import { ReactNode, use, useEffect, useMemo, useRef, useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "@canvas/types/ProjectElements";
import useProject from "@canvas/hooks/useProject";
import MiniMap from "@canvas/MiniMap";
import CanvasControls from "@canvas/CanvasControls";
import CanvasBackground from "@canvas/CanvasBackground";
import CanvasToolbar from "@canvas/CanvasToolbar";
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
    }
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
        console.log(e.target)
        if ((e.target as HTMLElement).id !== "canvas-pane-droppable" && (e.target as HTMLElement).id !== "canvas-viewport") {
          selectableRef.current?.cancel();
        }
      }}
        onEnd={(value) => {
          console.log(value)
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
  const { attributes, listeners, isDragging, setNodeRef: setDragRef } = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isCanvasElement: true,
    },
  });
  const { updateElement, zoomLevel, changeSelectedElements, addSelectedElement } = useProject()
  const [isResizing, setIsResizing] = useState(false)
  type Position = {
    x: number | null;
    y: number | null;
  }
  const [startPos, setStartPos] = useState<Position>({ x: null, y: null })
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
  const resizeHandle = useRef<HTMLDivElement>(null)

  const CanvasElement = useMemo(() => {
    return ProjectElements[element.type].canvasComponent;
  }, [element]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = element.size.width + e.clientX - startPos.x!
      const newHeight = element.size.height + e.clientY - startPos.y!
      updateElement(element.id, {
        ...element,
        size: {
          width: newWidth,
          height: newHeight
        }
      })
    },
    [isResizing, startPos]
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
      //Adding this div fixes the location of the resize handle but adds a bug with the parent div that gets the size of the element

      {/* <div
        style={{
          position: 'relative',
          display: 'inline-block',
        }}> */}

        <div onMouseDown={(e) => {
          if (e.ctrlKey) {
            addSelectedElement(element)
          } else {
            // TOFIX: This allows quick selection between components but removes the ability to drag multiple components
            // changeSelectedElements([element])
          }
        }}>
          <div {...listeners} {...attributes}>
            <CanvasElement elementInstance={element} />
          </div>
        </div>
        <div
          ref={resizeHandle}
          onMouseDown={(e) => {
            console.log('mousedown')
            console.log(resizeHandle.current)
            e.preventDefault()
            setIsResizing(true)
            setStartPos({ x: e.clientX, y: e.clientY })
          }}
          style={{
            position: 'absolute',
            bottom: -10,
            right: -10,
            width: '10px',
            height: '10px',
            backgroundColor: 'grey',
            cursor: 'nwse-resize'
          }}
        ></div>
      {/* </div> */}
    </div>
  );
}
