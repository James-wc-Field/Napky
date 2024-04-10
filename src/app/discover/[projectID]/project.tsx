'use client'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import usePreventZoom from "@/project/[projectID]/hooks/usePreventZoom";
import { useDiscoverProjectStore } from "./storeProvider";
import { ProjectElementInstance, ProjectElements } from "./blocks/Block";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
export default function Project() {
    const elements = useDiscoverProjectStore((state) => state.elements);
    const updateScrollLeft = useDiscoverProjectStore((state) => state.updateScrollLeft);
    const updateScrollTop = useDiscoverProjectStore((state) => state.updateScrollTop);
    const updateZoomLevel = useDiscoverProjectStore((state) => state.updateZoomLevel);
    const scrollLeft = useDiscoverProjectStore((state) => state.scrollLeft);
    const scrollTop = useDiscoverProjectStore((state) => state.scrollTop);
    const zoomLevel = useDiscoverProjectStore((state) => state.zoomLevel);
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
            console.log(e.movementX, e.movementY)
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
    const BASE_SIZE = 24;
    return (
        <>
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
            <Card
                className="flex flex-col absolute top-20 right-4 gap-2 p-2"
                style={{ zIndex: 5 }}
            >
                <Button
                    variant={"outline"}
                    className="p-2"
                    onClick={() => updateZoomLevel(true, 1.2)}
                >
                    <PlusIcon className="w-6" />
                </Button>
                <Button
                    variant={"outline"}
                    className="p-2"
                    onClick={() => updateZoomLevel(false, 1.2)}
                >
                    <MinusIcon className="w-6" />
                </Button>
            </Card>
            {/* <MiniMap /> */}
            <svg
                className="absolute w-full h-full top-0 left-0"
                style={{
                    visibility: zoomLevel < 0.5 ? "hidden" : "visible",
                }}
            >
                <pattern
                    id="background"
                    x={scrollLeft % (BASE_SIZE * zoomLevel)}
                    y={scrollTop % (BASE_SIZE * zoomLevel)}
                    width={BASE_SIZE * zoomLevel}
                    height={BASE_SIZE * zoomLevel}
                    patternUnits="userSpaceOnUse"
                    patternTransform={`translate(${zoomLevel}, ${zoomLevel})`}
                >
                    <circle
                        cx={zoomLevel}
                        cy={zoomLevel}
                        r={zoomLevel}
                        fill="#91919a"
                    ></circle>
                </pattern>
                <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#background)"
                ></rect>
            </svg>
        </>
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
        <div style={style}>
            <div className="relative">
                <CanvasElement elementInstance={element} />
            </div>
        </div>
    );
}
