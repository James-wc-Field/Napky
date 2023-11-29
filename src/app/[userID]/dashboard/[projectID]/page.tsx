'use client'
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { useState, useId} from "react";
import Grid from "../../../components/Grid"; // Update the import path
import TestDraggable from "../../../components/TestDraggable"; // Update the import path
import DrawingBoard from "@/app/components/DrawingBoard";
export default function Page({ params }: { params: { projectID: string } }) {
    const id = useId()
    return (
        <DndContext id={id}>
            <div>My Project: {params.projectID}</div>
            <Grid>
                <DrawingBoard>
                <TestDraggable id="draggable-1">Drag me!</TestDraggable>
                <TestDraggable id="draggable-2">Drag me!</TestDraggable>
                </DrawingBoard>
            </Grid>
        </DndContext>
    );
}
