import React from "react"
import { Input } from "@nextui-org/input"
import { VerticalGripIcon } from "../../../public/icons/VerticalGripIcon";
import { TrashIcon } from "../../../public/icons/TrashIcon";

export const CardNote = (props: { [key: string] : string }) => {
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