"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "@/[projectID]/types/ProjectElements";
import Image from "next/image";

const type: ElementsType = "ImageBlock";

const extraAttributes = {
  key: "",
  alt: "Image",
};

const unstoredAttributes = {
  src: "",
  placeholder: "/images/placeholder.jpg",
};

export const ImageBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    selected: false,
    size: { width: 300, height: 200 },
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
    icon: PhotoIcon,
    label: "Image",
  },

  canvasComponent: CanvasComponent,
  toolbarPropertiesComponent: () => <div>Toolbar properties</div>,
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
  const element = elementInstance as CustomInstance;
  const { alt } = element.extraAttributes;
  const { src, placeholder } = element.unstoredAttributes;

  return (
    <Image
      src={src || placeholder}
      width={element.size.width}
      height={element.size.height}
      alt={alt}
      className="rounded-md select-none"
      unoptimized
      priority
      crossOrigin="anonymous"
    />
  );
}
