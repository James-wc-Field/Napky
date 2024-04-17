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
import { useHistory } from "./hooks/useHistory";

export default function AppCanvas() {
    const { canvasElements,
        projectElements,
        setElements,
        undo,
        redo,
        addElement,
        updateElement } = useHistory([])
    const initialTool: ToolsType = Tools.selection;
    const [isDrawing, setIsDrawing] = useState(false);
    // const elements = useProjectStore((state) => state.elements);
    const updateScrollLeft = useProjectStore((state) => state.updateScrollLeft);
    const updateScrollTop = useProjectStore((state) => state.updateScrollTop);
    // const isDrawing = useProjectStore((state) => state.isDrawing);
    const updateIsDrawing = useProjectStore((state) => state.updateIsDrawing);
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
    const [action, setAction] = useState<ActionsType>("none");
    const [selectedElement, setSelectedElement] = useState<CanvasElementType | null>();
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
    }, [canvasElements, action, selectedElement, panOffset, scale]);

    useEffect(() => {
        const undoRedoFunction = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) {
                if (event.key === "z") {
                    if (event.shiftKey) {
                        redo();
                    } else {
                        undo();
                    }
                } else if (event.key === "y") {
                    redo();
                }
            }
        };
        document.addEventListener("keydown", undoRedoFunction);
        return () => {
            document.removeEventListener("keydown", undoRedoFunction);
        };
    }, [undo, redo]);


    useEffect(() => {
        console.log(isDrawing)
        const handleMouseMove = (event: MouseEvent) => {
            console.log(event)
            if (!isDrawing) {
                console.log(isDrawing)
                return;
            }
            const index = canvasElements.length - 1;
            const elementsCopy = [...canvasElements];
            const existingPoints = elementsCopy[index].points || [];
            elementsCopy[index].points = [...existingPoints, { x: event.clientX, y: event.clientY }];
            setElements(elementsCopy, true);
            // const index = canvasElements.length - 1;
            // updateElement(
            //     index,
            //     { ...canvasElements[index], points: [...canvasElements[index].points!, { x: event.clientX, y: event.clientY }] }
            // );
        };
        const handleMouseUp = () => {
            setIsDrawing(false);
        };
        if (isDrawing) {
            canvasRef.current?.addEventListener('mousemove', handleMouseMove)
            canvasRef.current?.addEventListener('mouseup', handleMouseUp)
        }
        return () => {
            canvasRef.current?.removeEventListener('mousemove', handleMouseMove)
            canvasRef.current?.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDrawing])

    const handleMouseDown = (event: MouseEvent) => {
        const newElement = {
            id: idGenerator(),
            type: "pencil",
            points: [{ x: event.clientX, y: event.clientY }]
        }
        addElement(newElement);
        setIsDrawing(true);
    };

    const onZoom = (zoomIn: boolean, delta: number) => {
        if (zoomIn) setScale((prevState) => Math.min(Math.max(prevState * delta, 0.05), 5));
        else setScale((prevState) => Math.max(prevState / delta, 0.05));
    };
    const selectableRef = useRef<SelectableRef>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    return (
        // <Selectable ref={selectableRef} value={selectedElements()} onStart={(e) => {
        //     if ((e.target as HTMLElement).id !== "canvas-pane-droppable" && (e.target as HTMLElement).id !== "canvas-viewport") {
        //         selectableRef.current?.cancel();
        //     }
        // }}
        //     onEnd={(value) => {
        //         updateSelectedElements(value as ProjectElementInstance[])
        //     }}>
        <div ref={canvasRef}
            className="bg-white/20 absolute top-0 left-0 w-full h-full">
            <CanvasControls />
            <CanvasToolbar />
            <ControlPanel
                undo={undo}
                redo={redo}
                onZoom={onZoom}
                scale={scale}
                setScale={setScale}
            />

            <canvas
                id="canvas"
                width={canvasRef.current?.clientWidth}
                height={canvasRef.current?.clientHeight}
                onMouseDown={(event) => {
                    handleMouseDown(event.nativeEvent)
                }}
                ref={setNodeRef}
                style={{ position: "absolute", zIndex: 4 }}
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
    const updateElement = useProjectStore((state) => state.updateElement)
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