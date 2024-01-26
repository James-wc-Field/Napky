"use client";

import { createContext, useState } from "react";
import { ProjectElementInstance } from "../ProjectElements";

type BuilderContextType = {
  elements: ProjectElementInstance[];
  addElement: (element: ProjectElementInstance) => void;
  setElementPos: (element: ProjectElementInstance, x: number, y: number) => void;
};

export const BuilderContext = createContext<BuilderContextType | null>(null);

export default function BuilderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<ProjectElementInstance[]>([]);
  const addElement = (element: ProjectElementInstance) => {
    setElements((prev) => {
      let newElements = [...prev];
      newElements = [...newElements, element];
      return newElements;
    })
  };
  const setElementPos = (element: ProjectElementInstance, x: number, y: number) => {
    setElements((prev) => {
      let newElements = [...prev];
      newElements = newElements.map((item) => {
        if (item.id === element.id) {
          item.position.x = x;
          item.position.y = y;
        }
        return item;
      });
      return newElements;
    });
  }

  return (
    <BuilderContext.Provider
      value={{
        elements,
        addElement,
        setElementPos,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
