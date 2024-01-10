'use client'
import { DndContext, DragOverlay} from "@dnd-kit/core";
import React from "react";
import { useState, useId } from "react";
import Grid from "../../components/Grid"; // Update the import path
import TestDraggable from "../../components/TestDraggable"; // Update the import path
import DrawingBoard from "@/app/components/DrawingBoard";
import classNames from "classnames";
interface Draggables {
    [key: string]: Position;
}
interface Position {
    x: number;
    y: number;
}

export default function Page({ params }: { params: { projectID: string } }) {
    const [draggables, setDraggables] = useState<Draggables>({});
    const [activeId, setActiveId] = useState(null);
    const [collapsed, setSidebarCollapsed] = useState(false);
    function onDragEnd(event: any) {
        setActiveId(null);
        console.log(event)
        console.log("Moved!")
        setDraggables(prev => ({ ...prev, [event.active.id]: { x: prev[event.active.id].x + event.delta.x, y: prev[event.active.id].y + event.delta.y } }));
    }

    const createNewDraggable = () => {
        const newId = `draggable-${Object.keys(draggables).length + 1}`;
        const offsetX = 5 * Object.keys(draggables).length;
        const offsetY = 5 * Object.keys(draggables).length;

        setDraggables(prev => ({ ...prev, [newId]: { x: 20 + offsetX, y: 20 + offsetY } }));
    };
    function handleDragStart(event: any) {
        setActiveId(event.active.id);
    }
    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={onDragEnd}>
            <div
                className={classNames({
                    // 👇 use grid layout
                    "grid min-h-screen": true,
                    // 👇 toggle the width of the sidebar depending on the state
                    "grid-cols-sidebar": !collapsed,
                    "grid-cols-sidebar-collapsed": collapsed,
                    // 👇 transition animation classes
                    "transition-[grid-template-columns] duration-300 ease-in-out": true,
                })}
            >
                <div className="bg-indigo-700 text-white">
                    <button onClick={() => setSidebarCollapsed((prev) => !prev)}>
                        Toggle
                    </button>
                    <TestDraggable id="draggable-1" position={{ x: 0, y: 0 }} onDragEnd={onDragEnd}>
                        Drag me!
                    </TestDraggable>
                </div>

                <div>


                    <button onClick={createNewDraggable}>Add Draggable</button>
                    <DrawingBoard>
                        <DragOverlay>
                            {activeId ? (
                                <TestDraggable id={activeId} onDragEnd={onDragEnd}>
                                    Drag me!
                                </TestDraggable>
                            ) : null}
                        </DragOverlay>
                        {/* {Object.entries(draggables).map(([id, position]) => (
                            <TestDraggable key={id} id={id} position={position} onDragEnd={onDragEnd}>
                                Drag me!
                            </TestDraggable>
                        ))} */}
                    </DrawingBoard>

                </div>
            </div>
        </DndContext>




    );
}