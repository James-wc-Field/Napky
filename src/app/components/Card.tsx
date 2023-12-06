'use client';
import React from "react";
import {Textarea, Input} from "@nextui-org/input"
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import NextImage from "next/image";
import { VerticalGripIcon } from "./icons/VerticalGripIcon";
import { TrashIcon } from "./icons/TrashIcon";

export default function TextCard() {
    const [selected, setSelected] = React.useState(true);
    const [title, setTitle] = React.useState("Title");

    return (
        <Card className="py-4 max-w-sm" onClick={()=>{setSelected(!selected)}}>
            <CardBody className="overflow-visible py-2 flex space-y-4">
            <Textarea 
                isReadOnly={selected ? false : true}
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                classNames={{
                    input: "text-center text-xl",
                }}
                variant="bordered"
                minRows={1}
            />
            <Input
                variant="bordered"
                placeholder="Note"
                endContent={
                    selected &&
                    (<>
                        <VerticalGripIcon className="text-2xl text-default-400 pointer-events-none" />
                        <TrashIcon className="text-2xl text-default-400 pointer-events-none" />
                    </>)
                }
                type="text"
            />

            <Card shadow="sm" className="flex w-full items-center justify-center bg-gray-800"> {/* import Lexi's colors into ts config */}
                <Image
                    as={NextImage}
                    alt="Card background"
                    className="object-cover rounded-xl mx-auto pt-4"
                    src="/images/pexels-alina-chernii-18879454.jpg"
                    width={270}
                    height={200}
                />
                <CardFooter className="text-small justify-between">
                    <Input
                        variant="bordered"
                        placeholder="Note"
                        endContent={
                            selected &&
                            (<>
                                <VerticalGripIcon className="text-2xl text-default-400 pointer-events-none" />
                                <TrashIcon className="text-2xl text-default-400 pointer-events-none" />
                            </>)
                        }
                        type="text"
                    />
                </CardFooter>
            </Card>
            </CardBody>
        </Card>
  
        // <div
        //     className="p-6 min-w-200px w-1/6 rounded-2xl border-[#505251] border-2 flex flex-col space-y-3"
        //     onClick={()=>{setSelected(!selected)}}
        // >

        //     <div className="rounded-lg border-[#505251] border-2">
        //         image
        //     </div>
        // </div>
    );
}