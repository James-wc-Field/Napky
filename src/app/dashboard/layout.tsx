'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import classNames from "classnames";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Napky</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/./dashboard">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/./discover" aria-current="page">
              Discover
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="/./account-info" variant="flat">
              Account
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div
      className={classNames({
        // 👇 use grid layout
        "grid min-h-screen": true,
        // 👇 toggle the width of the sidebar depending on the state

      })}
    >
      <div className=""> {children}</div>
    </div>
    </section>
  )
}
