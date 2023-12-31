import React from "react"
import { Input } from "@nextui-org/input"
import { VerticalGripIcon } from "../../../public/icons/VerticalGripIcon";
import { TrashIcon } from "../../../public/icons/TrashIcon";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'
import { CardModuleProps } from "./types/CardModule";
import SortableModule from "./SortableModule"
import {Image} from "@nextui-org/image";
import NextImage from "next/image";
import {Badge} from "@nextui-org/badge";
import { Chip } from "@nextui-org/chip";

export const CardImage = (props: CardModuleProps) => {
    return (
        <SortableModule id={props.id} className="w-full">
            <div>
                <Image
                    as={NextImage}
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="/images/pexels-alina-chernii-18879454.jpg"
                    width={270}
                    height={200}
                />
                {props.editing && (
                    <div className="absolute right-9 top-4 bg-neutral-dark w-fit flex z-50 p-2 rounded-md">
                        <div className="p-1 mr-2 h-full rounded-md bg-inherit hover:bg-neutral-light flex items-center">
                            <VerticalGripIcon className="text-2xl text-default-400 pointer-events-none" />
                        </div>
                        <div className="p-1 h-full rounded-md bg-inherit hover:bg-red-400 flex items-center">
                            <TrashIcon className="text-2xl text-default-400 pointer-events-none" />
                        </div>
                    </div>
                )}
            </div>
        </SortableModule>
    );

}