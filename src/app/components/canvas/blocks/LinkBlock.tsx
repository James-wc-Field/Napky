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
import { LinkPreview } from "../LinkPreview";

const type: ElementsType = "LinkBlock";
type metaTagsType = {
  [property: string]: string
}
const extraAttributes = {
  label: "Link Block",
  text: "",
  placeHolder: "Enter link URL...",
  metaTags: Promise<{ [property: string]: string }>
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
  const { placeHolder, text} = element.extraAttributes;
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
      <LinkIcon className="text-zinc-500 h-6 w-6" />
      <Input
        placeholder={placeHolder}
        onChange={handleOnTextChange}
        value={text}
      />
      <Suspense fallback={<div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>}>
        <LinkPreview {element.id} {element}/>
      </Suspense>
    </Card>
  );
}
