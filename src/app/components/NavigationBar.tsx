'use client'

import {   Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem, Link , Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

export function NavigationBar () {
  const [user, setUser] = useState(null);

  
  return (
    <>
    <nav className="bg-content2 flex p-2 items-center font-main px-10">
      <Link 
      className="flex justify-center items-center ml-2 min-w-fit"
      color="foreground"
      href="#"
      >
        <Image
        className="min-w-12"
        width={48}
        alt="Happy Squirrel"
        src="images/icon.png"
        />
        <p className="mx-2 text-xl">
          KorkBored
        </p>
      </Link>
      <div className="flex w-full justify-center"> 
        {}
      </div>
      <div className="flex justify-end min-w-fit">
        <Link className="mx-4" color="foreground" href="#">Dashboard</Link>
        <Link className="mx-4" color="foreground" href="#">{user? "Account" : "Sign In"}</Link>
      </div>
    </nav>
    </>
    // <Navbar position="static" className="bg-content2">
    //   <NavbarBrand>
    //     {/* image here  */}
    //     <p className="font-bold text-inherit">KorkBored</p>
    //   </NavbarBrand>
    //   <NavbarContent className="hidden sm:flex gap-4" justify="center">
    //     <NavbarItem>
    //       <Link color="foreground" href="#">
    //         Features
    //       </Link>
    //     </NavbarItem>
    //     <NavbarItem isActive>
    //       <Link href="#" aria-current="page">
    //         Customers
    //       </Link>
    //     </NavbarItem>
    //     <NavbarItem>
    //       <Link color="foreground" href="#">
    //         Integrations
    //       </Link>
    //     </NavbarItem>
    //   </NavbarContent>
    //   <NavbarContent justify="end">
    //     <NavbarItem className="hidden lg:flex">
    //       <Link href="#">Login</Link>
    //     </NavbarItem>
    //     <NavbarItem>
    //       <Link color="primary" href="#">
    //         Sign Up
    //       </Link>
    //     </NavbarItem>
    //   </NavbarContent>
    // </Navbar>
  );
}