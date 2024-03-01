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
    maxWidth: element.size.width,
    minHeight: element.size.height,
  };
  const { elements } = useProject();

  return (
    <Card style={style} className="gap-2 p-2 items-center">
      <p>{label}</p>
      <ListDroppable element={element}>
        {children.length > 0 ? (
          children.map((childId) => {
            const child = elements.find((e) => e.id === childId);
            if (!child) return null;
            return <ListElementWrapper key={childId} element={child} />
          })
        ) : (
          <p className="text-neutral-400">{placeHolder}</p>
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
      elementId: element.id,
      accepts: Object.keys(ProjectElements).filter(
        (type) => type !== element.type
      ),
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`${isOver ? "bg-neutral-600/50" : ""} flex-1 w-full rounded-xl 
      flex flex-col items-center justify-center gap-1 outline-2 outline-neutral-700 outline-dashed`}
    >
      {children}
    </div>
  );
}

function ListElementWrapper({ element }: { element: ProjectElementInstance}) {
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
