import React from "react"
import { Input } from "@nextui-org/input"
import { VerticalGripIcon } from "./icons/VerticalGripIcon";
import { TrashIcon } from "./icons/TrashIcon";

export const CardNote = (props: { [key: string] : string }) => {
    console.log(props.selected);
    return (
        <Input
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
        />
    );

}