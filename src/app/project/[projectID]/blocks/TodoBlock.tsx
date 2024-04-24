"use client";

import { ListBulletIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "@/project/[projectID]/types/ProjectElements";
import { Card } from "@ui/card";
import { Textarea } from "@ui/textarea";
import { Checkbox } from "@ui/checkbox";
import { useProjectStore } from "../storeProvider";

const type: ElementsType = "TodoBlock";

const extraAttributes = {
  items: [""] as string[],
  checked: [false] as boolean[],
};

const unstoredAttributes = {
  label: "To-Do",
  placeholder: "Enter a task...",
};

export const TodoBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string, parentWidth?: number) => ({
    id,
    type,
    selected: false,
    position: { x: 0, y: 0 },
    size: { width: parentWidth ?? 300, height: 75 },
    parentId,
    extraAttributes,
    unstoredAttributes,
  }),

  addUnstoredAttributes: (elementInstance) => {
    return {
      ...elementInstance,
      unstoredAttributes,
    };
  },

  toolbarElement: {
    icon: ListBulletIcon,
    label: "To-Do",
  },

  canvasComponent: CanvasComponent,
  toolbarPropertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = ProjectElementInstance & {
  extraAttributes: typeof extraAttributes;
  unstoredAttributes: typeof unstoredAttributes;
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: ProjectElementInstance;
}) {
  const updateElement = useProjectStore((state) => state.updateProjectElement);
  const element = elementInstance as CustomInstance;
  const { checked, items } = element.extraAttributes;
  const { label, placeholder } = element.unstoredAttributes;

  const style = {
    maxWidth: element.size.width,
  };

  function handleOnCheckboxChange(e: string | boolean, index: number) {
    const newChecked = [...checked];
    newChecked[index] = e as boolean;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        checked: newChecked,
      },
    });
  }

  function handleOnTextChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) {
    const newItems = [...items];
    newItems[index] = e.target.value;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        items: newItems,
      },
    });
  }

  function handleOnKeyPress(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    index: number
  ) {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();

      // Add todo item at index + 1
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

      // Focus on the new todo item
      setTimeout(() => {
        focusNextInput(index);
      });
    } else if (e.key === "Enter" && e.shiftKey && e.ctrlKey) {
      // Focus on the previous todo item
      e.preventDefault();
      focusPrevInput(index);
    } else if (e.key === "Enter" && e.ctrlKey) {
      // Focus on the next todo item
      e.preventDefault();
      focusNextInput(index);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();

      // Remove todo item at index
      const newItems = [...items];
      newItems.splice(index, 1);
      const newChecked = [...checked];
      newChecked.splice(index, 1);
      updateElement(element.id, {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          items: newItems,
          checked: newChecked,
        },
      });

      // Focus on the previous todo item
      setTimeout(() => {
        focusPrevInput(index);
      });
    }
  }

  function focusNextInput(index: number) {
    const nextInput = document.getElementById(
      `${element.id}-todo-item-${index + 1}`
    ) as HTMLInputElement;
    nextInput?.focus();
  }

  function focusPrevInput(index: number) {
    const prevInput = document.getElementById(
      `${element.id}-todo-item-${index - 1}`
    ) as HTMLInputElement;
    prevInput?.focus();
  }

  return (
    <Card style={style} className="p-2 flex flex-col gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex flex-row items-center gap-2">
          <Checkbox
            checked={checked[index]}
            onCheckedChange={(e) => handleOnCheckboxChange(e, index)}
          />
          <Textarea
            id={`${element.id}-todo-item-${index}`}
            value={item}
            rows={1} // Need a way to dynamically grow/shrink based on content like NextUI did it
            placeholder={placeholder}
            onChange={(e) => handleOnTextChange(e, index)}
            onKeyDown={(e) => handleOnKeyPress(e, index)}
          />
        </div>
      ))}
    </Card>
  );
}
