import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { Card, Button } from "@nextui-org/react";
import React from "react";
import useProject from "./hooks/useProject";

export default function CanvasControls() {

  const { updateZoomLevel } = useProject();

  return (
    <Card className="absolute top-4 right-4 gap-2 p-2" style={{ zIndex: 5 }}>
      <Button
        isIconOnly
        variant="flat"
        onPress={() => updateZoomLevel(true, 1.2)}
      >
        <PlusIcon className="w-6" />
      </Button>
      <Button
        isIconOnly
        variant="flat"
        onPress={() => updateZoomLevel(false, 1.2)}
      >
        <MinusIcon className="w-6" />
      </Button>
    </Card>
  );
}
