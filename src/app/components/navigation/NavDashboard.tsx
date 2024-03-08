"use client"

import {Input} from "@ui/input";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

export function NavDashboard() {
  //This needs refined
  return (
    <Input
      placeholder="Search projects..."
      type="search"
      className="px-3"
    />
  )
}