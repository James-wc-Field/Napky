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
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {},
  }),

  toolbarElement: {
    icon: PhotoIcon,
    label: "Image",
  },

  projectComponent: ProjectComponent,
  toolbarPropertiesComponent: () => <div>Toolbar properties</div>,
};

function ProjectComponent({
  elementInstance,
}: {
  elementInstance: ProjectElementInstance;
}) {
  const element = elementInstance as ProjectElementInstance;
  return (
    <div className="flex flex-col gap-2 w-[400px]">
      {elementInstance.extraAttributes?.label}
    </div>
  );
}
