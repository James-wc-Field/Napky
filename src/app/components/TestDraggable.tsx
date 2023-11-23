import { useDraggable } from "@dnd-kit/core";
import React from "react";

interface DraggableProps {
    id: string;
    children: React.ReactNode;
    }
function Draggable(props: DraggableProps) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
      });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}
    className={`p-4 border rounded shadow-lg bg-blue-200`}
    style={style}>
      {props.children}
    </div>
  );
}

export default Draggable;
