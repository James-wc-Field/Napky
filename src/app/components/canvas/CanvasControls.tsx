import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { Card } from "@ui/card";
import { Button } from "@ui/button";
import React from "react";
import useProject from "@canvas/hooks/useProject";

export default function CanvasControls() {
  const { updateZoomLevel } = useProject();

  return (
    <Card
      className="flex flex-col absolute top-4 right-4 gap-2 p-2 rounded-2xl dark:bg-zinc-900 shadow-md"
      style={{ zIndex: 5 }}
    >
      <Button
        variant={"secondary"}
        className="p-2 rounded-xl shadow-md dark:bg-zinc-800"
        onClick={() => updateZoomLevel(true, 1.2)}
      >
        <PlusIcon className="w-6" />
      </Button>
      <Button
        variant={"secondary"}
        className="p-2 rounded-xl shadow-md dark:bg-zinc-800"
        onClick={() => updateZoomLevel(false, 1.2)}
      >
        <MinusIcon className="w-6" />
      </Button>
    </Card>
  );
}
