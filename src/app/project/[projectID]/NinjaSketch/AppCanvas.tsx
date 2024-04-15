import React, { useEffect, useMemo, useRef, useState } from "react";
import { useProjectStore } from "../storeProvider";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import CanvasControls from "../CanvasControls";
type AppCanvasProps = {
    handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> | undefined;
    handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> | undefined;
    handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> | undefined;
};
export function idGenerator(): string {
    return Math.floor(Math.random() * 10000001).toString();
}

import { TextBlockProjectElement } from "..//blocks/TextBlock";
import { ImageBlockProjectElement } from "../blocks/ImageBlock";
import { LinkBlockProjectElement } from "..//blocks/LinkBlock";
import { ListBlockProjectElement } from "../blocks/ListBlock";
import { TodoBlockProjectElement } from "../blocks/TodoBlock";
import { useSelectable } from "react-selectable-box";
import CanvasToolbar from "../CanvasToolbar";

export type ElementsType =
    | "TextBlock"
    | "ImageBlock"
    | "LinkBlock"
    | "ListBlock"
    | "TodoBlock";

export type ProjectElement = {
    type: ElementsType;

    construct: (id: string, parentId: string) => ProjectElementInstance;

    toolbarElement: {
        icon: React.ElementType;
        label: string;
    };
    canvasComponent: React.FC<{
        elementInstance: ProjectElementInstance;
    }>; // How the element will be rendered in the canvas

    toolbarPropertiesComponent: React.FC; // How the properties of the element will be rendered in the toolbar
};

export type Position = {
    x: number | null;
    y: number | null;
}

export type ProjectElementInstance = {
    id: string;
    type: ElementsType;
    selected: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    parentId: string;
    extraAttributes?: Record<string, any>;
};

type ProjectElementsType = {
    [key in ElementsType]: ProjectElement;
};

const ProjectElements: ProjectElementsType = {
    TextBlock: TextBlockProjectElement,
    ImageBlock: ImageBlockProjectElement,
    LinkBlock: LinkBlockProjectElement,
    ListBlock: ListBlockProjectElement,
    TodoBlock: TodoBlockProjectElement,
};


