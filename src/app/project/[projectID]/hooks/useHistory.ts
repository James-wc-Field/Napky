import { useMemo, useState } from "react";
import { AllElementsType } from "../types/NinjaSketchTypes";
import { CanvasElementType } from "../types/NinjaSketchTypes";
import { ProjectElement, ProjectElementInstance } from "../types/ProjectElements";


export const useHistory = (initialState: AllElementsType[]) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (
    action: AllElementsType[] | ((current: AllElementsType[]) => AllElementsType[]),
    overwrite = false
  ) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action;
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex((prevState) => prevState + 1);
    }
  };

  const undo = () => index > 0 && setIndex((prevState) => prevState - 1);
  const redo = () =>
    index < history.length - 1 && setIndex((prevState) => prevState + 1);

  function isCanvasElementType(element: AllElementsType): element is CanvasElementType {
    return (element as CanvasElementType).type !== undefined;
  }

  function isProjectElementType(element: AllElementsType): element is ProjectElementInstance {
    return (element as ProjectElementInstance).type === undefined;
  }
  const canvasElements = useMemo(() => history[index].filter((element) => isCanvasElementType(element)) as CanvasElementType[], [history, index]);
  const projectElements = useMemo(() => history[index].filter((element) => isProjectElementType(element)) as ProjectElementInstance[], [history, index]);
  return {
    canvasElements,
    projectElements,
    setCanvasElements: setState,
    undo,
    redo,
  };
};
