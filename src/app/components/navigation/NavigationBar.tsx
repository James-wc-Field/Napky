"use client";

import { ReactElement, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavDiscover } from "./NavDiscover";
import { NavDashboard } from "./NavDashboard";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { currentAuthenticatedUser } from "@/lib/auth";
import { AuthUser } from "aws-amplify/auth";

export function NavigationBar() {
  const [project, setProject] = useState("");
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    currentAuthenticatedUser().then((user) => setUser(user));
  }, []);

  const [middleState, setMiddleState] = useState(<></>);
  const [endState, setEndState] = useState<ReactElement>(<></>);
  const pathname = usePathname();

  useEffect(() => {
    // getUser()
    // getProject()

    if (pathname === "/discover") {
      setMiddleState(NavDiscover());
      setEndState(
        <Button variant={"ghost"} className="text-lg " asChild>
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
      );
    } else if (pathname === "/dashboard") {
      setMiddleState(NavDashboard());
      setEndState(
        <Button variant={"ghost"} className="text-lg " asChild>
          <Link href={"/discover"}>Discover</Link>
        </Button>
      );
    } else if (pathname.startsWith("/project/")) {
      setMiddleState(<>{project}</>);
      setEndState(
        <>
          <Button variant={"ghost"} className="text-lg " asChild>
            <Link href={"/discover"}>Discover</Link>
          </Button>
          <Button variant={"ghost"} className="text-lg " asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
        </>
      );
    }
  }, [pathname, project]);

  return (
    <>
      <nav className="bg-navbar text-navbar-foreground flex p-2 items-center font-main px-10 h-nav">
        <a
          href="/discover"
          className="flex justify-center items-center ml-2 min-w-fit"
        >
          <Image
            // Need absolute path to icon
            className="min-w-12"
            width={48}
            height={48}
            alt="Happy Squirrel"
            src="/images/icon.png"
          />
          <p className="mx-2 text-xl">KorkBo</p>
        </a>
        <div className="flex w-full justify-center mx-5">{middleState}</div>
        <div className="flex justify-end min-w-fit">
          {endState}
          {user ? (
            <Button variant={"ghost"} className="text-lg " asChild>
              <Link href={"#"}>Account</Link>
            </Button>
          ) : (
            <Button variant={"ghost"} className="text-lg " asChild>
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>
          )}
        </div>
        <ThemeToggle />
      </nav>
    </>
  );
}
