import React, { useRef, useState } from "react";
import { useProjectStore } from "./storeProvider";

export default function CanvasBackground() {
  const zoomLevel = useProjectStore((state) => state.zoomLevel);
  const scrollLeft = useProjectStore((state) => state.scrollLeft);
  const scrollTop = useProjectStore((state) => state.scrollTop);
  const isDrawing = useProjectStore((state) => state.isDrawing);
  const updateIsDrawing = useProjectStore((state) => state.updateIsDrawing);
  const BASE_SIZE = 24;
  const [clicked, setClicked] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [currentPath, setCurrentPath] = useState('');
  const [paths, setPaths] = useState<string[]>([]);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);

  const getPoint = (event: MouseEvent) => {
    const point = svgRef.current?.createSVGPoint()!;
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(svgRef.current?.getScreenCTM()?.inverse());
  };

  const calculateInterpolatedPoints = (currentX: number, currentY: number) => {
    const points: { x: number; y: number }[] = [];
    if (lastPoint && lastTimestamp) {
      const deltaX = currentX - lastPoint.x;
      const deltaY = currentY - lastPoint.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTimestamp;
      const speed = distance / deltaTime;
      const numInterpolatedPoints = Math.floor(distance / 2); // Adjust this factor for smoother/faster drawing
      for (let i = 0; i < numInterpolatedPoints; i++) {
        const interpolationFactor = i / numInterpolatedPoints;
        const interpolatedX = lastPoint.x + interpolationFactor * deltaX;
        const interpolatedY = lastPoint.y + interpolationFactor * deltaY;
        points.push({ x: interpolatedX, y: interpolatedY });
      }
    }
    return points;
  };

  const startDrawing = (event: MouseEvent) => {
    setClicked(true);
    const { x, y } = getPoint(event);
    setCurrentPath(`M ${x} ${y}`);
    setLastPoint({ x, y });
    setLastTimestamp(Date.now());
  };

  const draw = (event: MouseEvent) => {
    if (!clicked) return;
    const { x, y } = getPoint(event);
    const interpolatedPoints = calculateInterpolatedPoints(x, y);
    const pathSegments = interpolatedPoints.map(
      (point) => `L ${point.x} ${point.y}`
    );
    setCurrentPath((prev) => prev + pathSegments.join(' '));
    setLastPoint({ x, y });
    setLastTimestamp(Date.now());
  };

  const stopDrawing = () => {
    setClicked(false);
    setPaths((prev) => [...prev, currentPath]);
    setCurrentPath('');
    setLastPoint(null);
    setLastTimestamp(null);
  };

  return (
    <svg
      ref={svgRef}
      className="absolute w-full h-full top-0 left-0"
      style={{
        zIndex: isDrawing ? 99 : 1,
        visibility: zoomLevel < 0.5 ? "hidden" : "visible",
      }}
      onMouseDown={(event) => startDrawing(event.nativeEvent)}
      onMouseMove={(event) => draw(event.nativeEvent)}
      onMouseUp={(event) => stopDrawing()}
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
      {paths.map((path, index) => (
        <path key={index} d={path} stroke="purple" strokeWidth="2" fill="none" style={{ zIndex: 100 }} />
      ))}
      <path d={currentPath} stroke="purple" strokeWidth="2" fill="none" />
    </svg>
  );
}
