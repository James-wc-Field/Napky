"use client"

import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function NavDiscover() {
  //Find a Solution for the Hover of Menu Items
  return (
    <>
    <div className="flex w-full m-10">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
        <p>Categories</p>
          <div className="flex justify-center align-center">
            <ChevronUpDownIcon className="w-6 h-6"/>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Woodworking</DropdownMenuItem>
          <DropdownMenuItem>Engineering</DropdownMenuItem>
          <DropdownMenuItem>Costumes & Sewing</DropdownMenuItem>
          <DropdownMenuItem>Nose Picking</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <Input 
    className="border-border ml-10"
    type="search"
    placeholder="Search Projects..."
    >
    </Input>
    </div>
    {/* <Dropdown>
      <DropdownTrigger>
        <Button color="primary" variant="solid" className="min-w-24">
          <p>Categories</p>
          <div className="flex w-12 h-12 justify-center align-center">
            <ChevronUpDownIcon/>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" classNames={{base: "border-2 rounded-lg",}}> 
        <DropdownItem key="new">Cosplay</DropdownItem>
        <DropdownItem key="copy">3D Printing</DropdownItem>
        <DropdownItem key="edit">Carpentry</DropdownItem>
        <DropdownItem key="other">Other Stuff</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <div className="w-full">
    </div> */}
    </>
  )
}