'use client'
import { DndContext } from "@dnd-kit/core";
import React from "react";
import Grid from "@components/Grid";
import TestDraggable from "@components/TestDraggable";
export default function Page({ params }: { params: { projectID: string } }) {
    return (
        <DndContext>
            <div>My Project: {params.projectID}</div>
            <Grid>
                <TestDraggable id="draggable-1">Drag me!</TestDraggable>
                <TestDraggable id="draggable-2">Drag me!</TestDraggable>
            </Grid>
        </DndContext>
    );
}
