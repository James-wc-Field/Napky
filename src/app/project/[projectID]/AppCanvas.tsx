'use client'
import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";


import React from "react";
import { ActionsType, AllElementsType, CanvasElementType, ExtendedCanvasElementType, SelectedCanvasElementType, Tools, ToolsType } from "./types/NinjaSketchTypes"
import { cursorForPosition, drawElement, getElementAtPosition } from "./utilities";
import { ControlPanel } from "./control-panel";
import CanvasControls from "./CanvasControls";
import CanvasToolbar from "./CanvasToolbar";
import { ProjectElementInstance, ProjectElements } from "./types/ProjectElements";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useProjectStore } from "./storeProvider";
import Selectable, { SelectableRef, useSelectable } from "react-selectable-box";
import CanvasBackground from "./CanvasBackground";
import { idGenerator } from "@/lib/idGenerator";

export default function AppCanvas() {
    // const { canvasElements,
    //     projectElements,
    //     setElements,
    //     undo,
    //     redo,
    //     addElement,
    //     updateElement } = useHistory([])
    const canvasElements = useProjectStore((state) => state.canvasElements)
    const addCanvasElement = useProjectStore((state) => state.addCanvasElement)
    const projectElements = useProjectStore((state) => state.projectElements)
    const updateCanvasPoints = useProjectStore((state) => state.updateCanvasPoints)
    const initialTool: ToolsType = Tools.selection;
    const [isDrawing, setIsDrawing] = useState(false);
    // const elements = useProjectStore((state) => state.elements);
    const updateScrollLeft = useProjectStore((state) => state.updateScrollLeft);
    const updateScrollTop = useProjectStore((state) => state.updateScrollTop);
    // const isDrawing = useProjectStore((state) => state.isDrawing);
    const updateIsDrawing = useProjectStore((state) => state.updateIsDrawing);
    const updateZoomLevel = useProjectStore((state) => state.updateZoomLevel);
    const zoomLevel = useProjectStore((state) => state.zoomLevel);
    const scrollTop = useProjectStore((state) => state.scrollTop);
    const scrollLeft = useProjectStore((state) => state.scrollLeft);
    const { setNodeRef } = useDroppable({
        id: "canvas-droppable",
        data: {
            isCanvasDropArea: true,
        },
    });
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [scaleOffset, setScaleOffset] = useState({ x: 0, y: 0 });

    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.clearRect(0, 0, canvas.width, canvas.height);

        const scaledWidth = canvas.width * scale;
        const scaledHeight = canvas.height * scale;
        const scaleOffsetX = (scaledWidth - canvas.width) / 2;
        const scaleOffsetY = (scaledHeight - canvas.height) / 2;
        setScaleOffset({ x: scaleOffsetX, y: scaleOffsetY });

        context.save();
        context.translate(
            panOffset.x * scale - scaleOffsetX,
            panOffset.y * scale - scaleOffsetY
        );
        context.scale(scale, scale);

        canvasElements.forEach((element) => {
            drawElement(context, element);
        });
        context.restore();
    }, [canvasElements, scale]);

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


    const handleMouseMove = (event: MouseEvent) => {
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
    const handleMouseUp = () => {
        setIsDrawing(false);
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

    const onZoom = (zoomIn: boolean, delta: number) => {
        if (zoomIn) setScale((prevState) => Math.min(Math.max(prevState * delta, 0.05), 5));
        else setScale((prevState) => Math.max(prevState / delta, 0.05));
    };
    const selectableRef = useRef<SelectableRef>(null);
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
    const canvasRef = useRef<HTMLDivElement>(null);
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

                // onWheel={handleScroll}
                // onMouseDown={handleMiddleDown}
                ref={canvasRef}
            >
                <div
                    id="canvas-pane-droppable"
                    className="absolute w-full h-full top-0 left-0 bg-white/20"
                    style={{ zIndex: 1 }}
                    ref={setNodeRef}
                >

                    <canvas
                        id="canvas"
                        width={canvasRef.current?.clientWidth}
                        height={canvasRef.current?.clientHeight}
                        onMouseMove={(event) => handleMouseMove(event.nativeEvent)}
                        onMouseUp={handleMouseUp}
                        onWheel={handleScroll}
                        onMouseDown={(event) => {
                            handleMouseDown(event.nativeEvent)
                        }}
                        ref={setNodeRef}
                        style={{ position: "absolute", zIndex: 4, transform: `scale(${zoomLevel}) translate(${scrollLeft}px, ${scrollTop}px)` }}
                    />
                    <div
                        id="canvas-viewport"
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            transform: `translate3d(${scrollLeft}px, ${scrollTop}px, 0) scale(${zoomLevel})`,
                            zIndex: 3,
                        }}
                    >
                        {projectElements.map((element) => {
                            if (element.parentId !== "root") return null;
                            return <CanvasElementWrapper key={element.id} element={element} />;
                        })}
                    </div>
                    <CanvasBackground />
                </div>
            </div>
            <CanvasControls />
            <CanvasToolbar />
            <ControlPanel
                undo={() => { }}
                redo={() => { }}
                onZoom={onZoom}
                scale={scale}
                setScale={setScale} />
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
    const selectedElements = useProjectStore((state) => state.selectedElements)
    const updateElement = useProjectStore((state) => state.updateProjectElement)
    const updateSelectedElements = useProjectStore((state) => state.updateSelectedElements)

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
        zIndex: 10
    };
    const resizeHandle = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     function handleMouseMove(e: MouseEvent) {
    //         const newWidth = element.size.width + e.clientX - startPos.x!
    //         const newHeight = element.size.height + e.clientY - startPos.y!
    //         updateElement(element.id, {
    //             ...element,
    //             size: {
    //                 width: newWidth,
    //                 height: newHeight
    //             }
    //         })
    //     }
    //     const handleMouseUp = () => {
    //         setIsResizing(false)
    //     }
    //     if (isResizing) {
    //         window.addEventListener('mousemove', () => handleMouseMove)
    //         window.addEventListener('mouseup', handleMouseUp)
    //     }
    //     return () => {
    //         window.removeEventListener('mousemove', () => handleMouseMove)
    //         window.removeEventListener('mouseup', handleMouseUp)
    //     }
    // }, [isResizing, startPos]) // eslint-disable-line react-hooks/exhaustive-deps
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