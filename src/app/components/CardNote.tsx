import React from "react"
import { Input } from "@nextui-org/input"
import { VerticalGripIcon } from "../../../public/icons/VerticalGripIcon";
import { TrashIcon } from "../../../public/icons/TrashIcon";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'
import { CardModuleProps } from "./types/CardModule";
import SortableModule from "./SortableModule"

export const CardNote = (props: CardModuleProps) => {
    return (
        <SortableModule id={props.id} className="w-full">
            <Input
            isReadOnly={false}
            variant="bordered"
            placeholder="Note"
            className="w-full"
            classNames={{
                inputWrapper: "bg-neutral-light shadow-md"
            }}
            endContent={
                props.editing && (<>
                    <div className="px-1 mr-2 h-full rounded-md bg-inherit hover:bg-neutral-dark flex items-center">
                        <VerticalGripIcon className="text-2xl text-default-400 pointer-events-none" />
                    </div>
                    <div className="px-1 h-full rounded-md bg-inherit hover:bg-red-400 flex items-center">
                        <TrashIcon className="text-2xl text-default-400 pointer-events-none" />
                    </div>
                </>)
            }
            type="text"
            />
        </SortableModule>
    );

}