"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { ProjectElementInstance } from "../ProjectElements";

type CanvasContextType = {
  elements: ProjectElementInstance[];

  /**
   * Adds an element to the canvas at a specific position
   * @param element Element to add to the canvas
   * @param x Optional x position to place the element at
   * @param y Optional y position to place the element at
   * @returns
   */
  addElement: (element: ProjectElementInstance, x?: number, y?: number) => void;

  /**
   * Removes an element from the canvas
   * @param id ID of the element to remove
   * @returns
   */
  removeElement: (id: string) => void;

  /**
   * Updates an element on the canvas
   * @param id ID of the element to update
   * @param element New element to replace the old one
   * @returns
   */
  updateElement: (id: string, element: ProjectElementInstance) => void;

  scrollLeft: number;
  /**
   * Updates the scroll left of the canvas (X-axis displacement)
   * @param delta Amount to scroll by
   * @returns
   */
  updateScrollLeft: (delta: number) => void;

  scrollTop: number;
  /**
   * Updates the scroll top of the canvas (Y-axis displacement)
   * @param delta Amount to scroll by
   * @returns
   */
  updateScrollTop: (delta: number) => void;

  zoomLevel: number;
  /**
   * Updates the zoom level of the canvas
   * @param zoomIn True if zooming in, false if zooming out
   * @param multiplier Amount to scale the zoom level by
   * @returns
   */
  updateZoomLevel: (zoomIn: boolean, multiplier: number) => void;

  // Useful for navigating back to content
  outerMostElements: {
    top: ProjectElementInstance | null;
    left: ProjectElementInstance | null;
    right: ProjectElementInstance | null;
    bottom: ProjectElementInstance | null;
  };

  canvasViewRect: {
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  };

  /**
   * Updates the canvas view rect
   * @param rect Values to update the canvas view rect to
   * @returns
   */
  updateCanvasViewRect: (rect: {
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  }) => void;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

export default function CanvasContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<ProjectElementInstance[]>([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [outerMostElements, setOuterMostElements] = useState<{
    top: ProjectElementInstance | null;
    left: ProjectElementInstance | null;
    right: ProjectElementInstance | null;
    bottom: ProjectElementInstance | null;
  }>({ top: null, left: null, right: null, bottom: null });
  const [canvasViewRect, setCanvasViewRect] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });

  const addElement = (
    element: ProjectElementInstance,
    x?: number,
    y?: number
  ) => {
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
      newElements[index] = {
        ...newElements[index],
        ...element,
        extraAttributes: {
          ...newElements[index].extraAttributes,
          ...element.extraAttributes,
        },
      }
      return newElements;
    });
  };

  const updateScrollLeft = (delta: number) => {
    setScrollLeft((prev) => prev - delta);
  };

  const updateScrollTop = (delta: number) => {
    setScrollTop((prev) => prev - delta);
  };

  const MIN_ZOOM = 0.05;
  const MAX_ZOOM = 5;

  const updateZoomLevel = (zoomIn: boolean, multiplier: number) => {
    setZoomLevel((prev) => {
      if (
        (prev * multiplier >= MAX_ZOOM && zoomIn) ||
        (prev / multiplier <= MIN_ZOOM && !zoomIn)
      ) {
        return prev;
      }
      if (zoomIn) return prev * multiplier;
      return prev / multiplier;
    });
  };

  useEffect(() => {
    let top: ProjectElementInstance | null = null;
    let left: ProjectElementInstance | null = null;
    let right: ProjectElementInstance | null = null;
    let bottom: ProjectElementInstance | null = null;

    elements.forEach((element) => {
      if (!top || element.position.y < top.position.y) {
        top = element;
      }
      if (!left || element.position.x < left.position.x) {
        left = element;
      }
      if (!right || element.position.x > right.position.x) {
        right = element;
      }
      if (!bottom || element.position.y > bottom.position.y) {
        bottom = element;
      }
    });

    setOuterMostElements({ top, left, right, bottom });
  }, [elements]);

  const updateCanvasViewRect = (rect: {
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  }) => {
    setCanvasViewRect({
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
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
        updateScrollLeft,
        scrollTop,
        updateScrollTop,
        zoomLevel,
        updateZoomLevel,
        outerMostElements,
        canvasViewRect,
        updateCanvasViewRect,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
