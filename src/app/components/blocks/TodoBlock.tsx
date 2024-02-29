"use client";

import { ListBulletIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import useProject from "../hooks/useProject";

const type: ElementsType = "TodoBlock";

const extraAttributes = {
  label: "Todo Block",
  placeHolder: "Enter a task...",
  text: "",
  items: [] as string[],
  checked: [] as boolean[],
};

export const TodoBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    size: { width: 300, height: 75 },
    parentId,
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
  const { updateElement } = useProject();
  const element = elementInstance as CustomInstance;
  const { placeHolder, text } = element.extraAttributes;
  const style = {
    maxWidth: element.size.width,
  };

  function handleOnTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        text: e.target.value,
      },
    });
  }

  return (
    <Card style={style} className="p-2 h-fit">
      <CheckboxGroup>
        <div className="flex flex-row grow gap-1">
          <Checkbox />
          <Input
            size="sm"
            placeholder={placeHolder}
            onChange={handleOnTextChange}
            value={text}
          />
        </div>
      </CheckboxGroup>
    </Card>
  );
}
