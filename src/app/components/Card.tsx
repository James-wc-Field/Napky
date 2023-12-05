'use client';
import React from "react";
import {Textarea} from "@nextui-org/input"
import { VerticalGrip } from "./icons/VerticalGrip";

export default function TextCard() {
    const [selected, setSelected] = React.useState(true);
    const [title, setTitle] = React.useState("Title");

    return (
        <div
            className="p-6 min-w-200px w-1/6 rounded-2xl border-[#505251] border-2 flex flex-col space-y-3"
            onClick={()=>{setSelected(!selected)}}
        >
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
            <VerticalGrip />
            <div className="rounded-lg border-[#505251] border-2">
                image
            </div>
        </div>
    );
}
