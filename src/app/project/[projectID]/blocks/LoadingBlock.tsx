"use client";

import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "@/project/[projectID]/types/ProjectElements";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";

const type: ElementsType = "LoadingBlock";

const extraAttributes = {};

export const LoadingBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    selected: false,
    size: { width: 20, height: 20 },
    parentId,
    extraAttributes,
  }),

  toolbarElement: {
    icon: Loader,
    label: "Loading",
  },

  canvasComponent: CanvasComponent,
  toolbarPropertiesComponent: () => null,
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

  return (
    <Card className="p-2 w-fit">
      <LoadingSpinner />
    </Card>
  );
}
