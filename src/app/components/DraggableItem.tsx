import React, { useId } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Card } from "@nextui-org/react";
import { DraggableItemProps } from "./Canvas";

export const DraggableItem: React.FC<DraggableItemProps> = ({ id, x, y }) => {
  const draggable = useDraggable({ id });

  const style = draggable.transform
    ? {
      transform: `translate(${draggable.transform.x}px, ${draggable.transform.y}px)`,
    }
    : undefined;

  const id = useId();

  return (
    <Card
      id={id}
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      style={style}
      className="absolute w-[250px] justify-center items-center bg-primary"
    >
      Item {id}: x={x}: y={y}
    </Card>
  );
};
