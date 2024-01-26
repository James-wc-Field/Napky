"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "../ProjectElements";
import { Card, CardBody, CardFooter, Input, Skeleton } from "@nextui-org/react";

const type: ElementsType = "ImageBlock";

const extraAttributes = {
  label: "Image Block",
  helperText: "Helper Text",
  file: "path",
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
  const { label, helperText, file } = element.extraAttributes;
  const style = {
    width: element.size.width,
    height: element.size.height,
  };

  return (
    <Card style={style}>
      <CardBody className="justify-center flex grow">
        <Skeleton className="w-full h-full rounded-md" />
      </CardBody>
      <CardFooter className="flex justify-between text-gray-500">
        <p>{label}</p>
        <p>{file}</p>
      </CardFooter>
    </Card>
  );
}
