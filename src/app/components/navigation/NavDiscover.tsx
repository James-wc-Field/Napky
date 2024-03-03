"use client"

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

export function NavDiscover() {
  //Find a Solution for the Hover of Menu Items
  return (
    <>
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" variant="solid" >
          <p>Categories</p>
          <ChevronUpDownIcon className="text-foreground h-6 w-6 min-w-6 min-h-6"/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" >
        <DropdownItem key="new">Cosplay</DropdownItem>
        <DropdownItem key="copy">3D Printing</DropdownItem>
        <DropdownItem key="edit">Carpentry</DropdownItem>
        <DropdownItem key="other">Other Stuff</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <div className="w-full">
      {/* Adjust to Keep Image Correct Size */}
    </div>
    </>
  )
}