'use client'
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
  const canvasElements = useProjectStore((state) => state.canvasElements);
  const addCanvasElement = useProjectStore((state) => state.addCanvasElement);
  const updateCanvasPoints = useProjectStore((state) => state.updateCanvasPoints);
  const [middleMouseIsDown, setMiddleMouseIsDown] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingEnabled = useProjectStore((state) => state.isDrawing);
  const setDrawingEnabled = useProjectStore((state) => state.updateIsDrawing);
  const selectableRef = useRef<SelectableRef>(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

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

    const scaledWidth = canvas.width * zoomLevel;
    const scaledHeight = canvas.height * zoomLevel;
    const scaleOffsetX = (scaledWidth - canvas.width) / 2;
    const scaleOffsetY = (scaledHeight - canvas.height) / 2;

    context.save();
    context.translate(
      scrollLeft * zoomLevel - scaleOffsetX,
      scrollTop * zoomLevel - scaleOffsetY
    );
    context.scale(zoomLevel, zoomLevel);

    canvasElements.forEach((element) => {
      drawElement(context, element);
    });
    context.restore();
  }, [canvasElements, zoomLevel, scrollLeft, scrollTop]);
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

  const handleMiddleDown = (e: React.MouseEvent) => {
    if (e.button === 1) {
      setMiddleMouseIsDown(true);
    }
  };

  // useEffect(() => {
  //     const undoRedoFunction = (event: KeyboardEvent) => {
  //         if (event.ctrlKey || event.metaKey) {
  //             if (event.key === "z") {
  //                 if (event.shiftKey) {
  //                     redo();
  //                 } else {
  //                     undo();
  //                 }
  //             } else if (event.key === "y") {
  //                 redo();
  //             }
  //         }
  //     };
  //     document.addEventListener("keydown", undoRedoFunction);
  //     return () => {
  //         document.removeEventListener("keydown", undoRedoFunction);
  //     };
  // }, [undo, redo]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (middleMouseIsDown) {
      setPanOffset((prevState) => ({
        x: prevState.x + e.movementX,
        y: prevState.y + e.movementY,
      }));
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
    if (!isDrawing) return;
    const index = canvasElements.length - 1;
    const existingPoints = canvasElements[index].points || [];
    const elementsCopy = [...canvasElements];
    elementsCopy[index] = {
      ...elementsCopy[index],
      points: [...existingPoints, { x: event.clientX, y: event.clientY }],
    };
    updateCanvasPoints(elementsCopy[index].id, elementsCopy[index])
  };
  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
    setDrawingEnabled(false);
  };

  const handleMouseDown = (event: MouseEvent) => {
    const newElement = {
      id: idGenerator(),
      type: "pencil",
      points: [{ x: event.clientX, y: event.clientY }]
    }
    addCanvasElement(newElement)
    setIsDrawing(true);
  };
  const canvasRef = useRef<HTMLDivElement>(null);
  const onZoom = (zoomIn: boolean, delta: number) => {
    if (zoomIn) setScale((prevState) => Math.min(Math.max(prevState * delta, 0.05), 5));
    else setScale((prevState) => Math.max(prevState / delta, 0.05));
  };
  console.log(isDrawing)
  return (
    <>
      {/* <Selectable ref={selectableRef} value={selectedElements()} onStart={(e) => {
        if ((e.target as HTMLElement).id !== "canvas-pane-droppable" && (e.target as HTMLElement).id !== "canvas-viewport") {
          selectableRef.current?.cancel();
        }
      }}
        onEnd={(value) => {
          updateSelectedElements(value as ProjectElementInstance[])
        }}> */}
      <div
        id="canvas-renderer"
        className="absolute w-full h-full top-0 left-0"
        style={{ zIndex: 4 }}
        onWheel={handleScroll}
        onMouseDown={handleMiddleDown}
        ref={canvasRef}
      >
        <div
          id="canvas-pane-droppable"
          className="absolute w-full h-full top-0 left-0 bg-white/20"
          ref={setNodeRef}
        >
          <canvas
            id="canvas"
            width={canvasRef.current?.clientWidth}
            height={canvasRef.current?.clientHeight}
            onMouseMove={(event) => handleCanvasMouseMove(event.nativeEvent)}
            onMouseUp={handleCanvasMouseUp}
            onWheel={handleScroll}
            onMouseDown={(event) => {
              handleMouseDown(event.nativeEvent)
            }}
            ref={setNodeRef}
            style={{ position: "absolute", zIndex: 3 }}
          />
          <div
            id="canvas-viewport"
            className={`absolute top-0 left-0 w-full h-full ${drawingEnabled ? "z-2" : "z-4"}`}
            style={{
              transform: `translate3d(${scrollLeft}px, ${scrollTop}px, 0) scale(${zoomLevel})`,
              transformOrigin: "center",
            }}
          >
            {projectElements.map((element) => {
              if (element.parentId !== "root") return null;
              return <CanvasElementWrapper key={element.id} element={element} />;
            })}
          </div>
        </div>
      </div>
      {/* </Selectable > */}
      <CanvasToolbar />
      <CanvasControls />
      <ControlPanel
        undo={() => { }}
        redo={() => { }}
        onZoom={onZoom}
        scale={scale}
        setScale={setScale} />
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
  const { selectedElements, updateProjectElement, updateSelectedElements } = useProjectStore(useShallow((state) => state));
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
      updateProjectElement(element.id, {
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
      <div onMouseDown={(e) => {
        if (e.ctrlKey) {
          updateSelectedElements([element])
        } else {            // TOFIX: This allows quick selection between components but removes the ability to drag multiple components
          if (selectedElements.length == 1) {
            updateSelectedElements([element])
          }
        }
      }} className="relative">
        <div {...listeners} {...attributes}>
          <CanvasElement elementInstance={element} />
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
