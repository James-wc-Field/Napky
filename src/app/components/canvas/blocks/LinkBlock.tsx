"use client";

import { LinkIcon } from "@heroicons/react/24/solid";
import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "@canvas/types/ProjectElements";
import { Card } from "@ui/card";
import { Input } from "@ui/input";
import useProject from "@canvas/hooks/useProject";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"

const type: ElementsType = "LinkBlock";
type metaTagsType = {
  [property: string]: string
}
const extraAttributes = {
  label: "Link Block",
  text: "",
  placeHolder: "Enter link URL...",
  metaTags: {} as { [property: string]: string },
  summary: ""
};

export const LinkBlockProjectElement: ProjectElement = {
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
    icon: LinkIcon,
    label: "Link",
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
  const { placeHolder, text } = element.extraAttributes;
  const style = {
    maxWidth: element.size.width,
  };
  function handleOnTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...element.extraAttributes,
        text: e.target.value,
      },
    });
  }
  return (
    <Card style={style} className="p-2 flex flex-row gap-1 items-center">
      <div>

        <LinkIcon className="text-zinc-500 h-6 w-6" />
        <Input
          placeholder={placeHolder}
          onChange={handleOnTextChange}
          value={text}
        />
      </div>
      <h3>{element.extraAttributes?.metaTags["og:title"] || ""}</h3>
      <p>{element.extraAttributes?.metaTags["og:description"] || ""}</p>
    </Card>
  );
}
