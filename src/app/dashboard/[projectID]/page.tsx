'use client'
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { useState, useId} from "react";
import Grid from "../../components/Grid"; // Update the import path
import TestDraggable from "../../components/TestDraggable"; // Update the import path
import DrawingBoard from "@/app/components/DrawingBoard";
interface Draggables {
    [key: string]: Position;
}
interface Position {
    x: number;
    y: number;
}

export default function Page({ params }: { params: { projectID: string } }) {
    const [draggables, setDraggables] = useState<Draggables>({});

    function onDragEnd(event: any) {
        console.log(event)
        console.log("Moved!")
        setDraggables(prev => ({ ...prev, [event.active.id]: { x: prev[event.active.id].x + event.delta.x, y: prev[event.active.id].y + event.delta.y } }));
    }

    const createNewDraggable = () => {
        const newId = `draggable-${Object.keys(draggables).length + 1}`;
        setDraggables(prev => ({ ...prev, [newId]: { x: 20, y: 20 } }));
    };

    return (
        <DndContext onDragEnd={onDragEnd}>
            <div>My Project: {params.projectID}</div>
            <button onClick={createNewDraggable}>Add Draggable</button>
                <DrawingBoard>
                    {Object.entries(draggables).map(([id, position]) => (
                        <TestDraggable key={id} id={id} position={position} onDragEnd={onDragEnd}>
                            Drag me!
                        </TestDraggable>
                    ))}
                </DrawingBoard>
        </DndContext>
    );
}