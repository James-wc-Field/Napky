"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";

const type: ElementsType = "TextBlock";

const extraAttributes = {
  label: "Text Block",
  helperText: "Helper Text",
  placeHolder: "Start typing here...",
};

export const TextBlockProjectElement: ProjectElement = {
  type,
  construct: (
    id: string,
    position?: { x: number; y: number },
    size?: { width: number; height: number }
  ) => ({
    id,
    type,
    position: position ?? { x: 0, y: 0 },
    size: size ?? { width: 100, height: 100 },
    extraAttributes,
  }),

  toolbarElement: {
    icon: Bars3Icon,
    label: "Text Block",
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

  return (
    <Card>
      {label}
      <CardBody>
        <Input type="text" placeholder={placeHolder} />
      </CardBody>
    </Card>
  );
}
