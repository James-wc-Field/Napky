import React, { useRef, useState } from "react";
import useProject from "@/project/[projectID]/hooks/useProject";

export default function CanvasBackground() {
  const { zoomLevel, scrollLeft, scrollTop } = useProject();
  const BASE_SIZE = 24;
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [path, setPath] = useState("");

  const startDrawing = (event: MouseEvent) => {
    console.log("startDrawing");
    setIsDrawing(true);
    if (svgRef.current === null) return;
    const point = svgRef.current.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const transformedPoint = point.matrixTransform(
      svgRef.current.getScreenCTM()?.inverse()
    );
    setPath(`M ${transformedPoint.x} ${transformedPoint.y}`);
  };

  const continueDrawing = (event: MouseEvent) => {
    if (!isDrawing) return;
    if (svgRef.current === null) return;
    const point = svgRef.current.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const transformedPoint = point.matrixTransform(
      svgRef.current.getScreenCTM()?.inverse()
    );
    setPath((prevPath) => `${prevPath} L ${transformedPoint.x} ${transformedPoint.y}`);
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <svg
      ref={svgRef}
      className="absolute w-full h-full top-0 left-0"
      style={{
        visibility: zoomLevel < 0.5 ? "hidden" : "visible",
      }}
      onTouchStart={() => startDrawing}
      onTouchMove={() => continueDrawing}
      onTouchEnd={() => endDrawing}
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
      {isDrawing && <path d={path} stroke="#000" strokeWidth="2" fill="none" />}
    </svg>
  );
}
