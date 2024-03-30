import React from "react";
import useProject from "@/project/[projectID]/hooks/useProject";

export default function CanvasBackground() {
  const { zoomLevel, scrollLeft, scrollTop } = useProject();
  const BASE_SIZE = 24;
  return (
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
  );
}
