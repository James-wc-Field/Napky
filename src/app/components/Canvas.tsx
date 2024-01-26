import React, { useId, useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {restrictToParentElement} from "@dnd-kit/modifiers";
import { Card } from "@nextui-org/react";

interface DraggableItemProps {
  id: UniqueIdentifier;
  x: number;
  y: number;
}

function Draggable({ id, x, y }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

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
  };

  return (
    <Card ref={setNodeRef} className="flex grow w-full p-4" style={style}>
      {children}
    </Card>
  );
}

export default function Canvas() {
  const [items, setItems] = useState<DraggableItemProps[]>([
    { id: "1", x: 50, y: 50 },
    { id: "2", x: 50, y: 300 },
  ]);
  const [activeDraggable, setActiveDraggable] = useState<DraggableItemProps | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const draggable = items.find((item) => item.id === event.active.id);
    if (!draggable) return;
    setActiveDraggable(draggable);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    const dragged = items.find((item) => item.id === active.id);
    if (!dragged) return;

    dragged.x += delta.x;
    dragged.y += delta.y;

    const updatedItems = items.map((item) => {
      if (item.id === dragged.id) return dragged;
      return item;
    });

    setItems(updatedItems);
    setActiveDraggable(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
      <div className="relative flex grow gap-4 p-4 overflow-hidden">
        <Droppable id="canvas"></Droppable>
        <Droppable id="canvas2"></Droppable>
        {items.map((item) => (
          <Draggable key={item.id} {...item} />
        ))}
      <DragOverlay>
        {activeDraggable ? (
          <Card
            id={String(activeDraggable)}
            className="absolute w-[100px] h-[100px] justify-center items-center bg-primary"
          >
            Item {activeDraggable.id}: x={activeDraggable.x.toFixed(2)}: y=
            {activeDraggable.y.toFixed(2)}
          </Card>
        ) : null}
      </DragOverlay>
      </div>
    </DndContext>
  );
}
