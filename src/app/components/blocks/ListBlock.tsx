"use client";

import { Bars4Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Card } from "@nextui-org/card";
import { useDroppable } from "@dnd-kit/core";

const type: ElementsType = "ListBlock";

const extraAttributes = {
  label: "List Block",
  placeHolder: "Add other blocks here...",
  items: [],
};

export const ListBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    size: { width: 300, height: 200 },
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
  const { label, placeHolder, items } = element.extraAttributes;
  const style = {
    width: element.size.width,
    height: element.size.height,
  };

  return (
    <Card style={style} className="gap-2 p-2">
      <p>{label}</p>
      <Card className="w-full h-full p-1">
        <ListDroppable element={element}>
          <p className="text-neutral-400">{placeHolder}</p>
          {items.map((item, index) => (
            <div key={index} className="bg-neutral-100 p-2">
              {item}
            </div>
          ))}
        </ListDroppable>
      </Card>
    </Card>
  );
}

function ListDroppable({
  children,
  element,
}: {
  children: React.ReactNode;
  element: ProjectElementInstance;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: element.id + "-list-droppable",
  });
  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver ? "bg-neutral-600/50" : ""
      } w-full h-full rounded-xl border-2 border-dashed border-neutral-700 items-center justify-center flex flex-col gap-2`}
    >
      {children}
    </div>
  );
}
