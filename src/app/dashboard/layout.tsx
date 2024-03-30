import { NavigationBar } from "@/components/NavigationBar";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavigationBar>
                <Input
                    placeholder="Search projects..."
                    type="search"
                    className="px-5"
                />
                <Button variant={"ghost"} className="text-lg " asChild>
                    <Link href={"/discover"}>Discover</Link>
                </Button>
            </NavigationBar>
            {children}
        </>
    )
}