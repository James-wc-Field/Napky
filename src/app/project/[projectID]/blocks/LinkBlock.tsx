"use client";

import { LinkIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Card, CardBody, Input } from "@nextui-org/react";
import useProject from "../hooks/useProject";

const type: ElementsType = "LinkBlock";

const extraAttributes = {
  label: "Link Block",
  text: "",
  placeHolder: "Enter link URL...",
};

export const LinkBlockProjectElement: ProjectElement = {
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
    icon: LinkIcon,
    label: "Link",
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
  const { label, placeHolder, text } = element.extraAttributes;
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
    <Card style={style} className="p-2 h-fit flex flex-row gap-1 items-center">
      <LinkIcon className="text-gray-500 h-6 w-6" />
      <Input
        size="sm"
        placeholder={placeHolder}
        onChange={handleOnTextChange}
        value={text}
      />
    </Card>
  );
}