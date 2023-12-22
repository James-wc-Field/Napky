import React from "react"
import { Input } from "@nextui-org/input"
import { VerticalGripIcon } from "../../../public/icons/VerticalGripIcon";
import { TrashIcon } from "../../../public/icons/TrashIcon";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'

export const CardNote = (props: { [key: string] : string }) => {
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

    return (
        <div className="w-full" ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
        </div>
    );

}