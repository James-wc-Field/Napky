import {Listbox, ListboxItem} from "@nextui-org/listbox";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import { Suspense, useState } from "react";
import { Navbar, NavbarBrand, NavbarMenu, NavbarItem, NavbarMenuItem, NavbarContent, NavbarMenuToggle} from "@nextui-org/navbar"
import { Input } from "@nextui-org/input"
import { Avatar } from "@nextui-org/avatar"
import { generateClient } from 'aws-amplify/api';
import { listTests } from '../../graphql/queries';
import { Test } from '../../API';
export default async function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Projects/>
    </Suspense>
  )
}

async function Projects(){
  const client = generateClient();
  const projects =  (await client.graphql({query: listTests})).data.listTests.items;
  return (
    projects.map((project: Test) => (
    <Card className="flex w-full sm:w-4/5 p-4 h-full">
    <p>{project.name}</p>
  </Card>

  )))
}
