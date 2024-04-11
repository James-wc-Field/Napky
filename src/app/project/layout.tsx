import React, { ReactNode } from "react";
import { ProjectStoreProvider } from "./[projectID]/storeProvider";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Layout({ children }: { children: ReactNode }) {
  return (

    <div className="flex flex-col min-h-screen max-h-screen min-w-full">
      <main className="flex grow">
        <div className="w-full mx-auto overflow-hidden">
          <NavigationBar>
            <div style={{ marginLeft: "auto" }}>
              <Button variant={"ghost"} className="text-lg" asChild>
                <Link href={"/discover"}>Discover</Link>
              </Button>
            </div>
          </NavigationBar>
          <ProjectStoreProvider>
            {children}
          </ProjectStoreProvider>
        </div>
      </main>
    </div>
  );
}

export default Layout;
