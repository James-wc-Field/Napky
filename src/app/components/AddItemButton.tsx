import { Button } from "@nextui-org/button";
import "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import React from "react";
import { PlusIcon } from "../../../public/icons/PlusIcon";
import { CardNoteIcon } from "../../../public/icons/CardNoteIcon";
import { TrashIcon } from "../../../public/icons/TrashIcon";
import { CardLinkIcon } from "../../../public/icons/CardLinkIcon";
import { CardImageIcon } from "../../../public/icons/CardImageIcon";

// This component might not be used but can be when add button is pressed

export const AddItemButton = (props: {
  [key: string]: (value: string) => void;
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          className=" bg-primary-dark rounded-full"
          variant="faded"
          aria-label="Add"
          size="lg"
        >
          <PlusIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="note"
          endContent={<CardNoteIcon />}
          onPress={() => {
            props.onAddCardModule("note");
          }}
        >
          Note
        </DropdownItem>
        <DropdownItem
          key="image"
          endContent={<CardImageIcon />}
          onPress={() => {
            props.onAddCardModule("image");
          }}
        >
          Image
        </DropdownItem>
        <DropdownItem
          key="link"
          endContent={<CardLinkIcon />}
          onPress={() => {
            props.onAddCardModule("link");
          }}
        >
          Link
        </DropdownItem>
        <DropdownItem key="close" className="text-danger" color="danger">
          Close
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
