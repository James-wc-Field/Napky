"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { CardNote } from "./CardNote";
import { AddItemButton } from "./AddItemButton";
import { CardEditIcon } from "../../../public/icons/CardEditIcon";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CardModule } from "./types/CardModule";

import { CardImage } from "./CardImage";

function moduleIdGenerator() {
  return Math.floor(Math.random() * 9999);
}

export default function ProjectCard() {
  const [editing, setEditing] = React.useState(true);
  const [cardModules, setCardModules] = React.useState<CardModule[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onPressHandler = (value: string) => {
    if (value == "note")
      setCardModules([
        ...cardModules!,
        { component: CardNote, id: moduleIdGenerator() },
      ]);
    if (value == "image")
      setCardModules([
        ...cardModules!,
        { component: CardImage, id: moduleIdGenerator() },
      ]);
    if (value == "link")
      setCardModules([
        ...cardModules!,
        { component: CardNote, id: moduleIdGenerator() },
      ]); // TODO
  };

  return (
    <>
      <Card className="py-4 max-w-sm bg-neutral-light ">
        <CardBody className="overflow-visible py-2 flex space-y-4 items-center">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={cardModules.map((module) => module.id)}
              strategy={verticalListSortingStrategy}
            >
              {cardModules.map((module) => {
                const Component = module.component!;
                return (
                  <Component key={module.id} id={module.id} editing={editing} />
                );
              })}
            </SortableContext>
          </DndContext>
          <div className="w-full flex justify-evenly">
            <AddItemButton onAddCardModule={onPressHandler} />
            <Button
              isIconOnly
              className=" bg-primary-dark rounded-full"
              variant="faded"
              aria-label="Add"
              size="lg"
              onPress={(e) => {
                setEditing(!editing);
              }}
            >
              <CardEditIcon />
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      setCardModules((cardModules: CardModule[]) => {
        const oldIndex = cardModules
          .map((module) => module.id)
          .indexOf(active.id);
        const newIndex = cardModules
          .map((module) => module.id)
          .indexOf(over.id);

        return arrayMove(cardModules!, oldIndex, newIndex);
      });
    }
  }
}
