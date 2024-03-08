"use client"

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

export function NavDiscover() {
  //Find a Solution for the Hover of Menu Items
  return (
    <>
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" variant="solid" className="min-w-24">
          <p>Categories</p>
          <div className="flex w-12 h-12 justify-center align-center">
            <ChevronUpDownIcon/>
          </div>
        </Button>
      </DropdownTrigger>
      {/* This is not a good solution for bordering the drop down Menu Make my own? request Theme options */}
      <DropdownMenu aria-label="Static Actions" classNames={{base: "border-2 rounded-lg",}}> 
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