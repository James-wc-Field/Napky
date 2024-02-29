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

  function handleOnAddItem() {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        items: [...items, ""],
        checked: [...checked, false],
      },
    });
  }

  function handleOnTodoItemChange(e: FormEvent<HTMLElement> | string[]) {
    if (Array.isArray(e)) {
      handleOnCheckboxChange(e);
    } else {
      handleOnTextChange(e);
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

  function handleOnTextChange(e: FormEvent<HTMLElement>) {
    const { value } = e.target as HTMLInputElement;
    console.log(e);
    const index = parseInt(
      (e.target as HTMLInputElement).getAttribute("data-index")!
    );
    console.log(index, value);
  }

  return (
    <Card
      style={style}
      className="p-2 h-fit"
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.shiftKey === false) {
          handleOnAddItem();
          e.preventDefault();
        }
      }}
    >
      <CheckboxGroup
        label={element.extraAttributes.label}
        onChange={handleOnTodoItemChange}
        value={checked.map((_, index) => {
          if (checked[index]) {
            return index + "";
          }
          return "";
        })}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <Checkbox value={index + ""} />
            <Textarea minRows={1} value={item} placeholder={placeHolder} />
          </div>
        ))}
      </CheckboxGroup>
    </Card>
  );
}
