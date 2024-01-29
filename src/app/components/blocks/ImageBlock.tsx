"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Image } from "@nextui-org/image";

const type: ElementsType = "ImageBlock";

const extraAttributes = {
  src: "/images/placeholder.webp",
};

export const ImageBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    size: { width: 300, height: 200 },
    extraAttributes,
  }),

  toolbarElement: {
    icon: PhotoIcon,
    label: "Image",
  },

  canvasComponent: CanvasComponent,
  toolbarPropertiesComponent: () => <div>Toolbar properties</div>,
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
  const { src } = element.extraAttributes;

  return (
    <Image
      width={element.size.width}
      src={src}
      alt="Image"
      disableAnimation
      removeWrapper
    />
  );
}
