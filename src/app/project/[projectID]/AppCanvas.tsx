'use client'
import {
    MouseEvent,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import rough from "roughjs";


import React from "react";
import Canvas from "./Canvas";
import { useHistory } from "./hooks/useHistory";
import { ActionsType, AllElementsType, CanvasElementType, ExtendedCanvasElementType, SelectedCanvasElementType, Tools, ToolsType } from "./types/NinjaSketchTypes"
import { usePressedKeys } from "./hooks/usePressedKeys";
import { adjustElementCoordinates, adjustmentRequired, createElement, cursorForPosition, drawElement, getElementAtPosition, resizedCoordinates } from "./utilities";
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
    updateElemen: (id: string | number, element: AllElementsType, isHistory?: boolean) => void
}
export default function AppCanvas({ canvasElements, projectElements, setElements, undo, redo, addElement, updateElemen }: AppCanvasProps) {
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
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const pressedKeys = usePressedKeys();

    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        const roughCanvas = rough.canvas(canvas);

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
            if (
                action === "writing" &&
                selectedElement &&
                selectedElement.id === element.id
            )
                return;
            drawElement(roughCanvas, context, element);
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

    useEffect(() => {
        const textArea = textAreaRef.current;
        if (action === "writing" && textArea && selectedElement) {
            setTimeout(() => {
                textArea.focus();
                textArea.value = selectedElement.text || "";
            }, 0);
        }
    }, [action, selectedElement]);

    const updateElement = (
        id: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        type: ToolsType,
        options?: { text: string }
    ) => {
        const elementsCopy = [...canvasElements];
        switch (type) {
            case Tools.line:
            case Tools.rectangle: {
                elementsCopy[id] = createElement(id, x1, y1, x2, y2, type);
                break;
            }
            case Tools.pencil: {
                const existingPoints = elementsCopy[id].points || [];
                elementsCopy[id].points = [...existingPoints, { x: x2, y: y2 }];
                break;
            }
            case Tools.text: {
                const canvas = document.getElementById("canvas");
                if (!(canvas instanceof HTMLCanvasElement)) {
                    throw new Error("Canvas element not found");
                }
                const context = canvas.getContext("2d");
                if (!context) {
                    throw new Error("Could not get 2D context from canvas");
                }
                if (!options) {
                    throw new Error("No text options provided for text tool");
                }
                const textWidth = context.measureText(options.text).width;
                const textHeight = 24;
                elementsCopy[id] = {
                    ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type),
                    text: options.text,
                };
                break;
            }
            default:
                throw new Error(`Type not recognised: ${type}`);
        }
        updateElemen(id, elementsCopy[id], false)
        // setElements(elementsCopy, true);
    };

    const getMouseCoordinates = (event: MouseEvent) => {
        const clientX =
            (event.clientX - panOffset.x * scale + scaleOffset.x) / scale;
        const clientY =
            (event.clientY - panOffset.y * scale + scaleOffset.y) / scale;
        return { clientX, clientY };
    };

    const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
        if (action === "writing") return;

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
                } else {
                    const offsetX = clientX - selectedElement.x1;
                    const offsetY = clientY - selectedElement.y1;
                    selectedElement = { ...selectedElement, offsetX, offsetY };
                }

                setSelectedElement(selectedElement);
                setElements((prevState) => prevState);

                if (element.position === "inside") {
                    setAction("moving");
                } else {
                    setAction("resizing");
                }
            }
        } else {
            const id = canvasElements.length;
            const newElement = createElement(
                id,
                clientX,
                clientY,
                clientX,
                clientY,
                tool
            );
            // addElement(newElement);
            setElements((prevState) => [...prevState, newElement]);
            setSelectedElement(newElement);
            setAction(tool === "text" ? "writing" : "drawing");
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
            const { x1, y1 } = canvasElements[index];
            console.log(tool)
            updateElement(index, x1, y1, clientX, clientY, tool);

            // const existingPoints = elementsCopy[id].points || [];
            //     elementsCopy[id].points = [...existingPoints, { x: x2, y: y2 }];
            // setElements(elementsCopy, true);


            // updateElemen(canvasElements.length - 1, {
            //     ...canvasElements[canvasElements.length - 1],
            //     x2: clientX,
            //     y2: clientY,
            // }, false)
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
                setElements
                elementsCopy[extendedElement.id] = {
                    ...elementsCopy[extendedElement.id],
                    points: newPoints,
                };
                setElements(elementsCopy, true);
                // updateElemen(extendedElement.id, {
                //     ...extendedElement,
                //     points: newPoints,
                // })

            } else {
                const { id, x1, x2, y1, y2, type, offsetX, offsetY } =
                    selectedElement as ExtendedCanvasElementType;
                const safeOffsetX = offsetX ?? 0;
                const safeOffsetY = offsetY ?? 0;
                const newX1 = clientX - safeOffsetX;
                const newY1 = clientY - safeOffsetY;
                // 🫐 Calculate the new position for x2 and y2 based on the original size
                const newX2 = newX1 + (x2 - x1);
                const newY2 = newY1 + (y2 - y1);
                const options =
                    type === "text" && selectedElement.text
                        ? { text: selectedElement.text }
                        : undefined;
                updateElement(id, newX1, newY1, newX2, newY2, type, options);
            }
        } else if (
            action === "resizing" &&
            selectedElement &&
            selectedElement.position
        ) {
            const { id, type, position, ...coordinates } =
                selectedElement as ExtendedCanvasElementType;

            if (typeof position === "string") {
                const { x1, y1, x2, y2 } = resizedCoordinates(
                    clientX,
                    clientY,
                    position,
                    coordinates
                );
                updateElement(id, x1, y1, x2, y2, type);
            }
        }
    };

    const handleMouseUp = (event: MouseEvent<HTMLCanvasElement>) => {
        const { clientX, clientY } = getMouseCoordinates(event);

        if (selectedElement) {
            const index = selectedElement.id;
            const { id, type } = canvasElements[index];
            if (
                (action === "drawing" || action === "resizing") &&
                adjustmentRequired(type)
            ) {
                const { x1, y1, x2, y2 } = adjustElementCoordinates(canvasElements[index]);
                updateElement(id - 1, x1, y1, x2, y2, type);
            }

            const offsetX = selectedElement.offsetX || 0;
            const offsetY = selectedElement.offsetY || 0;

            if (
                selectedElement.type === "text" &&
                clientX - offsetX === selectedElement.x1 &&
                clientY - offsetY === selectedElement.y1
            ) {
                setAction("writing");
                return;
            }
        }

        if (action === "writing") {
            return;
        }

        if (action === "panning") {
            document.body.style.cursor = "default";
        }

        setAction("none");
        setSelectedElement(null);
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        if (selectedElement) {
            const { id, x1, y1, type } = selectedElement;

            const x2 = selectedElement.x2 || x1;
            const y2 = selectedElement.y2 || y1;

            setAction("none");
            setSelectedElement(null);
            updateElement(id, x1, y1, x2, y2, type, { text: event.target.value });
        } else {
            console.error("No element selected when handleBlur was called");
        }
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
            {action === "writing" ? (
                <textarea
                    ref={textAreaRef}
                    onBlur={handleBlur}
                    className="textArea"
                    style={{
                        top: selectedElement
                            ? (selectedElement.y1 - 2) * scale +
                            panOffset.y * scale -
                            scaleOffset.y
                            : 0,
                        left: selectedElement
                            ? selectedElement.x1 * scale + panOffset.x * scale - scaleOffset.x
                            : 0,
                        font: `${24 * scale}px sans-serif`,
                    }}
                />
            ) : null}

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