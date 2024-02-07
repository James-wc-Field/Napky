import { DragEvent } from "react";
import Toolbar from "./BuilderToolbar";
import Canvas from "./Canvas";
import { useDndMonitor } from "@dnd-kit/core";
import { ElementsType, ProjectElements } from "./ProjectElements";
import { idGenerator } from "../lib/idGenerator";
import useProject from "./hooks/useProject";
import DragOverlayWrapper from "./DragOverlayWrapper";

function BuildArea() {
  const {
    elements,
    addElement,
    updateElement,
    scrollLeft,
    scrollTop,
    zoomLevel,
  } = useProject();

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over, delta } = event;
      if (!active || !over) return;

      console.log(scrollLeft, scrollTop, zoomLevel);

      // Create new element
      const isToolbarBtnElement = active.data?.current?.isToolbarBtnElement;
      if (isToolbarBtnElement) {
        const type = active.data?.current?.type;
        const newElement = ProjectElements[type as ElementsType].construct(
          idGenerator()
        );

        const canvasTop = over.rect.top;
        const canvasLeft = over.rect.left;
        const initialTop = active.rect.current.initial?.top || canvasTop;
        const initialLeft = active.rect.current.initial?.left || canvasLeft;
        const diffX = canvasLeft - initialLeft;
        const diffY = canvasTop - initialTop;

        addElement(
          newElement,
          (delta.x - diffX - scrollLeft) / zoomLevel,
          (delta.y - diffY - scrollTop) / zoomLevel
        );
        console.log("NEW ELEMENT:", newElement);
      }

      // Drag existing element
      const isCanvasElement = active.data?.current?.isCanvasElement;
      if (isCanvasElement) {
        const elementId = active.data?.current?.elementId;
        const dragged = elements.find((element) => element.id == elementId);

        if (!dragged) return;

        updateElement(dragged.id, {
          ...dragged,
          position: {
            x: dragged.position.x + delta.x / zoomLevel,
            y: dragged.position.y + delta.y / zoomLevel,
          },
        });

        console.log("DRAGGED:", dragged);
      }
    },
  });

  // Handler for external file drop
  function externalDropHandler(e: DragEvent<HTMLDivElement>) {
    if (!e.dataTransfer.items) return;

    for (const file of Array.from(e.dataTransfer.files)) {
      console.log("FILE:", file);

      const reader = new FileReader();

      reader.onload = (event) => {
        const src = event.target?.result as string;
        const type = "ImageBlock";
        const newElement = ProjectElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(newElement);
        updateElement(newElement.id, {
          ...newElement,
          extraAttributes: {
            ...newElement.extraAttributes,
            src: src,
          },
        });
      };

      reader.readAsDataURL(file);
    }
    e.preventDefault();
  }

  return (
    <div className="flex flex-row grow">
      <Toolbar />
      <div
        id="file-drop-area"
        onDrop={(e) => externalDropHandler(e)}
        onDragOver={(e) => e.preventDefault()}
        className="relative flex-1"
      >
        <Canvas elements={elements} />
      </div>
    </div>
  );
}

export default BuildArea;
