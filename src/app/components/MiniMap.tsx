import React from "react";
import { ProjectElementInstance } from "./ProjectElements";
import useProject from "./hooks/useProject";
import { useDndMonitor } from "@dnd-kit/core";

// Minimap implementation based on example at https://cgxmxt.csb.app/
function MiniMap() {
  const { elements, zoomLevel, scrollLeft, scrollTop, canvasViewRect } =
    useProject();

  const [overlayRect, setOverlayRect] = React.useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  useDndMonitor({
    onDragMove: (event) => {
      const {
        top: overlayTop = 0,
        left: overlayLeft = 0,
        width: overlayWidth = 0,
        height: overlayHeight = 0,
      } = event.active.rect.current.translated ?? {};

      setOverlayRect({
        left: overlayLeft - canvasViewRect.left,
        top: overlayTop - canvasViewRect.top,
        width: overlayWidth ?? 0,
        height: overlayHeight ?? 0,
      });
    },
    onDragEnd: (event) => {
      setOverlayRect(null);
    },
  }); // This causes an maximum update depth error, fix at some point if we decide to use the minimap

  return (
    <div
      className="absolute right-0 bottom-0 m-4 rounded-lg"
      style={{ zIndex: 5 }}
    >
      <svg
        className="w-48 h-32 bg-neutral-800/80 rounded-lg"
        viewBox={`
            ${-scrollLeft - 10} ${-scrollTop - 10}
            ${canvasViewRect.width + 20} ${canvasViewRect.height + 20}
          `}
      >
        {/* Rect for each element */}
        {elements.map((element: ProjectElementInstance) => {
          if (element.parentId !== "root") return null;
          return (
            <rect
              x={element.position.x * zoomLevel}
              y={element.position.y * zoomLevel}
              width={element.size.width * zoomLevel}
              height={element.size.height * zoomLevel}
              fill="#606060"
              key={element.id}
            />
          );
        })}

        {/* Overlay rect */}
        {overlayRect && (
          <rect
            x={overlayRect.left - scrollLeft}
            y={overlayRect.top - scrollTop}
            width={overlayRect.width}
            height={overlayRect.height}
            fill="#636363"
            fillOpacity={0.5}
            stroke="none"
            strokeWidth="1"
            pointerEvents="none"
          />
        )}

        {/* Canvas view rect */}
        <path
          d={`M${-scrollLeft - 20},${-scrollTop - 20}h${canvasViewRect.width + 40}v${canvasViewRect.height + 40}h-${canvasViewRect.width + 40}z
              M${-scrollLeft},${-scrollTop}h${canvasViewRect.width}v${ canvasViewRect.height }h-${canvasViewRect.width}z`}
          fill="#505050"
          fillOpacity={0.3}
          fillRule="evenodd"
          stroke="none"
          strokeWidth="1"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}

export default MiniMap;
