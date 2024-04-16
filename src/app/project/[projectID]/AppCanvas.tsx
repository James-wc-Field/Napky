'use client'
import {
    MouseEvent,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";


import React from "react";
import { ActionsType, AllElementsType, CanvasElementType, ExtendedCanvasElementType, SelectedCanvasElementType, Tools, ToolsType } from "./types/NinjaSketchTypes"
import { usePressedKeys } from "./hooks/usePressedKeys";
import { cursorForPosition, drawElement, getElementAtPosition } from "./utilities";
import { ControlPanel } from "./control-panel";
import { ActionBar } from "./action-bar";
import CanvasControls from "./CanvasControls";
import CanvasToolbar from "./CanvasToolbar";
import { ProjectElementInstance, ProjectElements } from "./types/ProjectElements";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useProjectStore } from "./storeProvider";
import { useSelectable } from "react-selectable-box";
import CanvasBackground from "./CanvasBackground";
type AppCanvasProps = {
    canvasElements: CanvasElementType[]
    projectElements: ProjectElementInstance[]
    setElements: (action: AllElementsType[] | ((current: AllElementsType[]) => AllElementsType[]), overwrite?: boolean) => void
    addElement: (element: AllElementsType) => void
    undo: () => void
    redo: () => void
    updateElement: (id: string | number, element: AllElementsType, isHistory?: boolean) => void
}
export default function AppCanvas({ canvasElements, projectElements, setElements, undo, redo, addElement, updateElement }: AppCanvasProps) {
    const initialTool: ToolsType = Tools.selection;
    // const elements = useProjectStore((state) => state.elements);
    const updateScrollLeft = useProjectStore((state) => state.updateScrollLeft);
    const updateScrollTop = useProjectStore((state) => state.updateScrollTop);
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
    const [startPanMousePosition, setStartPanMousePosition] = useState({
        x: 0,
        y: 0,
    });
    const [action, setAction] = useState<ActionsType>("none");
    const [tool, setTool] = useState<ToolsType>(initialTool);
    const [selectedElement, setSelectedElement] = useState<CanvasElementType | null>();
    const [scale, setScale] = useState(1);
    const [scaleOffset, setScaleOffset] = useState({ x: 0, y: 0 });
    const pressedKeys = usePressedKeys();

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
        const panOrZoomFunction = (event: WheelEvent) => {
            if (pressedKeys.has("Meta") || pressedKeys.has("Control")) {
                onZoom(event.deltaY > 0, 1.05);
            } else {
                setPanOffset((prevState) => ({
                    x: prevState.x - event.deltaX,
                    y: prevState.y - event.deltaY,
                }));
                updateScrollLeft(event.deltaX);
                updateScrollTop(event.deltaY);
            }
        };

        document.addEventListener("wheel", panOrZoomFunction);
        return () => {
            document.removeEventListener("wheel", panOrZoomFunction);
        };
    }, [pressedKeys]);


    const getMouseCoordinates = (event: MouseEvent) => {
        const clientX =
            (event.clientX - panOffset.x * scale + scaleOffset.x) / scale;
        const clientY =
            (event.clientY - panOffset.y * scale + scaleOffset.y) / scale;
        return { clientX, clientY };
    };

    const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {

        const { clientX, clientY } = getMouseCoordinates(event);

        if (tool === Tools.pan || event.button === 1 || pressedKeys.has(" ")) {
            setAction("panning");
            setStartPanMousePosition({ x: clientX, y: clientY });
            document.body.style.cursor = "grabbing";
            return;
        }

        if (event.button === 1 || pressedKeys.has(" ")) {
            setAction("panning");
            setStartPanMousePosition({ x: clientX, y: clientY });
            document.body.style.cursor = "grabbing";
            return;
        }

        if (tool === Tools.selection) {
            const element = getElementAtPosition(clientX, clientY, canvasElements);

            if (element) {
                let selectedElement: SelectedCanvasElementType = { ...element };

                if (element.type === "pencil" && element.points) {
                    const xOffsets = element.points.map((point) => clientX - point.x);
                    const yOffsets = element.points.map((point) => clientY - point.y);
                    selectedElement = { ...selectedElement, xOffsets, yOffsets };
                }
                setSelectedElement(selectedElement);

                if (element.position === "inside") {
                    setAction("moving");
                } else {
                    // setAction("resizing");
                }
            }
        } else {
            const id = canvasElements.length;
            const newElement = {
                id,
                type: "pencil",
                points: [{ x: clientX, y: clientY }]
            }
            addElement(newElement);
            setSelectedElement(newElement);
            setAction(() => "drawing");
        }
    };

    const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
        const { clientX, clientY } = getMouseCoordinates(event);

        if (action === "panning") {
            const deltaX = clientX - startPanMousePosition.x;
            const deltaY = clientY - startPanMousePosition.y;
            setPanOffset({
                x: panOffset.x + deltaX,
                y: panOffset.y + deltaY,
            });
            updateScrollLeft(deltaX);
            updateScrollTop(deltaY);
            return;
        }

        if (tool === Tools.selection) {
            const element = getElementAtPosition(clientX, clientY, canvasElements);

            if (element && element.position) {
                (event.target as HTMLElement).style.cursor = cursorForPosition(
                    element.position
                );
            } else {
                (event.target as HTMLElement).style.cursor = "default";
            }
        }

        if (action === "drawing") {
            const index = canvasElements.length - 1;
            const existingPoints = canvasElements[index].points || [];
            updateElement(index, { ...canvasElements[index], points: [...existingPoints, { x: clientX, y: clientY }] }, true);

        } else if (action === "moving" && selectedElement) {
            if (
                selectedElement.type === "pencil" &&
                "points" in selectedElement &&
                "xOffsets" in selectedElement &&
                "yOffsets" in selectedElement
            ) {
                const extendedElement = selectedElement as ExtendedCanvasElementType;
                const newPoints = extendedElement.points!.map((_, index) => ({
                    x: clientX - extendedElement.xOffsets![index],
                    y: clientY - extendedElement.yOffsets![index],
                }));
                const elementsCopy = [...canvasElements];
                extendedElement.points = newPoints;
                elementsCopy[extendedElement.id] = {
                    ...elementsCopy[extendedElement.id],
                    points: newPoints,
                };
                setElements(elementsCopy);
                // updateElemen(extendedElement.id, {
                //     ...extendedElement,
                //     points: newPoints,
                // })

            }
        }
    };

    const handleMouseUp = () => {
        if (action === "panning") {
            document.body.style.cursor = "default";
        }
        setAction("none");
        setSelectedElement(null);
    };

    const onZoom = (zoomIn: boolean, delta: number) => {
        if (zoomIn) setScale((prevState) => Math.min(Math.max(prevState * delta, 0.05), 5));
        else setScale((prevState) => Math.max(prevState / delta, 0.05));
    };
    const canvasRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={canvasRef}
            className="bg-white/20 absolute top-0 left-0 w-full h-full">
            <CanvasControls />
            <CanvasToolbar />
            <ActionBar tool={tool} setTool={setTool} />
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
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
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
        zIndex: 5
    };
    const resizeHandle = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     const handleMouseMove = (e: MouseEvent) => {
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
    //         window.addEventListener('mousemove', handleMouseMove)
    //         window.addEventListener('mouseup', handleMouseUp)
    //     }
    //     return () => {
    //         window.removeEventListener('mousemove', handleMouseMove)
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