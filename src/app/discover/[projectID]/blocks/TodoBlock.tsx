"use client";

import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "./Block";
import { Card } from "@ui/card";
import { Textarea } from "@ui/textarea";
import { Checkbox } from "@ui/checkbox";

const type: ElementsType = "TodoBlock";

const extraAttributes = {
  label: "Todo Block",
  items: [""] as string[]
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
  const { placeHolder, checked, items } = element.extraAttributes;
  const style = {
    maxWidth: element.size.width,
  };

  return (
    <Card style={style} className="p-2 flex flex-col gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex flex-row items-center gap-2">
          <Checkbox
            disabled
            checked={checked[index]}
          />
          <Textarea
            disabled
            id={`${element.id}-todo-item-${index}`}
            value={item}
            rows={1} // Need a way to dynamically grow/shrink based on content like NextUI did it
            placeholder={placeHolder}
          />
        </div>
      ))}
    </Card>
  );
}
