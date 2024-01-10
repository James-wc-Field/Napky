import { useDraggable } from "@dnd-kit/core";
import React from "react";

interface DraggableProps {
    id: string;
    children: React.ReactNode;
    position: Position;
    onDragEnd: (id: string, position: {x: number, y: number}) => void;
    }
    interface Position {
      x: number;
      y: number;
  }
function Draggable(props: DraggableProps) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
      });
  const style =  {
    transform: `translate3d(${props.position.x + (transform?.x || 0)}px, ${props.position.y + (transform?.y || 0)}px, 0)`
  };
  const handleDragEnd = () => {
    console.log("Moved!")
    if (transform){
      props.onDragEnd(props.id, { x: props.position.x + transform.x, y: props.position.y + transform.y });
    }
  }
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}
    className={`p-4 border rounded shadow-lg bg-blue-200`}
    style={style}
    onDragEnd={handleDragEnd}>
      {props.children}
    </div>
  );
}

export default Draggable;