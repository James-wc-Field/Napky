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
        <Button 
        // adjust the hover over for button
        >
        <p>Categories</p>
          <div className="flex justify-center align-center">
            <ChevronUpDownIcon className="w-6 h-6"/>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
      // adjust the focus color for Menu items
      >
        <DropdownMenuGroup>
          <DropdownMenuItem >Woodworking</DropdownMenuItem>
          <DropdownMenuItem >Engineering</DropdownMenuItem>
          <DropdownMenuItem >Costumes & Sewing</DropdownMenuItem>
          <DropdownMenuItem >Nose Picking</DropdownMenuItem>
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
    </>
  )
}