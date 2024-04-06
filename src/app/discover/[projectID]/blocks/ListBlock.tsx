"use client";

import { Bars4Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
  ProjectElements,
} from "./Block";
import { Card } from "@ui/card";
import { useDroppable, useDraggable } from "@dnd-kit/core";

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
  canvasComponent: CanvasComponent,
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

  const ListElement = ProjectElements[element.type].canvasComponent;

  return (
    <Card style={style} className="flex flex-col gap-2 p-2">
      <p>{label}</p>
      <Card
        className="
        flex-1 flex flex-col items-center justify-center gap-1 border-0"
        {children.length > 0 ? (
          children.map((childId) => {
            const child = elements.find((e) => e.id === childId);
            if (!child) return null;
            <ListElement elementInstance={element} />
          })
        ) : (
          <p>{placeHolder}</p>
        )}
      </Card>
    </Card >
  );
}