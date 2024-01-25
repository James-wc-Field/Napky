"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import { ElementsType, ProjectElement } from "../ProjectElements";

const type: ElementsType = "TextBlock";

export const TextBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Block",
      helperText: "Helper Text",
      placeHolder: "Value here...",
    },
  }),
  designerBtnElement: {
    icon: Bars3Icon,
    label: "Text Block",
  },
  designerComponent: () => <div>Designer Component</div>,
  projectComponent: () => <div>Project Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};
