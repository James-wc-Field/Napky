"use client";

import { ListBulletIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Card } from "@nextui-org/card";
import { Checkbox, CheckboxGroup, Textarea } from "@nextui-org/react";
import useProject from "../hooks/useProject";
import { FormEvent, useEffect } from "react";

const type: ElementsType = "TodoBlock";

const extraAttributes = {
  label: "Todo Block",
  placeHolder: "Enter a task...",
  items: [""] as string[],
  checked: [false] as boolean[],
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
  const { placeHolder, checked, items } = element.extraAttributes;
  const style = {
    maxWidth: element.size.width,
  };

  function handleOnKeyPress(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Enter" && !e.shiftKey) {
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      const newChecked = [...checked];
      newChecked.splice(index + 1, 0, false);
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          items: newItems,
          checked: newChecked,
        },
      });
      e.preventDefault();

      // Focus on the next item
      setTimeout(() => {
        const nextInput = document.getElementById(
          `${element.id}-todo-item-${index + 1}`
        ) as HTMLInputElement;
        nextInput?.focus();
      });
    }
  }

  function handleOnTodoItemChange(e: FormEvent<HTMLElement> | string[]) {
    if (Array.isArray(e)) {
      handleOnCheckboxChange(e);
    }
  }

  function handleOnCheckboxChange(e: string[]) {
    const newChecked = items.map((_, index) => e.includes(index + ""));
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        checked: newChecked,
      },
    });
  }

  function handleOnTextChange(e: string, index: number) {
    const newItems = [...items];
    newItems[index] = e;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        items: newItems,
      },
    });
  }

  return (
    <Card style={style} className="p-2 h-fit">
      <CheckboxGroup
        label={element.extraAttributes.label}
        onChange={handleOnTodoItemChange}
        value={checked.map((_, index) => (checked[index] ? index + "" : ""))}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <Checkbox value={index + ""} />
            <Textarea
              id={`${element.id}-todo-item-${index}`}
              key={index}
              minRows={1}
              value={item}
              placeholder={placeHolder}
              onValueChange={(e) => handleOnTextChange(e, index)}
              onKeyDown={(e) => handleOnKeyPress(e, index)}
            />
          </div>
        ))}
      </CheckboxGroup>
    </Card>
  );
}
