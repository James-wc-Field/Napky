import { ReactNode } from "react";
import { DiscoverProjectStoreProvider } from "./storeProvider";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
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
                    <DiscoverProjectStoreProvider>
                        {children}
                    </DiscoverProjectStoreProvider>
                </div>
            </main>
        </div>
    )

}