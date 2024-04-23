"use client";

import { Bars4Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
  ProjectElements,
} from "@/[projectID]/types/ProjectElements";
import { Card } from "@ui/card";
import { useDroppable, useDraggable } from "@dnd-kit/core";
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
    minHeight: element.size.height,
  };

  const elements = useProjectStore((state) => state.elements);

  return (
    <Card style={style} className="flex flex-col gap-2 p-2">
      <p>{label}</p>
      <ListDroppable element={element} numItems={children.length}>
        {children.length > 0 ? (
          children.map((childId) => {
            const child = elements.find((e) => e.id === childId);
            if (!child) return null;
            return <ListElementWrapper key={childId} element={child} />;
          })
        ) : (
          <p>{placeholder}</p>
        )}
      </ListDroppable>
    </Card>
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
