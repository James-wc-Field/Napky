import { useDraggable } from "@dnd-kit/core";
import React from "react";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  position: { x: number; y: number };
}

function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {

    transform: `translate3d(${(transform?.x ?? 0) + props.position.x}px, ${(transform?.y ?? 0) + props.position.y}px, 0)`
  };

  return (
    <button ref={setNodeRef} {...listeners} {...attributes}
      className={`p-4 border rounded shadow-lg bg-blue-200`}
      style={style}>
      {props.children}
    </button>
  );
}

export default Draggable;