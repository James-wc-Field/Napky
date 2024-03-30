"use client";

import { ReactNode, RefObject, createContext, useCallback, useEffect, useRef, useState } from "react";
import { Position, ProjectElementInstance } from "@/project/[projectID]/types/ProjectElements";
import { Project } from "@src/API";
import { SelectableRef } from "react-selectable-box";

type CanvasContextType = {
  elements: ProjectElementInstance[];


  key: string;

  updateKey: (key: string) => void
  /**
   * Adds an element to the canvas at a specific position
   * @param element Element to add to the canvas
   * @param x Optional x position to place the element at
   * @param y Optional y position to place the element at
   * @returns
   */
  addElement: (element: ProjectElementInstance, x?: number, y?: number) => void;

  /**
   * Updates the project name
   * @param name New name for the project
   * @returns
   */
  updateProjectName: (name: string) => void;

  /**
   * Gets the project name
   * @returns the project name
   */
  projectName: string;

  /**
   * Adds multiple elements to the canvas
   * @param elements Elements to add to the canvas
   * @returns
   */
  useLoadElements: (project: Project) => void;
  /**
   * Removes an element from the canvas
   * @param id ID of the element to remove
   * @returns
   */
  removeElement: (id: string) => void;

  /**
   * Gets the selected elements
  */
  selectedElements: ProjectElementInstance[];

  /**
  * Adds multiple elements to the selected elements
  * @param elements Elements to add to the selected elements
  * @returns
  */
  changeSelectedElements: (elements: ProjectElementInstance[]) => void;

  /**
   * Removes multiple elements from the selected elements
   */
  removeSelectedElements: () => void;
  /**
   * Updates an element on the canvas
   * @param id ID of the element to update
   * @param element New element to replace the old one
   * @returns
   */
  updateElement: (id: string, element: ProjectElementInstance) => void;


  /**
   * 
   * @param id ID of the element to return
   * @returns Project element instance that matches the id
   */
  getElement: (id: string) => ProjectElementInstance | undefined;

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

  middleMouseIsDown: boolean;
  updateMiddleMouseIsDown: (middleMouseIsDown: boolean) => void;

  useMouseMove: (selectableRef:RefObject<SelectableRef> | null, isMiddleMouseDown:boolean) => void;
  /**
   * 
   * @param element Element to add to the selected elements
   * @returns 
   */
  addSelectedElement: (element: ProjectElementInstance) => void;
  /**
   * Updates the canvas view rect
   * @param rect Values to update the canvas view rect to
   * @returns
   */
  useWindowResize: (canvas: HTMLDivElement | null) => void;

  isResizing: boolean;
  updateResizing: (resizing: boolean) => void;
  useKeyDown: (selectedElements:ProjectElementInstance[]) => void;
  useResize:(element: ProjectElementInstance, startPos:Position) => void;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

export default function CanvasContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<ProjectElementInstance[]>([]);
  const [key, setKey] = useState<string>("");
  const [selectedElements, setSelectedElements] = useState<ProjectElementInstance[]>([]);
  const [middleMouseIsDown, setMiddleMouseIsDown] = useState(false);
  const [isResizing, setIsResizing] = useState(false)
  const [projectName, setProjectName] = useState("Untitled");
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

  const updateProjectName = (name: string) => {
    setProjectName(name);
  };

  const changeSelectedElements = (elements: ProjectElementInstance[]) => {
    setSelectedElements(() => [...elements]);
  };

  const getElement = (id: string)=> {
    return elements.find((el)=>{el.id === id})
  }


  const addSelectedElement = (element: ProjectElementInstance) => {
    setSelectedElements((prev) => [...prev, element]);
  }

  const updateResizing = (resizing: boolean) => {
    setIsResizing(resizing)
  }
  const removeSelectedElements = () => {
    setSelectedElements(() => []);
  }

  const updateKey =(key:string) => {
    setKey(() => key)
  }
  const loadElements = (newElements: ProjectElementInstance[]) => {
    setElements(() => [...newElements]);
  }
  const useResize = (element: ProjectElementInstance, startPos:Position) => { 
  //   useEffect(() => {
  //   const handleMouseMove = 
  //   (e: MouseEvent) => {
  //     if (isResizing){
  //       const newWidth = element.size.width + e.clientX - startPos.x!
  //       const newHeight = element.size.height + e.clientY - startPos.y!
  //       updateElement(element.id, {
  //         ...element,
  //         size: {
  //           width: newWidth,
  //           height: newHeight
  //         }
  //       })
  //     }
  //   }
  //   const handleMouseUp = () => {
  //     setIsResizing(false)
  //   }
  //   window.addEventListener('mousemove', handleMouseMove)
  //     window.addEventListener('mouseup', handleMouseUp)
  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove)
  //     window.removeEventListener('mouseup', handleMouseUp)
  //   }
  // }, [isResizing,startPos])
}
  const useKeyDown = (selected: ProjectElementInstance[]) => {
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === "Delete") {
          selected?.forEach((element) => {
            setElements((prev) => prev.filter((el) => el.id !== element.id));
          });
          removeSelectedElements();
        }
      }
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },[selected]);
  }

  const updateMiddleMouseIsDown = (middleMouseIsDown:boolean) => {
    setMiddleMouseIsDown(middleMouseIsDown)
  }


  const useLoadElements = (project: Project) => {
    useEffect(() => {
      if (project) {
        return setElements(() => [...(JSON.parse(project.content || "[]")) as ProjectElementInstance[]]);
      }
    }, [project]);
  };

  const updateElement = useCallback((id: string, element: ProjectElementInstance) => {
    setElements((prev) => {
      let newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  },[]);



  const useMouseMove = (selectableRef: RefObject<SelectableRef> | null, isMiddleMouseDown:boolean) => {
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (middleMouseIsDown) {
          selectableRef?.current?.cancel();
          updateScrollLeft(-e.movementX);
          updateScrollTop(-e.movementY);
        }
      };
      const handleMouseUp = () => {
        setMiddleMouseIsDown(false);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        // Cleanup event listeners when component unmounts
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [selectableRef,isMiddleMouseDown]);
  }
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

  const useWindowResize = (canvas: HTMLDivElement | null) => {
    useEffect(() => {
      const handleResize = () => {
        if (canvas) {
          const boundingBox = canvas.getBoundingClientRect();
          setCanvasViewRect({
            top: boundingBox.top,
            left: boundingBox.left,
            right: boundingBox.right,
            bottom: boundingBox.bottom,
            width: boundingBox.width,
            height: boundingBox.height,
          });
        }
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [canvas])
  };

  return (
    <CanvasContext.Provider
      value={{
        elements,
        addElement,
        getElement,
        removeElement,
        updateElement,
        selectedElements,
        changeSelectedElements,
        scrollLeft,
        updateScrollLeft,
        scrollTop,
        updateScrollTop,
        zoomLevel,
        updateZoomLevel,
        outerMostElements,
        canvasViewRect,
        useWindowResize,
        useResize,
        useLoadElements,
        updateProjectName,
        projectName,
        removeSelectedElements,
        addSelectedElement,
        key,
        updateKey,
        useMouseMove,
        middleMouseIsDown,
        updateMiddleMouseIsDown,
        isResizing,
        updateResizing,
        useKeyDown,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
