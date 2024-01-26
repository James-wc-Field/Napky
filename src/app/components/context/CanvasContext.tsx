"use client";

import { createContext, useState } from "react";
import { ProjectElementInstance } from "../ProjectElements";

type CanvasContextType = {
  elements: ProjectElementInstance[];
  addElement: (element: ProjectElementInstance, x: number, y: number) => void;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

export default function CanvasContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<ProjectElementInstance[]>([]);

  const addElement = (element: ProjectElementInstance, x: number, y: number) => {
    setElements((prev) => {
      let newElements = [...prev];
      newElements = [...newElements, element];
      element.position.x = x;
      element.position.y = y;
      return newElements;
    })
  };

  return (
    <CanvasContext.Provider
      value={{
        elements,
        addElement,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
