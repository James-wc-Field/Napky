"use client";

import { Card } from "@nextui-org/react";
import React from "react";
import DesignerSidebar from './DesignerSidebar';
import { useDroppable } from "@dnd-kit/core";

function Designer() {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });
  return (
    <div className="flex w-full h-full">
      <DesignerSidebar />
      <div className="p-4 w-full">
        <Card
          className="max-w-[920px] h-full m-auto flex flex-col
        grow items-center justify-start flex-1 overflow-y-auto"
        >
          <p className="text-3xl flex grow items-center font-bold">Drop Here</p>
        </Card>
      </div>
    </div>
  );
}

export default Designer;
