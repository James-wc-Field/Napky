import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full mx-auto overflow-hidden">
      <NavigationBar>
        <div style={{ marginLeft: "auto" }}>
          <Button variant={"ghost"} className="text-lg" asChild>
            <Link href={"/discover"}>Discover</Link>
          </Button>
        </div>
      </NavigationBar>
      {children}
    </div>
  );
}
