"use client";

import { createContext, useState } from "react";
import { ProjectElementInstance } from "../ProjectElements";

type CanvasContextType = {
  elements: ProjectElementInstance[];
  addElement: (element: ProjectElementInstance, x?: number, y?: number) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: ProjectElementInstance) => void;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

export default function CanvasContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<ProjectElementInstance[]>([]);

  const addElement = (element: ProjectElementInstance, x?: number, y?:number) => {
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
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
