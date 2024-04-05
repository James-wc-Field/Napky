"use client";

import { Bars4Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
  ProjectElements,
} from "@/project/[projectID]/types/ProjectElements";
import { Card } from "@ui/card";

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
    selected: false,
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
  console.log(elementInstance as CustomInstance);
  const element = elementInstance as CustomInstance;
  const { label, placeHolder, children: children } = element.extraAttributes;
  const style = {
    maxWidth: element.size.width,
    minHeight: element.size.height,
  };


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
          <p>{placeHolder}</p>
        )}
      </ListDroppable>
    </Card>
  );
}

function ListDroppable({
  children,
  numItems,
}: {
  children: React.ReactNode;
  element: ProjectElementInstance;
  numItems: number;
}) {

  return (
    <Card
      className={`
        flex-1 flex flex-col items-center justify-center gap-1
        ${numItems > 0 ? "border-0" : ""}`}
    >
      {children}
    </Card>
  );
}

function ListElementWrapper({ element }: { element: ProjectElementInstance }) {


  const ListElement = ProjectElements[element.type].canvasComponent;
  return (
    <ListElement elementInstance={element} />
  );
}
