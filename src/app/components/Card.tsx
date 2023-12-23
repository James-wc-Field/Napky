'use client';
import React, { Component } from "react";
import {Textarea, Input} from "@nextui-org/input"
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Button, ButtonGroup} from "@nextui-org/button"
import {Image} from "@nextui-org/image";
import NextImage from "next/image";
import { VerticalGripIcon } from "../../../public/icons/VerticalGripIcon";
import { TrashIcon } from "../../../public/icons/TrashIcon";
import { PlusIcon } from "../../../public/icons/PlusIcon";
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
    UniqueIdentifier,
    DragEndEvent,
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
import {CardModule} from "./types/CardModule"
  

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'
import TestSortable from "./TestSortable";
import { CardImage } from "./CardImage";

// Using dnd-kit for now, but gotta see if that needs support for dragging items in from outside windows.

function moduleIdGenerator() {
    return Math.floor(Math.random() * 9999);
}

export default function ProjectCard() {
    const [editing, setEditing] = React.useState(true);
    const [cardModules, setCardModules] = React.useState<CardModule[]>([])
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );
    

    const onPressHandler = (value: string) => {
        if (value == "note")
            setCardModules([...cardModules!, {component: CardNote, id: moduleIdGenerator()}])
        if (value == "image")
            setCardModules([...cardModules!, {component: CardImage, id: moduleIdGenerator()}])
        if (value == "link")
            setCardModules([...cardModules!, {component: CardNote, id: moduleIdGenerator()}]) // TODO
    }

    return (
    <>
        <Card className="py-4 max-w-sm bg-neutral-light " /* isPressable onPress={(e)=>{setSelected(!selected);}} */>
            <CardBody className="overflow-visible py-2 flex space-y-4 items-center">
            <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            >
            <SortableContext 
                items={cardModules.map(module => module.id)}
                strategy={verticalListSortingStrategy}
                >
                {cardModules.map(module => {
                    const Component = module.component!;
                    return <Component key={module.id} id={module.id} editing={editing} />;
                    })}
            {/* <TestSortable />
            <Textarea 
                isReadOnly={editing ? false : true}
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                classNames={{
                    input: "text-center text-xl",
                    inputWrapper: "bg-neutral-light shadow-md",
                }}
                variant="bordered"
                minRows={1}
                />
            <CardNote key={2} id={2} editing={editing} />
            <Card shadow="sm" className="p-3 flex w-full justify-center items-center bg-neutral-light border-neutral-dark border-2">
                <CardFooter className="p-0 pt-3 text-small justify-between">
                    <CardNote key={1} id={1} editing={editing} />
                </CardFooter>
            </Card>
            {cardModules.map(module => {
                const Component = module.component!;
                return <Component key={module.id} id={module.id} editing={editing} />;
                })} */}
            </SortableContext>
            </DndContext>
            <div className="w-full flex justify-evenly">
                <AddItemButton onAddCardModule={onPressHandler}/>
                <Button isIconOnly className=" bg-primary-dark rounded-full" variant="faded" aria-label="Add" size="lg" onPress={(e)=>{setEditing(!editing);}}>
                        <CardEditIcon />
                </Button>
            </div>

            </CardBody>
        </Card>
        
    </>
    );

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;
        
        if (over?.id && active.id !== over.id) {
            setCardModules((cardModules: CardModule[]) => {
            const oldIndex = cardModules.map(module => module.id).indexOf(active.id);
            const newIndex = cardModules.map(module => module.id).indexOf(over.id);
            
            return arrayMove(cardModules!, oldIndex, newIndex);
          });
        }
    }    
}
