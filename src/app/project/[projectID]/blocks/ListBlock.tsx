"use client";

import { Bars4Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
  ProjectElements,
} from "@/project/[projectID]/types/ProjectElements";
import { Card } from "@ui/card";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useRef, useState } from "react"
import { useProjectStore } from "../storeProvider";

const type: ElementsType = "ListBlock";

const extraAttributes = {
  children: [] as string[],
};

const unstoredAttributes = {
  label: "List Block",
  placeholder: "Add other blocks here...",
};
// 
export const ListBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string) => ({
    id,
    selected: false,
    type,
    position: { x: 0, y: 0 },
    size: { width: 300, height: 100 },
    parentId,
    extraAttributes,
    unstoredAttributes,
  }),

  addUnstoredAttributes: (element: ProjectElementInstance) => {
    return {
      ...element,
      unstoredAttributes,
    };
  },

  toolbarElement: {
    icon: Bars4Icon,
    label: "List",
  },

  canvasComponent: CanvasComponent,
  toolbarPropertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = ProjectElementInstance & {
  extraAttributes: typeof extraAttributes;
  unstoredAttributes: typeof unstoredAttributes;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: ProjectElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { children } = element.extraAttributes;
  const { label, placeholder } = element.unstoredAttributes;
  const style = {
    maxWidth: element.size.width,
    minHeight: element.size.height
  };
  const collapsibleRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(true)

  const elements = useProjectStore((state) => state.elements);
  return (
    <Collapsible
      ref={collapsibleRef}
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen)
      }}>
      <div>
        <Card style={style} className="flex flex-col gap-2 p-2">
          <div className="flex flex-row justify-between">
            <p className="content-center">{label}</p>
            <CollapsibleTrigger className="-right-10" asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          {!isOpen && children.length > 0 ? (
            <ListDroppable element={element} numItems={1}>
              <ListElementWrapper key={children[0]} element={elements.find((e) => e.id === children[0])!} />
            </ListDroppable>
          ) : (<></>)}
          <CollapsibleContent>
            <ListDroppable element={element} numItems={children.length}>
              {children.length > 0 ? (
                children.map((childId) => {
                  const child = elements.find((e) => e.id === childId);
                  if (!child) return null;
                  return <ListElementWrapper key={childId} element={child} />;
                })
              ) : (<></>)}
            </ListDroppable>
          </CollapsibleContent>
        </Card>
      </div>
    </Collapsible >

  );
}

function ListDroppable({
  children,
  element,
  numItems,
}: {
  children: React.ReactNode;
  element: ProjectElementInstance;
  numItems: number;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: element.id + "-list-droppable",
    data: {
      isListDroppable: true,
      elementId: element.id,
      accepts: Object.keys(ProjectElements).filter(
        (type) => type !== element.type
      ),
    },
  });
  return (
    <Card
      ref={setNodeRef}
      className={`
        flex-1 flex flex-col gap-1
        ${numItems > 0 ? "border-0" : "items-center justify-center"}
        ${isOver ? "ring-1 ring-current border-dashed" : ""}`}
    >
      {children}
      <div className={`h-20 justify-center items-center flex ${numItems > 0 ? "border-l border-b rounded-lg border-r" : ""}`}>
        Add other blocks here...
      </div>
    </Card>
  );
}

function ListElementWrapper({ element }: { element: ProjectElementInstance }) {
  const { attributes, listeners, isDragging, setNodeRef } = useDraggable({
    id: element?.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isListElement: true,
    },
  });

  const ListElement = ProjectElements[element.type].canvasComponent;
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`${isDragging ? "opacity-50" : ""} w-full`}
    >
      <ListElement elementInstance={element} />
    </div>
  );
}
