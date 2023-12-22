'use client';
import React from "react";
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
import { DndContext } from "@dnd-kit/core";

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'
import TestSortable from "./TestSortable";

const DraggingItem = (props: { [key: string] : string }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    console.log(transform, transition);

    return (
        <div className="w-full p-4" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            Hello
            {/* <Input
            variant="bordered"
            placeholder="Note"
            classNames={{
                inputWrapper: "bg-neutral-light shadow-md"
            }}
            endContent={
                (props.selected == "true") &&
                (<>
                    <VerticalGripIcon className="text-2xl text-default-400 pointer-events-none" />
                    <TrashIcon className="text-2xl text-default-400 pointer-events-none" />
                </>)
            }
            type="text"
            /> */}
        </div>
    );

}

// Using dnd-kit for now, but gotta see if that supports dragging items in from outside windows.

export default function TextCard() {
    const [selected, setSelected] = React.useState(true);
    const [title, setTitle] = React.useState("Title");
    const [addedModules, setAddedModules] = React.useState<React.ReactNode[]>([])

    const onPressHandler = (value: string) => {
        if (value == "note")
            setAddedModules([...addedModules!, <CardNote />])
        if (value == "image")
            setAddedModules([...addedModules!, <CardNote />])
        if (value == "link")
            setAddedModules([...addedModules!, <CardNote />])
    }

    return (
    <>
        <Card className="py-4 max-w-sm bg-neutral-light " /* isPressable onPress={(e)=>{setSelected(!selected);}} */>
            <CardBody className="overflow-visible py-2 flex space-y-4 items-center">
            <TestSortable />
            <Textarea 
                isReadOnly={selected ? false : true}
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                classNames={{
                    input: "text-center text-xl",
                    inputWrapper: "bg-neutral-light shadow-md",
                }}
                variant="bordered"
                minRows={1}
                />
            <CardNote selected={String(selected)}></CardNote>
            <Card shadow="sm" className="p-3 flex w-full justify-center items-center bg-neutral-light border-neutral-dark border-2"> {/* import Lexi's colors into ts config */}
                <Image
                    as={NextImage}
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="/images/pexels-alina-chernii-18879454.jpg"
                    width={270}
                    height={200}
                    />
                <CardFooter className="p-0 pt-3 text-small justify-between">
                    <CardNote selected={String(selected)}></CardNote>
                </CardFooter>
            </Card>
            {addedModules}
            <div className="w-full flex justify-evenly">
                <AddItemButton onAddCardModule={onPressHandler}/>
                <Button isIconOnly className=" bg-primary-dark rounded-full" variant="faded" aria-label="Add" size="lg" onPress={(e)=>{setSelected(!selected);}}>
                        <CardEditIcon />
                </Button>
            </div>

            </CardBody>
        </Card>
        
    </>
    );
}
