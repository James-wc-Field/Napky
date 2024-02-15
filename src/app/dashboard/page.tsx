'use client';

import {Listbox, ListboxItem} from "@nextui-org/listbox";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import { useState } from "react";
import { Navbar, NavbarBrand, NavbarMenu, NavbarItem, NavbarMenuItem, NavbarContent, NavbarMenuToggle} from "@nextui-org/navbar"
import { Input } from "@nextui-org/input"
import { Avatar } from "@nextui-org/avatar"

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent justify="center" className="basis-1/6">
          <NavbarMenuToggle className="sm:hidden"/>
          <NavbarMenu>
            <NavbarMenuItem>Home</NavbarMenuItem>
            <NavbarMenuItem>Favorites</NavbarMenuItem>
            <NavbarMenuItem>Trash</NavbarMenuItem>
          </NavbarMenu>
          <NavbarBrand>
            <p className="pr-2">Logo</p>
            <p className="hidden sm:block font-bold text-inherit">Napky</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div" justify="center" className="basis-4/6">
          <Input
            placeholder="Search projects..."
            size="sm"
            type="search"
          />
        </NavbarContent>

        <NavbarContent as="div" justify="center" className="basis-1/6">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                name="John Smith"
                size="sm"
                src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
              <DropdownItem
                textValue="Signed in as example@example.com"
                key="profile"
                className="h-14 gap-2"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">example@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <div className="flex p-4 sm:gap-4">
        <Card className="hidden w-1/5 sm:flex h-fit">
          <Dropdown placement="right">
            <DropdownTrigger>
              <Button className="text-lg text-center p-6 m-4">New</Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="project" href="/project/12345">Project</DropdownItem>
              <DropdownItem key="folder">Folder</DropdownItem>
              <DropdownItem key="file">File Upload</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Divider />

          <Listbox
            label="project-nav"
            selectionMode="single"
          >
            <ListboxItem key="home" >Home</ListboxItem>
            <ListboxItem key="favs" >Favorites</ListboxItem>
            <ListboxItem key="trash">Trash</ListboxItem>
          </Listbox>
        </Card>

        <Card className="flex w-full sm:w-4/5 p-4 h-full">
          <p>Project view here</p>
        </Card>
      </div>
    </div>
  );
}
