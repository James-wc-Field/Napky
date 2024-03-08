import { DragEvent } from "react";
import Canvas from "./Canvas";
import { useDndMonitor } from "@dnd-kit/core";
import { ElementsType, ProjectElements } from "./ProjectElements";
import { idGenerator } from "../lib/idGenerator";
import useProject from "./hooks/useProject";

export default function BuildArea() {
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

      const isToolbarBtnElement = active.data?.current?.isToolbarBtnElement;
      const isCanvasElement = active.data?.current?.isCanvasElement;
      const isListElement = active.data?.current?.isListElement;

      const isCanvasDropArea = over.data?.current?.isCanvasDropArea;
      const isListDroppable = over.data?.current?.isListDroppable;

      // Drag new element from toolbar onto canvas
      if (isToolbarBtnElement) {
        const type = active.data?.current?.type;
        console.log(over.data);
        const newElement = ProjectElements[type as ElementsType].construct(
          idGenerator(),
          (over.data.current?.elementId as string) || "root"
        );

        const overTop = over.rect.top;
        const overLeft = over.rect.left;
        const initialTop = active.rect.current.initial?.top || overTop;
        const initialLeft = active.rect.current.initial?.left || overLeft;
        const diffX = overLeft - initialLeft;
        const diffY = overTop - initialTop;

        addElement(
          newElement,
          (delta.x - diffX - scrollLeft) / zoomLevel,
          (delta.y - diffY - scrollTop) / zoomLevel
        );
        console.log("NEW ELEMENT:", newElement);
      }

      // Drag existing CanvasElement to new position
      if (isCanvasElement && isCanvasDropArea) {
        const elementId = active.data?.current?.elementId;
        const dragged = elements.find((element) => element.id == elementId);

        if (!dragged) return;

        updateElement(dragged.id, {
          ...dragged,
          position: {
            x: dragged.position.x + delta.x / zoomLevel,
            y: dragged.position.y + delta.y / zoomLevel,
          },
          extraAttributes: {
            ...dragged.extraAttributes,
          },
        });

        console.log("DRAGGED:", dragged);
      }

      // Drag list element onto canvas
      if (isListElement && isCanvasDropArea) {
        const canvasTop = over.rect.top;
        const canvasLeft = over.rect.left;
        const initialTop = active.rect.current.initial?.top || canvasTop;
        const initialLeft = active.rect.current.initial?.left || canvasLeft;
        const diffX = canvasLeft - initialLeft;
        const diffY = canvasTop - initialTop;

        const elementId = active.data?.current?.elementId;
        const dragged = elements.find((element) => element.id == elementId);
        if (!dragged) return;

        updateElement(dragged.id, {
          ...dragged,
          position: {
            x: (delta.x - diffX - scrollLeft) / zoomLevel,
            y: (delta.y - diffY - scrollTop) / zoomLevel,
          },
          parentId: "root",
          extraAttributes: {
            ...dragged.extraAttributes,
          },
        });

        const listId = dragged.parentId;
        const list = elements.find((element) => element.id == listId);
        if (!list) return;

        const childElements = list.extraAttributes?.children;
        const newChildElements = childElements.filter(
          (id: string) => id !== elementId
        );

        // Remove element from list
        updateElement(listId, {
          ...list,
          extraAttributes: {
            ...list.extraAttributes,
            children: newChildElements,
          },
        });
      }

      // Drag canvas element onto list
      if (isListDroppable && isCanvasElement) {
        const elementId = active.data?.current?.elementId;
        const dragged = elements.find((element) => element.id == elementId);
        if (!dragged) return;

        const listId = over.data?.current?.elementId;
        const list = elements.find((element) => element.id == listId);
        if (!list || !over.data.current?.accepts.includes(dragged.type)) return;

        const childElements = list.extraAttributes?.children;
        const newChildElements = [...childElements, elementId];

        updateElement(listId, {
          ...list,
          extraAttributes: {
            ...list.extraAttributes,
            children: newChildElements,
          },
        });

        updateElement(dragged.id, {
          ...dragged,
          position: {
            x: 0,
            y: 0,
          },
          parentId: listId,
          extraAttributes: {
            ...dragged.extraAttributes,
          },
        });

        return;
      }

      if (isToolbarBtnElement && isListDroppable) {
        const type = active.data?.current?.type;
        const listId = over.data?.current?.elementId;
        const newElement = ProjectElements[type as ElementsType].construct(
          idGenerator(),
          listId as string
        );

        addElement(newElement, 0, 0);
        console.log("NEW ELEMENT:", newElement);

        const list = elements.find((element) => element.id == listId);
        if (!list || !over.data.current?.accepts.includes(type)) return;

        const childElements = list.extraAttributes?.children;
        const newChildElements = [...childElements, newElement.id];

        updateElement(listId, {
          ...list,
          extraAttributes: {
            ...list.extraAttributes,
            children: newChildElements,
          },
        });
      }

      if (isListElement && isListDroppable) {
        const newListId = over.data?.current?.elementId;
        const elementId = active.data?.current?.elementId;
        const dragged = elements.find((element) => element.id == elementId);
        if (!dragged) return;
        const parentListId = dragged.parentId;
        const parentList = elements.find(
          (element) => element.id == parentListId
        );
        if (!parentList || parentListId === newListId) return;

        const childElements = parentList.extraAttributes?.children;
        const newChildElements = childElements.filter(
          (id: string) => id !== elementId
        );

        updateElement(parentListId, {
          ...parentList,
          extraAttributes: {
            ...parentList.extraAttributes,
            children: newChildElements,
          },
        });

        const newList = elements.find((element) => element.id == newListId);
        if (!newList || !over.data.current?.accepts.includes(dragged.type)) return;

        const newChildElementsList = newList.extraAttributes?.children;
        const newChildElementsListArray = [...newChildElementsList, elementId];

        updateElement(newListId, {
          ...newList,
          extraAttributes: {
            ...newList.extraAttributes,
            children: newChildElementsListArray,
          },
        });

        updateElement(dragged.id, {
          ...dragged,
          parentId: newListId,
          extraAttributes: {
            ...dragged.extraAttributes,
          },
        });
      }
    },
  });

  // Handler for external file drop
  function externalDropHandler(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!e.dataTransfer.items) return;

    const canvasRect = document
      .getElementById("canvas-pane-droppable")
      ?.getBoundingClientRect() as DOMRect;
    const top = canvasRect.top || 0;
    const left = canvasRect.left || 0;
    for (const file of Array.from(e.dataTransfer.files)) {
      console.log("FILE:", file);

      const reader = new FileReader();
      const xPos = e.clientX - left;
      const yPos = e.clientY - top;
      if (
        yPos < 0 ||
        xPos < 0 ||
        yPos > canvasRect.height ||
        xPos > canvasRect.width
      )
        continue;

      reader.onload = (event) => {
        const src = event.target?.result as string;
        const type = "ImageBlock";
        let newElement = ProjectElements[type as ElementsType].construct(
          idGenerator(),
          "root"
        );
        console.log("NEW ELEMENT:", newElement);

        newElement = {
          ...newElement,
          extraAttributes: {
            ...newElement.extraAttributes,
            src: src,
          },
        };

        addElement(newElement, 
          (xPos - scrollLeft) / zoomLevel, 
          (yPos - scrollTop) / zoomLevel
        );
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="flex flex-row grow">
      <div
        id="canvas-wrapper"
        onDrop={(e) => externalDropHandler(e)}
        onDragOver={(e) => e.preventDefault()}
        className="relative overflow-hidden z-0 w-full h-full"
      >
        <Canvas elements={elements} />
      </div>
    </div>
  );
}
