import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { Card } from "@ui/card";
import { Button } from "@ui/button";
import React from "react";
import { useProjectStore } from "./storeProvider";

export default function CanvasControls() {
  const updateZoomLevel = useProjectStore((state) => state.updateZoomLevel);

  return (
    <Card
      className="flex flex-col absolute top-4 right-4 gap-2 p-2"
      style={{ zIndex: 5 }}
    >
      <Button
        variant={"outline"}
        className="p-2"
        onClick={() => updateZoomLevel(true, 1.2)}
      >
        <PlusIcon className="w-6" />
      </Button>
      <Button
        variant={"outline"}
        className="p-2"
        onClick={() => updateZoomLevel(false, 1.2)}
      >
        <MinusIcon className="w-6" />
      </Button>
    </Card>
  );
}
