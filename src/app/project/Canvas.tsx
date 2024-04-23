import { useEffect, useMemo, useRef, useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "@/project/types/ProjectElements";
// import MiniMap from "@/project/[projectID]/MiniMap";
import CanvasControls from "@/project/CanvasControls";
import CanvasBackground from "@/project/CanvasBackground";
import CanvasToolbar from "@/project/CanvasToolbar";
import Selectable, { SelectableRef, useSelectable } from 'react-selectable-box';
import { useCallback } from "react";
import { useProjectStore } from "./storeProvider";
import { useShallow } from "zustand/react/shallow";

export default function Canvas() {
  const updateZoomLevel = useProjectStore((state) => state.updateZoomLevel);
  const updateScrollLeft = useProjectStore((state) => state.updateScrollLeft);
  const updateScrollTop = useProjectStore((state) => state.updateScrollTop);
  const elements = useProjectStore((state) => state.elements);
  const selectedElements = useProjectStore((state) => state.selectedElements);
  const updateSelectedElements = useProjectStore((state) => state.updateSelectedElements);
  const scrollLeft = useProjectStore((state) => state.scrollLeft);
  const scrollTop = useProjectStore((state) => state.scrollTop);
  const zoomLevel = useProjectStore((state) => state.zoomLevel);
  const setAllElementsSelected = useProjectStore((state) => state.setAllElementsSelected);
  const deleteSelectedElements = useProjectStore((state) => state.deleteSelectedElements);
  const [middleMouseIsDown, setMiddleMouseIsDown] = useState(false)
  const selectableRef = useRef<SelectableRef>(null);
  const imageRef = useProjectStore((state) => state.imageRef);
  const { setNodeRef } = useDroppable({
    id: "canvas-droppable",
    data: {
      isCanvasDropArea: true,
    },
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "a" && e.ctrlKey) {
        e.preventDefault();
        console.log("ctrl+a")
        setAllElementsSelected();
      }
      if (e.key === "Delete") {
        deleteSelectedElements();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setAllElementsSelected, deleteSelectedElements]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1) {
      setMiddleMouseIsDown(true);
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (middleMouseIsDown) {
      selectableRef?.current?.cancel();
      updateScrollLeft(-e.movementX);
      updateScrollTop(-e.movementY);
    }
  }, [selectableRef, updateScrollLeft, updateScrollTop, middleMouseIsDown])
  const handleMouseUp = useCallback(() => {
    setMiddleMouseIsDown(false);
  }, [])
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      // Cleanup event listeners when component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

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

  // const curr = useMemo(() => {
  //   return canvasRef.current
  // }, [canvasRef])
  // useWindowResize(curr)

  return (
    <>
      <Selectable ref={selectableRef} value={selectedElements()} onStart={(e) => {
        if ((e.target as HTMLElement).id !== "canvas-pane-droppable" && (e.target as HTMLElement).id !== "canvas-viewport") {
          selectableRef.current?.cancel();
        }
      }}
        onEnd={(value) => {
          updateSelectedElements(value as ProjectElementInstance[])
        }}>
        <div
          id="canvas-renderer"
          className="absolute w-full h-full top-0 left-0"
          style={{ zIndex: 4 }}
          onWheel={handleScroll}
          onMouseDown={handleMouseDown}
          ref={imageRef}
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
              {elements.map((element) => {
                if (element.parentId !== "root") return null;
                return <CanvasElementWrapper key={element.id} element={element} />;
              })}
            </div>
          </div>
          <CanvasBackground />
        </div>
      </Selectable>
      <CanvasToolbar />
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
  const { elements, updateElement, updateSelectedElements } = useProjectStore(useShallow((state) => state));
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
  };
  const resizeHandle = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = element.size.width + e.clientX - startPos.x!
      const newHeight = element.size.height + e.clientY - startPos.y!
      if (element.extraAttributes?.children) {
        element.extraAttributes.children.forEach((id: string) => {
          const child = elements.find((e) => e.id === id);
          if (child) {
            updateElement(id, {
              ...child,
              size: {
                width: newWidth,
                height: newHeight
              }
            })
          }
        }
        )
      }
      if (element.id) {
        updateElement(element.id, {
          ...element,
          size: {
            width: newWidth,
            height: newHeight
          }
        })
      }
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
  const parentRef = useRef<HTMLDivElement>(null)
  return (
    <div className={`left-${element.position.x} top-${element.position.y}`} style={style} ref={(ref) => {
      setDragRef(ref);
      setSelectRef(ref);
    }}
    >
      <div className="relative">
        <div onMouseDown={(e) => {
          if (e.ctrlKey) {
            updateSelectedElements([element])
          } else {
            // TOFIX: This allows quick selection between components but removes the ability to drag multiple components
          }
        }}>
          <div ref={parentRef} className={`${isSelected ? "cursor-move border-blue-600 border-2 border-solid rounded-lg" : "cursor-default"}`} {...listeners} {...attributes}>
            <CanvasElement elementInstance={element} />
          </div>
        </div>
        <div className="absolute -bottom-5 -right-5 w-3 h-3 bg-gray-500 cursor-nwse-resize"
          ref={resizeHandle}
          onMouseDown={(e) => {
            setIsResizing(true)
            setStartPos({ x: e.clientX, y: e.clientY })
          }}
        ></div>
      </div>
    </div>
  );
}