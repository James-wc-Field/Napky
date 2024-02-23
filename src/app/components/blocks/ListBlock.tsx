"use client";

import { Bars4Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
  ProjectElements,
} from "../ProjectElements";
import { Card } from "@nextui-org/card";
import { useDroppable, useDraggable } from "@dnd-kit/core";

const type: ElementsType = "ListBlock";

const extraAttributes = {
  label: "List Block",
  placeHolder: "Add other blocks here...",
  items: [] as ProjectElementInstance[],
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
  listComponent: () => null,
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
      <ListDroppable element={element}>
        {items.length === 0 ? (
          <p className="text-neutral-500">{placeHolder}</p>
        ) : (
          items.map((item, index) => (
            <ListElementWrapper key={index} element={item} />
          ))
        )}
      </ListDroppable>
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
    data: {
      isListDroppable: true,
      element: element,
    },
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

function ListElementWrapper({ element }: { element: ProjectElementInstance }) {
  const { attributes, listeners, isDragging, setNodeRef } = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isListElement: true,
    },
  });

  const ListElement = ProjectElements[element.type].listComponent;
  if (!ListElement) return null;
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`${
        isDragging ? "opacity-50" : ""
      } bg-neutral-400 rounded-xl p-2 w-full`}
    >
      <ListElement elementInstance={element} />
    </div>
  );
}
