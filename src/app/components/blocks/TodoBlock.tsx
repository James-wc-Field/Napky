"use client";

import { ListBulletIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

const type: ElementsType = "TodoBlock";

const extraAttributes = {
  label: "Todo Block",
  helperText: "Helper Text",
  placeHolder: "Enter a task...",
};

export const TodoBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    size: { width: 300, height: 75 },
    extraAttributes,
  }),

  toolbarElement: {
    icon: ListBulletIcon,
    label: "Todo",
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
  };

  return (
    <Card style={style} className="p-2 h-fit">
      <CheckboxGroup>
        <div className="flex flex-row grow gap-1">
          <Checkbox className="flex"></Checkbox>
          <Input
            className="flex"
            size="sm"
            type="text"
            placeholder={placeHolder}
          />
        </div>
      </CheckboxGroup>
    </Card>
  );
}
