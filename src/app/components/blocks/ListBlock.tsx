"use client";

import { Bars4Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
  ProjectElements,
} from "../ProjectElements";
import { Card } from "@nextui-org/card";
import { useDroppable, useDraggable, useDndContext } from "@dnd-kit/core";
import useProject from "../hooks/useProject";

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
    size: { width: 300, height: 110 },
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
    width: element.size.width,
    minHeight: element.size.height,
  };

  return (
    <Card style={style} className="gap-2 p-2 items-center">
      <p>{label}</p>
      <ListDroppable element={element}>
        {children.length === 0 ? (
          <p className="text-neutral-500">{placeHolder}</p>
        ) : (
          children.map((listElement, index) => (
            <ListElementWrapper key={index} elementId={listElement} />
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
  const { active } = useDndContext();
  const { isOver, setNodeRef } = useDroppable({
    id: element.id + "-list-droppable",
    disabled: element.id === active?.data?.current?.elementId, // Prevent dropping onto itself
    data: {
      isListDroppable: true,
      elementId: element.id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver ? "bg-neutral-600/50" : ""
      } flex-1 w-full rounded-xl border-2 border-dashed border-neutral-700
      flex flex-col items-center justify-center gap-2`}
    >
      {children}
    </div>
  );
}

function ListElementWrapper({ elementId }: { elementId: string }) {
  const { elements } = useProject();
  const element = elements.find((element) => element.id === elementId);
  if (!element) return null;

  const { attributes, listeners, isDragging, setNodeRef } = useDraggable({
    id: element.id + "-drag-handler",
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
      className={`${isDragging ? "opacity-50" : ""}`}
    >
      <ListElement elementInstance={element} />
    </div>
  );
}
