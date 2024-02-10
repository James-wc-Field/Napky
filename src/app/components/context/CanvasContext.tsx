"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { ProjectElementInstance } from "../ProjectElements";

type CanvasContextType = {
  elements: ProjectElementInstance[];
  addElement: (element: ProjectElementInstance, x?: number, y?: number) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: ProjectElementInstance) => void;

  scrollLeft: number;
  updateScrollLeft: Dispatch<SetStateAction<number>>;

  scrollTop: number;
  updateScrollTop: Dispatch<SetStateAction<number>>;

  zoomLevel: number;
  updateZoomLevel: Dispatch<SetStateAction<number>>;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

export default function CanvasContextProvider({ children, }: { children: ReactNode; }) {
  const [elements, setElements] = useState<ProjectElementInstance[]>([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const addElement = (element: ProjectElementInstance, x?: number, y?: number) => {
    setElements((prev) => {
      let newElements = [...prev];
      if (x && y) {
        element.position.x = x;
        element.position.y = y;
      }
      newElements = [...newElements, element];
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: ProjectElementInstance) => {
    setElements((prev) => {
      let newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  return (
    <CanvasContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        updateElement,
        scrollLeft,
        updateScrollLeft: setScrollLeft,
        scrollTop,
        updateScrollTop: setScrollTop,
        zoomLevel,
        updateZoomLevel: setZoomLevel,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