export function AppCanvas({ handleMouseDown, handleMouseMove, handleMouseUp }: AppCanvasProps) {
    const elements = useProjectStore((state) => state.elements);
    const addElement = useProjectStore((state) => state.addElement);
    const updateElement = useProjectStore((state) => state.updateElement);
    const selectedElements = useProjectStore((state) => state.selectedElements);
    const scrollLeft = useProjectStore((state) => state.scrollLeft);
    const scrollTop = useProjectStore((state) => state.scrollTop);
    const zoomLevel = useProjectStore((state) => state.zoomLevel);
    const updateSelectedElements = useProjectStore((state) => state.updateSelectedElements);
    const deleteElement = useProjectStore((state) => state.deleteElement);
    useDndMonitor({
        onDragStart: (event) => {
            // if (event.active.data?.current?.isCanvasElement) return
            // const elementId = event.active.data.current?.elementId;
            // if (!(selectedElements().find((element) => element.id == elementId))) {
            //   updateSelectedElements([elements.find((element) => element.id == elementId)!])
            // }
        },
        onDragEnd: (event) => {
            const { active, over, delta } = event;
            if (!active || !over) return;

            const isToolbarBtnElement = active.data?.current?.isToolbarBtnElement;
            const isCanvasElement = active.data?.current?.isCanvasElement;
            const isListElement = active.data?.current?.isListElement;
            const isTrashCan = over.data?.current?.isTrash;

            const isCanvasDropArea = over.data?.current?.isCanvasDropArea;
            const isListDroppable = over.data?.current?.isListDroppable;

            if (isTrashCan) {
                deleteElement(active.data?.current?.elementId as string);
            }
            // Drag new element from toolbar onto canvas
            if (isToolbarBtnElement) {
                const type = active.data?.current?.type;
                const newElement = ProjectElements[type as ElementsType].construct(
                    idGenerator(),
                    (over.data.current?.elementId as string) || "root"
                );

                const overTop = over.rect.top;
                const overLeft = over.rect.left;
                const initialTop = active.rect.current.initial?.top || overTop;
                const initialLeft = active.rect.current.initial?.left || overLeft;
                const diffX = overLeft - initialLeft;
                const diffY = overTop - initialTop;

                addElement(
                    {
                        ...newElement,
                        position: {
                            x: (delta.x - diffX - scrollLeft) / zoomLevel,
                            y: (delta.y - diffY - scrollTop) / zoomLevel,
                        },
                        extraAttributes: {
                            ...newElement.extraAttributes,
                        },
                    }
                );
            }

            // Drag existing CanvasElement to new position
            if (isCanvasElement && isCanvasDropArea) {
                const elementId = active.data?.current?.elementId;
                const dragged = elements.find((element) => element.id == elementId);
                const wasDraggedSelected = selectedElements().includes(dragged!)
                if (!dragged) return;
                if (!wasDraggedSelected) {
                    updateElement(dragged.id, {
                        ...dragged,
                        position: {
                            x: dragged.position.x + delta.x / zoomLevel,
                            y: dragged.position.y + delta.y / zoomLevel,
                        },
                        extraAttributes: {
                            ...dragged.extraAttributes,
                        },
                    });
                } else {
                    selectedElements().forEach((element) => {
                        updateElement(element.id, {
                            ...element,
                            position: {
                                x: element.position.x + delta.x / zoomLevel,
                                y: element.position.y + delta.y / zoomLevel,
                            },
                            extraAttributes: {
                                ...element.extraAttributes,
                            },
                        });
                    }
                    );

                }
            }

            // Drag list element onto canvas
            if (isListElement && isCanvasDropArea) {
                const canvasTop = over.rect.top;
                const canvasLeft = over.rect.left;
                const initialTop = active.rect.current.initial?.top || canvasTop;
                const initialLeft = active.rect.current.initial?.left || canvasLeft;
                const diffX = canvasLeft - initialLeft;
                const diffY = canvasTop - initialTop;

                const elementId = active.data?.current?.elementId;
                const dragged = elements.find((element) => element.id == elementId);
                if (!dragged) return;

                updateElement(dragged.id, {
                    ...dragged,
                    position: {
                        x: (delta.x - diffX - scrollLeft) / zoomLevel,
                        y: (delta.y - diffY - scrollTop) / zoomLevel,
                    },
                    parentId: "root",
                    extraAttributes: {
                        ...dragged.extraAttributes,
                    },
                });

                const listId = dragged.parentId;
                const list = elements.find((element) => element.id == listId);
                if (!list) return;

                const childElements = list.extraAttributes?.children;
                const newChildElements = childElements.filter(
                    (id: string) => id !== elementId
                );

                // Remove element from list
                updateElement(listId, {
                    ...list,
                    extraAttributes: {
                        ...list.extraAttributes,
                        children: newChildElements,
                    },
                });
            }

            // Drag canvas element onto list
            if (isListDroppable && isCanvasElement) {
                const elementId = active.data?.current?.elementId;
                const dragged = elements.find((element) => element.id == elementId);
                if (!dragged) return;

                const listId = over.data?.current?.elementId;
                const list = elements.find((element) => element.id == listId);
                if (!list) return;
                else if (!over.data.current?.accepts.includes(dragged.type)) {
                    updateElement(dragged.id, {
                        ...dragged,
                        position: {
                            x: dragged.position.x + delta.x / zoomLevel,
                            y: dragged.position.y + delta.y / zoomLevel,
                        },
                        parentId: "root",
                        extraAttributes: {
                            ...dragged.extraAttributes,
                        },
                    });
                    return;
                }

                const childElements = list.extraAttributes?.children;
                const newChildElements = [...childElements, elementId];

                updateElement(listId, {
                    ...list,
                    extraAttributes: {
                        ...list.extraAttributes,
                        children: newChildElements,
                    },
                });

                updateElement(dragged.id, {
                    ...dragged,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    parentId: listId,
                    extraAttributes: {
                        ...dragged.extraAttributes,
                    },
                });

                return;
            }

            if (isToolbarBtnElement && isListDroppable) {
                const type = active.data?.current?.type;
                const listId = over.data?.current?.elementId;
                const newElement = ProjectElements[type as ElementsType].construct(
                    idGenerator(),
                    listId as string
                );

                addElement(newElement);
                const list = elements.find((element) => element.id == listId);
                if (!list || !over.data.current?.accepts.includes(type)) return;

                const childElements = list.extraAttributes?.children;
                const newChildElements = [...childElements, newElement.id];

                updateElement(listId, {
                    ...list,
                    extraAttributes: {
                        ...list.extraAttributes,
                        children: newChildElements,
                    },
                });
            }

            if (isListElement && isListDroppable) {
                const newListId = over.data?.current?.elementId;
                const elementId = active.data?.current?.elementId;
                const dragged = elements.find((element) => element.id == elementId);
                if (!dragged) return;
                const parentListId = dragged.parentId;
                const parentList = elements.find(
                    (element) => element.id == parentListId
                );
                if (!parentList || parentListId === newListId) return;

                const childElements = parentList.extraAttributes?.children;
                const newChildElements = childElements.filter(
                    (id: string) => id !== elementId
                );

                updateElement(parentListId, {
                    ...parentList,
                    extraAttributes: {
                        ...parentList.extraAttributes,
                        children: newChildElements,
                    },
                });

                const newList = elements.find((element) => element.id == newListId);
                if (!newList || !over.data.current?.accepts.includes(dragged.type))
                    return;

                const newChildElementsList = newList.extraAttributes?.children;
                const newChildElementsListArray = [...newChildElementsList, elementId];

                updateElement(newListId, {
                    ...newList,
                    extraAttributes: {
                        ...newList.extraAttributes,
                        children: newChildElementsListArray,
                    },
                });

                updateElement(dragged.id, {
                    ...dragged,
                    parentId: newListId,
                    extraAttributes: {
                        ...dragged.extraAttributes,
                    },
                });
            }
        },
    });
    const { setNodeRef } = useDroppable({
        id: "canvas-droppable",
        data: {
            isCanvasDropArea: true,
        },
    });
    return (
        <div
            className="absolute w-full h-full top-0 left-0">
            <canvas
                ref={setNodeRef}
                id="canvas"
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ position: "absolute", zIndex: 1 }}
            />
            {elements.map((element) => {
                if (element.parentId !== "root") return null;
                return <CanvasElementWrapper key={element.id} element={element} />;
            })}
            <CanvasControls />
            <CanvasToolbar />
        </div>

    )
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
    const { selectedElements, updateElement, updateSelectedElements } = useProjectStore((state) => state);
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