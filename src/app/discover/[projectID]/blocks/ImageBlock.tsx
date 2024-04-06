"use client";

import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "./Block";
import Image from "next/image";

const type: ElementsType = "ImageBlock";

const extraAttributes = {
  src: "/images/placeholder.jpg",
  alt: "Image",
};

export const ImageBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    size: { width: 300, height: 200 },
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
  const { src, alt } = element.extraAttributes;

  return (
    <Image
      src={src}
      width={element.size.width}
      height={element.size.height}
      alt={alt}
      className="rounded-md select-none"
    />
  );
}
