"use client"

import * as React from "react"
import { Moon, Sun, FlaskConical, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  console.log(useTheme().theme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="mx-2">
          {
          useTheme().theme === "light"? <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />:
          useTheme().theme === "dark"? <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100"/> :
          useTheme().theme === "test"? <FlaskConical className="absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all rotate-0"/>:
          <SunMoon className="absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all rotate-0"/>}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" >
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("test")}>
          Test
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
