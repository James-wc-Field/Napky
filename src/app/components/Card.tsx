'use client';
import React from "react";
import {Textarea, Input} from "@nextui-org/input"
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Button, ButtonGroup} from "@nextui-org/button"
import {Image} from "@nextui-org/image";
import NextImage from "next/image";
import { VerticalGripIcon } from "./icons/VerticalGripIcon";
import { TrashIcon } from "./icons/TrashIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { CardNote } from "./CardNote";

export default function TextCard() {
    const [selected, setSelected] = React.useState(true);
    const [adding, setAdding] = React.useState(false);
    const [title, setTitle] = React.useState("Title");

    return (
        <Card className="py-4 max-w-sm bg-neutral-light " isPressable onPress={(e)=>{setSelected(!selected);}}>
            <CardBody className="overflow-visible py-2 flex space-y-4 items-center">
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

            <Button isIconOnly className="bg-primary-dark rounded-full" variant="faded" aria-label="Like">
                <PlusIcon />
            </Button>
            <Card className="bg-primary-dark w-full border-neutral-dark border-2">
                <ButtonGroup radius="sm" className="">
                    <Button>Note</Button>
                    <Button>Image</Button>
                    <Button>Link</Button>
                </ButtonGroup>

                <CardBody>
                    <CardNote selected="false"></CardNote>
                </CardBody>

            </Card>
            </CardBody>
        </Card>
    );
}
