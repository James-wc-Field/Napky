'use client'

import { Link , Image } from "@nextui-org/react";
import { ReactElement, useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { NavDiscover } from "./NavDiscover";
import { NavDashboard } from "./NavDashboard";

export function NavigationBar () {
  // Needs Implemented
  const [user, setUser] = useState("");
  const [project, setProject] = useState("");


  const [middleState, setMiddleState] = useState(<></>);
  const [endState, setEndState] = useState<ReactElement>(<></>);
  const pathname = usePathname()

  useEffect(() => {
    // getUser()
    // getProject()

    if (pathname === "/discover") {
        setMiddleState(NavDiscover());
        setEndState(<Link className="mx-4" color="foreground" href="/dashboard">Dashboard</Link>);
    }
    else if (pathname === "/dashboard") {
        setMiddleState(NavDashboard());
        setEndState(<Link className="mx-4" color="foreground" href="/discover">Discover</Link>);

    }
    else if (pathname.startsWith("/project/")) {
        setMiddleState(<>{project}</>);
        setEndState(
          <>
          <Link className="mx-4" color="foreground" href="/discover">Discover</Link>
          <Link className="mx-4" color="foreground" href="/dashboard">Dashboard</Link>
          </>);
        }
      },[])

  return (
    <>
    <nav className="bg-content2 flex p-2 items-center font-main px-10">
      <Link 
      className="flex justify-center items-center ml-2 min-w-fit"
      color="foreground"
      href="/discover"
      >
        <Image
        // Need to resolve this issue with project
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
      {middleState}
      </div>
      <div className="flex justify-end min-w-fit">
        {endState}
        {user? 
          <Link className="mx-4" color="foreground" href="#">Account</Link> : 
          <Link className="mx-4" color="foreground" href="#">Sign In</Link>}
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