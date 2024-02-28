"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import useProject from "../hooks/useProject";

const type: ElementsType = "TextBlock";

const extraAttributes = {
  text: "",
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
    label: "Text",
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
  const { updateElement, elements } = useProject();
  const element = elements.find(
    (el) => el.id === elementInstance.id
  ) as CustomInstance;
  const style = {
    width: element?.size.width || 300,
  };

  if (!element)
    return (
      <Card style={style} className="p-2 h-fit">
        <Input size="sm" type="text" placeholder="Start typing here..." />
      </Card>
    );

  const { text, placeHolder } = element.extraAttributes;
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
      <Input
        size="sm"
        type="text"
        placeholder={placeHolder}
        onChange={handleOnTextChange}
        value={text}
      />
    </Card>
  );
}
