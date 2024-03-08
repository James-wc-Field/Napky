'use client'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuItem,
    NavbarMenuToggle,
    NavbarMenu,
    Input,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownItem,
    DropdownMenu,
    Listbox,
    ListboxItem,
    Card,
    Button,
    Divider,
} from "@nextui-org/react";
import { useState } from "react";
import React, { ReactNode } from "react";



function Layout({ children }: { children: ReactNode }) {
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
          {children}
      </div>
    );
}

export default Layout;