import { Button } from "@nextui-org/button";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";
import React from "react"
import { PlusIcon } from "./icons/PlusIcon";

// This component might not be used but can be when add button is pressed

export const AddItemButton = (props: { [key: string] : string }) => {
    return (
        <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly className=" bg-primary-dark rounded-full" variant="faded" aria-label="Add" size="lg">
                    <PlusIcon />
            </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="edit">Note</DropdownItem>
          <DropdownItem key="copy">Image</DropdownItem>
          <DropdownItem key="new">Link</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Close
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

}
