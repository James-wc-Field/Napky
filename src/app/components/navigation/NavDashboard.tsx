"use client"

import {Input} from "@nextui-org/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";


//

export function NavDashboard() {
  //This needs refined
  return (
    <Input
      placeholder="Search projects..."
      size="sm"
      type="search"
      className="px-3"
    />
  )
}