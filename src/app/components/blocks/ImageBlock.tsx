"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";

const type: ElementsType = "ImageBlock";

export const ImageBlockProjectElement: ProjectElement = {
  type,
  construct: (
    id: string,
    position?: { x: number; y: number },
    size?: { width: number; height: number }
  ) => ({
    id,
    type,
    position: position ?? { x: 0, y: 0 },
    size: size ?? { width: 100, height: 100 },
    extraAttributes: {},
  }),

  toolbarElement: {
    icon: PhotoIcon,
    label: "Image",
  },

  canvasComponent: () => <div>Canvas Component</div>,
  toolbarPropertiesComponent: () => <div>Toolbar properties</div>,
};
