'use client'
import { DndContext } from "@dnd-kit/core";
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
    const [collapsed, setSidebarCollapsed] = useState(false);
    const [draggables, setDraggables] = useState<Draggables>({});

    function onDragEnd(event: any) {
        console.log(event)
        console.log("Moved!")
        setDraggables(prev => ({ ...prev, [event.active.id]: { x: prev[event.active.id].x + event.delta.x, y: prev[event.active.id].y + event.delta.y } }));
    }

    const createNewDraggable = () => {
        const newId = `draggable-${Object.keys(draggables).length + 1}`;
        setDraggables(prev => ({ [newId]: { x: 20, y: 20 },  ...prev}));
    };

    return (
       
            <div className="flex">
            <div
                className={classNames({
                    // 👇 use grid layout
                    "grid min-h-screen": true,
                    // 👇 toggle the width of the sidebar depending on the state
                    "grid-cols-sidebar": !collapsed,
                    "grid-cols-sidebar-collapsed": collapsed,
                    // 👇 transition animation classes
                    "transition-[grid-template-columns] duration-300 ease-in-out": true
                }) }
            >
                <div className="bg-indigo-700 text-white">
                    <button onClick={() => setSidebarCollapsed((prev) => !prev)}>
                        Toggle
                    </button>
                </div>
                </div>
                <div className=" flex-1">
                <button onClick={createNewDraggable}>Add Draggable</button>
                <DndContext onDragEnd={onDragEnd}>
                <DrawingBoard>
                    {Object.entries(draggables).map(([id, position]) => (
                        <TestDraggable key={id} id={id} position={position} onDragEnd={onDragEnd}>
                            Drag me!
                        </TestDraggable>
                    ))}
                </DrawingBoard>
                </DndContext>
                </div>
                </div>



        
    );
}