"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Card } from "@components/ui/card";
import { Textarea } from "@components/ui/textarea";
import useProject from "../hooks/useProject";

const type: ElementsType = "TextBlock";

const extraAttributes = {
  text: "",
  placeHolder: "Start typing here...",
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
  const { updateElement } = useProject();
  const element = elementInstance as CustomInstance;
  const { text, placeHolder } = element.extraAttributes;

  function handleOnTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        text: e.target.value,
      },
    });
  }
  const style = {
    maxWidth: element.size.width,
  };

  return (
    <Card style={style}>
      <Textarea
        placeholder={placeHolder}
        value={text}
        onChange={handleOnTextChange}
      />
    </Card>
  );
}
