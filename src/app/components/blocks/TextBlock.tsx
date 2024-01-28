"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useState } from "react";

const type: ElementsType = "TextBlock";

const extraAttributes = {
  label: "Text Block",
  helperText: "Helper Text",
  placeHolder: "Start typing here...",
};

export const TextBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    size: { width: 300, height: 75 },
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
  const style = {
    width: element.size.width,
    height: element.size.height,
  };

  function handleTextChange(value: string) {
    element.extraAttributes.placeHolder = value
  }

  return (
    <Card style={style}>
      <CardBody className="justify-center">
        <Input
          size="sm"
          type="text"
          placeholder={placeHolder}
          onChange={(key) => handleTextChange(key.target.value)}
        />
      </CardBody>
    </Card>
  );
}
