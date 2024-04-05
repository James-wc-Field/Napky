import { NavigationBar } from "@/components/NavigationBar";
import { DropdownMenu } from "@ui/dropdown-menu";
import { DropdownMenuContent } from "@ui/dropdown-menu";
import { DropdownMenuGroup } from "@ui/dropdown-menu";
import { DropdownMenuItem } from "@ui/dropdown-menu";
import { DropdownMenuTrigger } from "@ui/dropdown-menu";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {/* <NavigationBar>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        // adjust the hover over for button
                        >
                            <p>Categories</p>
                            <div className="flex justify-center align-center">
                                <ChevronUpDownIcon className="w-6 h-6" />
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                    // adjust the focus color for Menu items
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem >Woodworking</DropdownMenuItem>
                            <DropdownMenuItem >Engineering</DropdownMenuItem>
                            <DropdownMenuItem >Costumes & Sewing</DropdownMenuItem>
                            <DropdownMenuItem >Nose Picking</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Input
                    className="border-border ml-10"
                    type="search"
                    placeholder="Search Projects..."
                >
                </Input>
                <Button variant={"ghost"} className="text-lg " asChild>
                    <Link href={"/dashboard"}>Dashboard</Link>
                </Button>
            </NavigationBar> */}
            {children}
        </>
    )
}