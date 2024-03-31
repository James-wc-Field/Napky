import { ReactNode, use, useEffect, useMemo, useRef, useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "@/project/[projectID]/types/ProjectElements";
import useProject from "@/project/[projectID]/hooks/useProject";
import MiniMap from "@/project/[projectID]/MiniMap";
import CanvasControls from "@/project/[projectID]/CanvasControls";
import CanvasBackground from "@/project/[projectID]/CanvasBackground";
import { CanvasToolbar } from "@/project/[projectID]/CanvasToolbar";
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
    useWindowResize,
    selectedElements,
    changeSelectedElements,
    updateMiddleMouseIsDown,
    useMouseMove,
    middleMouseIsDown,
    useKeyDown,
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

  const canvasRef = useRef(null);
  const curr = useMemo(() => {
    return canvasRef.current
  }, [canvasRef])
  useWindowResize(curr)
  useMouseMove(selectableRef, middleMouseIsDown)
  useKeyDown(selectedElements)


  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1) {
      updateMiddleMouseIsDown(true);
    }
  };

  return (
    <>
      <Selectable ref={selectableRef} value={selectedElements} onStart={(e) => {
        if ((e.target as HTMLElement).id !== "canvas-pane-droppable" && (e.target as HTMLElement).id !== "canvas-viewport") {
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
          ref={canvasRef}
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
          <CanvasBackground />
        </div>
      </Selectable>
      <CanvasToolbar ref={canvasRef} />
      <CanvasControls />
      {/* <MiniMap /> */}
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
  const { updateElement, zoomLevel, changeSelectedElements, addSelectedElement, selectedElements } = useProject()
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = element.size.width + e.clientX - startPos.x!
      const newHeight = element.size.height + e.clientY - startPos.y!
      updateElement(element.id, {
        ...element,
        size: {
          width: newWidth,
          height: newHeight
        }
      })
    }
    const handleMouseUp = () => {
      setIsResizing(false)
    }
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, startPos]) // eslint-disable-line react-hooks/exhaustive-deps
  const CanvasElement = useMemo(() => {
    return ProjectElements[element.type].canvasComponent;
  }, [element]);
  // useResize(element,startPos)

  return (
    <div style={style} ref={(ref) => {
      setDragRef(ref);
      setSelectRef(ref);
    }}
    >
      <div className="relative">
        <div onMouseDown={(e) => {
          if (e.ctrlKey) {
            addSelectedElement(element)
          } else {
            // TOFIX: This allows quick selection between components but removes the ability to drag multiple components
            if (selectedElements.length == 1) {
              changeSelectedElements([element])
            }
          }
        }}>
          <div {...listeners} {...attributes}>
            <CanvasElement elementInstance={element} />
          </div>
        </div>
        <div className="absolute"
          ref={resizeHandle}
          onMouseDown={(e) => {
            setIsResizing(true)
            setStartPos({ x: e.clientX, y: e.clientY })
          }}
          style={{
            bottom: -10,
            right: -10,
            width: '10px',
            height: '10px',
            backgroundColor: 'grey',
            cursor: 'nwse-resize'
          }}
        ></div>
      </div>
    </div>
  );
}
