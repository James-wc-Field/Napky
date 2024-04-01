import { DragEvent, use } from "react";
import Canvas from "@/project/[projectID]/Canvas";
import { useDndMonitor } from "@dnd-kit/core";
import { ElementsType, ProjectElements } from "@/project/[projectID]/types/ProjectElements";
import { idGenerator } from "@/lib/idGenerator";
import useProject from "@/project/[projectID]/hooks/useProject";
import { ProjectElementInstance } from "@/project/[projectID]/types/ProjectElements";
import { useExternalDrop } from "@/project/[projectID]/hooks/useExternalDrop";
import { useProjectStore } from "./storeProvider";
import { useShallow } from "zustand/react/shallow";
export default function BuildArea() {
  const { elements, addElement, updateElement, scrollLeft, scrollTop, zoomLevel, selectedElements } = useProjectStore(useShallow((state) => state));
  useDndMonitor({
    onDragStart: (event) => {
      // const elementId = event.active.data.current?.elementId;
      // if (!selectedElements.find((element) => element.id == elementId)) {
      //   const selected = [elements.find((element) => element.id == elementId)]
      //   changeSelectedElements(selected as ProjectElementInstance[])
      // }
    },
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
        const wasDraggedSelected = selectedElements().includes(dragged!)
        if (!dragged) return;
        if (!wasDraggedSelected) {
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
        } else {
          selectedElements().forEach((element) => {
            updateElement(element.id, {
              ...element,
              position: {
                x: element.position.x + delta.x / zoomLevel,
                y: element.position.y + delta.y / zoomLevel,
              },
              extraAttributes: {
                ...element.extraAttributes,
              },
            });
          }
          );

        }
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
        if (!list) return;
        else if (!over.data.current?.accepts.includes(dragged.type)) {
          updateElement(dragged.id, {
            ...dragged,
            position: {
              x: dragged.position.x + delta.x / zoomLevel,
              y: dragged.position.y + delta.y / zoomLevel,
            },
            parentId: "root",
            extraAttributes: {
              ...dragged.extraAttributes,
            },
          });
          return;
        }

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
        if (!newList || !over.data.current?.accepts.includes(dragged.type))
          return;

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


  const { externalDropHandler } = useExternalDrop();
  return (
    <div
      id="canvas-wrapper"
      onDrop={(e) => externalDropHandler(e)}
      onDragOver={(e) => e.preventDefault()}
      className="relative overflow-hidden z-0 w-full h-full"
    >
      <Canvas />
    </div>
  );
}
