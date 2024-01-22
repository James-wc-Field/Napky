'use client'
import { DndContext } from "@dnd-kit/core";
import React from "react";
import {Tldraw} from '@tldraw/tldraw';
import { useState } from "react";
import TestDraggable from "../../components/TestDraggable"; // Update the import path
import DrawingBoard from "@/app/components/DrawingBoard";
export default function Page({ params }: { params: { projectID: string } }) {


    return (
        <div style={{position: 'fixed', inset: 0}}>
            <Tldraw/>
        </div>  
    );
}