import { useDroppable } from "@dnd-kit/core";
import React from "react";
function Grid(props: any) {
  const { setNodeRef } = useDroppable({
    id: "grid",
  });

  return (
    <div ref={setNodeRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-sky-50">
        {props.children}
    </div>
  );
}
export default Grid;