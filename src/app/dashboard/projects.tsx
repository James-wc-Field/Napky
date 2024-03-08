'use client'
import { Project } from "@/API";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Button, Divider, Listbox, ListboxItem } from "@nextui-org/react";
import { Card, Link } from "@nextui-org/react";
interface ProjectProps {
    projects: Project[];
    projectPath: string;

}
export function Projects(props: ProjectProps) {
    const { projects, projectPath} = props;
    return (
        <div>
        <div className="flex p-4 sm:gap-4">
        <Card className="hidden w-1/5 sm:flex h-fit">
          <Dropdown placement="right">
            <DropdownTrigger>
              <Button className="text-lg text-center p-6 m-4">New</Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="project" href={projectPath}>Project</DropdownItem>
              <DropdownItem key="folder">Folder</DropdownItem>
              <DropdownItem key="file">File Upload</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Divider />

          <Listbox
            label="project-nav"
            selectionMode="single"
          >
            <ListboxItem key="home" >Home</ListboxItem>
            <ListboxItem key="favs" >Favorites</ListboxItem>
            <ListboxItem key="trash">Trash</ListboxItem>
          </Listbox>
        </Card>
      </div>
        <div>
            {projects.map(project => (
                <Card>
                    <Link href={`../project/${project.id}`}>
                        <div key={project.id}>
                            <h1>{project.name}</h1>
                            <p>{project.description}</p>
                        </div>
                    </Link>
                </Card>
            ))}
        </div>
        </div>
    )
}