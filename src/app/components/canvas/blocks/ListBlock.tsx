"use client";

import { Bars4Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
  ProjectElements,
} from "@canvas/types/ProjectElements";
import { Card } from "@ui/card";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import useProject from "@canvas/hooks/useProject";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react"

const type: ElementsType = "ListBlock";

const extraAttributes = {
  label: "List Block",
  placeHolder: "Add other blocks here...",
  children: [] as string[],
};

export const ListBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    size: { width: 300, height: 100 },
    parentId,
    extraAttributes,
  }),

  toolbarElement: {
    icon: Bars4Icon,
    label: "List",
  },

  canvasComponent: CanvasComponent,
  toolbarPropertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = ProjectElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: ProjectElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, placeHolder, children: children } = element.extraAttributes;
  const style = {
    maxWidth: element.size.width,
    minHeight: element.size.height,
  };
  const { elements } = useProject();
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}>
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
        <CollapsibleContent>
        <ListDroppable element={element} numItems={children.length}>
          {children.length > 0 ? (
            children.map((childId) => {
              const child = elements.find((e) => e.id === childId);
              if (!child) return null;
              return <ListElementWrapper key={childId} element={child} />;
            })
          ) : (
            <p>{placeHolder}</p>
          )}
        </ListDroppable>
        </CollapsibleContent>
      </Card>
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
        flex-1 flex flex-col items-center justify-center gap-1
        ${numItems > 0 ? "border-0" : ""}
        ${isOver ? "ring-1 ring-current" : ""}`}
      >
        {children}
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
