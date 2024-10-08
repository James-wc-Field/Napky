import { ReactNode, use, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ProjectElementInstance, ProjectElements } from "@/project/[projectID]/types/ProjectElements";
// import MiniMap from "@/project/[projectID]/MiniMap";
import CanvasControls from "@/project/[projectID]/CanvasControls";
import CanvasBackground from "@/project/[projectID]/CanvasBackground";
import CanvasToolbar from "@/project/[projectID]/CanvasToolbar";
import Selectable, { SelectableRef, useSelectable } from 'react-selectable-box';
import { useCallback } from "react";
import { useProjectStore } from "./storeProvider";
import { useShallow } from "zustand/react/shallow";
import { ControlPanel } from "./control-panel";
import { drawElement } from "./utilities";
import { idGenerator } from "@/lib/idGenerator";


export default function Canvas() {
  const updateZoomLevel = useProjectStore((state) => state.updateZoomLevel);
  const updateScrollLeft = useProjectStore((state) => state.updateScrollLeft);
  const updateScrollTop = useProjectStore((state) => state.updateScrollTop);
  const projectElements = useProjectStore((state) => state.projectElements);
  const scrollLeft = useProjectStore((state) => state.scrollLeft);
  const scrollTop = useProjectStore((state) => state.scrollTop);
  const zoomLevel = useProjectStore((state) => state.zoomLevel);
  const setAllElementsSelected = useProjectStore((state) => state.setAllElementsSelected);
  const deleteSelectedElements = useProjectStore((state) => state.deleteSelectedElements);
  const updateProjectElement = useProjectStore((state) => state.updateProjectElement);
  const selectedElements = useProjectStore((state) => state.selectedElements());
  const canvasElements = useProjectStore((state) => state.canvasElements());
  const addElement = useProjectStore((state) => state.addElement);
  const updateCanvasPoints = useProjectStore((state) => state.updateCanvasPoints);
  const removeSelectedElements = useProjectStore((state) => state.removeSelectedElements);
  const [middleMouseIsDown, setMiddleMouseIsDown] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingEnabled = useProjectStore((state) => state.isDrawing);
  const setDrawingEnabled = useProjectStore((state) => state.updateIsDrawing);
  const setImageRef = useProjectStore((state) => state.setImageRef);
  const selectableRef = useRef<SelectableRef>(null);
  const undo = useProjectStore((state) => state.undo);
  const redo = useProjectStore((state) => state.redo);

  const { setNodeRef } = useDroppable({
    id: "canvas-droppable",
    data: {
      isCanvasDropArea: true,
    },
  });
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(
      scrollLeft * zoomLevel,
      scrollTop * zoomLevel
    );
    context.scale(zoomLevel, zoomLevel);

    canvasElements.forEach((element) => {
      drawElement(context, element);
    });
    context.restore();
  }, [canvasElements, zoomLevel, scrollLeft, scrollTop]);

  const handleMiddleDown = (e: React.MouseEvent) => {
    if (e.button === 1) {
      setMiddleMouseIsDown(true);
    } else {
      removeSelectedElements();
    }
  };

  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "z") {
          if (event.shiftKey) {
            redo();
          } else {
            undo();
          }
        } else if (event.key === "y") {
          redo();
        } else if (event.key === "a") {
          event.preventDefault();
          console.log("select all")
          setAllElementsSelected();
        }
      } else if (event.key === "Delete") {
        deleteSelectedElements();
      };
    }
    document.addEventListener("keydown", onKeyPress);
    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [undo, redo, deleteSelectedElements, setAllElementsSelected]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (middleMouseIsDown) {
      selectableRef?.current?.cancel();
      updateScrollLeft(e.movementX);
      updateScrollTop(e.movementY);
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

  const handleCanvasMouseMove = (event: MouseEvent) => {
    if (!drawingEnabled) return;
    if (!isDrawing) return;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    const offsetX = (event.clientX - canvasRect.left) / zoomLevel - scrollLeft;
    const offsetY = (event.clientY - canvasRect.top) / zoomLevel - scrollTop;
    const index = canvasElements.length - 1;
    const elementsCopy = [...canvasElements];
    elementsCopy[index] = {
      ...elementsCopy[index],
      points: [...canvasElements[index].points || [], { x: offsetX, y: offsetY }],
    };
    updateCanvasPoints(elementsCopy)
  };
  const handleCanvasMouseUp = () => {
    if (!drawingEnabled) return;
    if (!isDrawing) return;
    setIsDrawing(false);
    setDrawingEnabled(false);
    console.log("mouseup")
    console.log(isDrawing)
    console.log(drawingEnabled)
  };

  const handleCanvasMouseDown = (event: MouseEvent) => {
    if (!drawingEnabled) return;
    const canvasRect = canvasRef.current?.getBoundingClientRect(); // Get the dimensions and position of the canvas
    if (!canvasRect) return;

    const offsetX = (event.clientX - canvasRect.left) / zoomLevel - scrollLeft// Calculate the offset of the mouse position relative to the canvas
    const offsetY = (event.clientY - canvasRect.top) / zoomLevel - scrollTop
    const newElement = {
      id: idGenerator(),
      points: [{ x: offsetX, y: offsetY }],
      selected: false,
    }
    addElement(newElement)
    setIsDrawing(true);
  };
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setImageRef(canvasRef);
  }, [canvasRef]);
  return (
    <>
      <Selectable ref={selectableRef} value={selectedElements} onStart={(e) => {
        if ((e.target as HTMLElement).id !== "canvas-pane-droppable" && (e.target as HTMLElement).id !== "canvas-viewport" && (e.target as HTMLElement).id !== "canvas") {
          selectableRef.current?.cancel();
        }
        if (isDrawing || drawingEnabled) {
          selectableRef.current?.cancel();
        }
      }}
        onEnd={(value) => {
          (value as ProjectElementInstance[]).forEach((element) => {
            updateProjectElement(element.id, { ...element, selected: true })
          })
        }}>
        <div
          id="canvas-renderer"
          className="absolute w-full h-full top-0 left-0 bg-white/20"
          style={{ zIndex: 4 }}
          onWheel={handleScroll}
          onMouseDown={handleMiddleDown}
          ref={canvasRef}
        >
          <canvas
            id="canvas"
            width={canvasRef.current?.clientWidth}
            height={canvasRef.current?.clientHeight}
            onMouseMove={(event) => handleCanvasMouseMove(event.nativeEvent)}
            onMouseUp={handleCanvasMouseUp}
            onWheel={handleScroll}
            onMouseDown={(event) => {
              handleCanvasMouseDown(event.nativeEvent)
            }}
            style={{ position: "absolute", zIndex: drawingEnabled ? 3 : 1 }}
          />
          <div
            id="canvas-pane-droppable"
            className={`absolute w-full h-full top-0 left-0`}
            style={{
              transform: `translate3d(${scrollLeft}px, ${scrollTop}px, 0) scale(${zoomLevel})`,
              transformOrigin: "top left",
              zIndex: drawingEnabled ? 1 : 3
            }}
            ref={setNodeRef}
          >
            {projectElements().map((element) => {
              if (element.parentId !== "root") return null;
              return <CanvasElementWrapper key={element.id} element={element} />;
            })}
          </div>
          <CanvasBackground />
        </div>
      </Selectable >
      <CanvasToolbar />
      <ControlPanel />
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

  const updateElement = useProjectStore((state) => state.updateProjectElement);
  const elements = useProjectStore((state) => state.projectElements());
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
  return (
    <div className={`left-${element.position.x} top-${element.position.y}`} style={style} ref={(ref) => {
      setDragRef(ref);
      setSelectRef(ref);
    }}
    >
      <div className="relative">
        <div onMouseDown={(e) => {
          if (e.ctrlKey) {
            //             updateSelectedElements([element])
          } else {
            // TOFIX: This allows quick selection between components but removes the ability to drag multiple components
          }
        }}>
          <div className={`${isSelected ? "cursor-move border-blue-600 border-2 border-solid rounded-lg" : "cursor-default"}`} {...listeners} {...attributes}>
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
