'use client'
import { ReactElement, useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { NavDiscover } from "./NavDiscover";
import { NavDashboard } from "./NavDashboard";
import { ThemeToggle } from "../ThemeToggle";
import Image from 'next/image'

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
        setEndState(<a className="mx-4" href="/dashboard">Dashboard</a>);
    }
    else if (pathname === "/dashboard") {
        setMiddleState(NavDashboard());
        setEndState(<a className="mx-4" href="/discover">Discover</a>);
    }
    else if (pathname.startsWith("/project/")) {
        setMiddleState(<>{project}</>);
        setEndState(
          <>
          <a className="mx-4" href="/discover">Discover</a>
          <a className="mx-4" href="/dashboard">Dashboard</a>
          </>);
        }
      },[pathname, project]);

  return (
    <>
    <nav className="bg-navbar text-navbar-foreground flex p-2 items-center font-main px-10">
      <a href="/discover" className="flex justify-center items-center ml-2 min-w-fit">
        <Image
        // Need absolute path to icon
        className="min-w-12"
        width={48}
        height={48}
        alt="Happy Squirrel"
        src="/images/icon.png"
        />
        <p className="mx-2 text-xl">
          KorkBored
        </p>
      </a>
      <div className="flex w-full justify-center"> 
      {middleState}
      </div>
      <div className="flex justify-end min-w-fit">
        {endState}
        {user? 
          <a className="mx-4" href="#">Account</a> : 
          <a className="mx-4" href="/login">Login</a>}
      </div>
      <ThemeToggle></ThemeToggle>
    </nav>
    </>
  );
}