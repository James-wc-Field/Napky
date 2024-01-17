'use client'
import {Listbox, ListboxSection, ListboxItem} from "@nextui-org/listbox";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

export default function Page() {
  return (
    <div>
      <Card className="w-1/6">
        <Listbox>
          <ListboxSection>
            <ListboxItem key="new">
              <Button>
                <p className="text-center p-4">New Project</p>
              </Button>
            </ListboxItem>
            <ListboxItem key="favs">Favorites</ListboxItem>
            <ListboxItem key="trash">Trash</ListboxItem>
          </ListboxSection>
        </Listbox>
      </Card>
    </div>
  );
}
