'use client'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Suspense } from "react";
import usePreventZoom from "@/project/[projectID]/hooks/usePreventZoom";
import { useProjectStore } from "@/project/[projectID]/storeProvider";
import CanvasControls from "@/project/[projectID]/CanvasControls";
import CanvasBackground from "@/project/[projectID]/CanvasBackground";
import { ProjectElementInstance, ProjectElements } from "./blocks/Block";
export default function Project({ elements }: { elements: ProjectElementInstance[] }) {
    const updateScrollLeft = useProjectStore((state) => state.updateScrollLeft);
    const updateScrollTop = useProjectStore((state) => state.updateScrollTop);
    const updateZoomLevel = useProjectStore((state) => state.updateZoomLevel);
    const scrollLeft = useProjectStore((state) => state.scrollLeft);
    const scrollTop = useProjectStore((state) => state.scrollTop);
    const zoomLevel = useProjectStore((state) => state.zoomLevel);
    useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
            html.style.overflow = "hidden"
        }
    }, []);
    usePreventZoom();
    const [middleMouseIsDown, setMiddleMouseIsDown] = useState(false)

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 1) {
            setMiddleMouseIsDown(true);
        }
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (middleMouseIsDown) {
            updateScrollLeft(-e.movementX);
            updateScrollTop(-e.movementY);
        }
    }, [updateScrollLeft, updateScrollTop, middleMouseIsDown])
    const handleMouseUp = useCallback(() => {
        setMiddleMouseIsDown(false);
    }, [])
    const handleScroll = (e: React.WheelEvent) => {
        const { deltaX, deltaY } = e;
        if (e.ctrlKey) {
            updateZoomLevel(deltaY < 0, 1.05);
            return;
        } else if (e.shiftKey) {
            updateScrollLeft(deltaY);
            return;
        }
        updateScrollLeft(deltaX);
        updateScrollTop(deltaY);
    };
    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            // Cleanup event listeners when component unmounts
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <div
                id="canvas-renderer"
                className="absolute w-full h-full top-0 left-0"
                style={{ zIndex: 4 }}
                onWheel={handleScroll}
                onMouseDown={handleMouseDown}                    >
                <div
                    id="canvas-viewport"
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        transform: `translate3d(${scrollLeft}px, ${scrollTop}px, 0) scale(${zoomLevel})`,
                        transformOrigin: "top left",
                        zIndex: 2,
                    }}
                >
                    {elements.map((element) => {
                        if (element.parentId !== "root") return null;
                        return <CanvasElementWrapper key={element.id} element={element} />;
                    })}
                </div>
            </div>
            <CanvasControls />
            {/* <MiniMap /> */}
            <CanvasBackground />
        </Suspense >
    )
}
function CanvasElementWrapper({
    element,
}: {
    element: ProjectElementInstance,
}) {
    const style: React.CSSProperties = {
        position: "absolute",
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height
    };

    const CanvasElement = useMemo(() => {
        return ProjectElements[element.type].canvasComponent;
    }, [element]);


    return (
        <div style={style}
        >
            <div className="relative">
                <CanvasElement elementInstance={element} />
            </div>
        </div>
    );
}
