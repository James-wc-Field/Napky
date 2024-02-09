"use client";

import { Bars4Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Card, CardBody } from "@nextui-org/card";
import { CardHeader } from "@nextui-org/react";

const type: ElementsType = "ListBlock";

const extraAttributes = {
  label: "List Block",
  helperText: "Helper Text",
  placeHolder: "Add other blocks here...",
};

export const ListBlockProjectElement: ProjectElement = {
  type,
  construct: (
    id: string,
  ) => ({
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
  const { label, placeHolder, helperText } = element.extraAttributes;
  const style = {
    width: element.size.width,
    height: element.size.height,
  };

  return (
    <Card style={style}>
      <CardHeader>{label}</CardHeader>
      <CardBody className="justify-center">
        <Card className="w-full h-full">
          <CardBody className="flex justify-center items-center">
            <p>{placeHolder}</p>
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  );
}
