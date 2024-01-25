import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen min-w-full">
      <Navbar isBordered>
        <NavbarBrand>
          <NavbarItem>LOGO</NavbarItem>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>Hello</NavbarItem>
          <NavbarItem>Hello</NavbarItem>
        </NavbarContent>
        <NavbarItem>Hello</NavbarItem>
      </Navbar>
      <main className="flex grow">{children}</main>
    </div>
  );
}

export default Layout;
