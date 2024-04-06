"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "./Block";
import { Card } from "@ui/card";
import { Textarea } from "@ui/textarea";

const type: ElementsType = "TextBlock";

const extraAttributes = {
  text: ""
};

export const TextBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    size: { width: 300, height: 75 },
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
  const { text, placeHolder } = element.extraAttributes;

  const style = {
    maxWidth: element.size.width,
  };

  return (
    <Card style={style} className="p-2">
      <Textarea
        placeholder={placeHolder}
        value={text}
      />
    </Card>
  );
}
