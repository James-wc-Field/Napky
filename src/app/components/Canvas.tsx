import React, { useState } from "react";
import {
  DragStartEvent,
  UniqueIdentifier,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Card } from "@nextui-org/react";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";

interface DraggableItemProps {
  id: UniqueIdentifier;
  x: number;
  y: number;
}

function Draggable({ id, x, y }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style: React.CSSProperties = {
    left: `${x}px`,
    top: `${y}px`,
    visibility: isDragging ? "hidden" : undefined,
  };

  return (
    <Card
      id={String(id)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="absolute w-[100px] h-[100px] justify-center items-center bg-primary"
    >
      Item {id}: x={x.toFixed(2)}: y={y.toFixed(2)}
    </Card>
  );
}

function Droppable({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    border: isOver ? "1px solid red" : "1px solid transparent",
    background: isOver ? "rgba(255, 0, 0, 0.1)" : "transparent",
  };

  return (
    <Card ref={setNodeRef} className="flex grow w-full p-4" style={style}>
      {children}
    </Card>
  );
}

export default function Canvas({
  elements,
}: {
  elements: ProjectElementInstance[];
}) {
  const [items, setItems] = useState<DraggableItemProps[]>([]);
  const [activeDraggable, setActiveDraggable] =
    useState<DraggableItemProps | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const draggable = items.find((item) => item.id === event.active.id);
    if (!draggable) return;
    setActiveDraggable(draggable);
  };

  return (
    <div className="relative flex grow gap-4 p-4 overflow-hidden">
      <Droppable id="canvas">
        {elements.length > 0 && (
          <div className="flex flex-col w-full gap-2 p-4">
            {elements.map((element) => (
              <CanvasElementWrapper key={element.id} element={element} />
            ))}
          </div>
        )}
      </Droppable>
      {items.map((item) => (
        <Draggable key={item.id} {...item} />
      ))}
    </div>
  );
}

function CanvasElementWrapper({
  element,
}: {
  element: ProjectElementInstance;
}) {
  const CanvasElement = ProjectElements[element.type].canvasComponent;
  return (
    <div className="flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none">
      <CanvasElement elementInstance={element} />
    </div>
  );
}
