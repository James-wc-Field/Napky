"use client";

import {
  ElementsType,
  ProjectElement,
  ProjectElementInstance,
} from "@/[projectID]/types/ProjectElements";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";

const type: ElementsType = "LoadingBlock";

export const LoadingBlockProjectElement: ProjectElement = {
  type,
  construct: (id: string, parentId: string) => ({
    id,
    type,
    position: { x: 0, y: 0 },
    selected: false,
    size: { width: 20, height: 20 },
    parentId,
  }),

  toolbarElement: {
    icon: Loader,
    label: "Loading",
  },

  canvasComponent: CanvasComponent,
  toolbarPropertiesComponent: () => null,
};

function CanvasComponent({
  elementInstance,
}: {
  elementInstance: ProjectElementInstance;
}) {
  return (
    <Card className="p-2 w-fit">
      <LoadingSpinner />
    </Card>
  );
}
