import { useMemo, useState } from "react";
import { AllElementsType, ToolsType } from "../types/NinjaSketchTypes";
import { CanvasElementType } from "../types/NinjaSketchTypes";
import { ProjectElementInstance } from "../types/ProjectElements";


export const useHistory = (initialState: AllElementsType[]) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (
    action: AllElementsType[] | ((current: AllElementsType[]) => AllElementsType[])
  ) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action;
    const historyCopy = [...history];
    historyCopy[index] = newState;
    setHistory(historyCopy);
  };

  const addElement = (element: AllElementsType) => {
    const updatedState = [...history].slice(0, index + 1);
    setHistory(() => [...updatedState, [...updatedState[index], element]]);
    setIndex((prevState) => prevState + 1);
  }

  const updateElement = (id: string | number, element: AllElementsType, isHistory: boolean = true) => {
    const updatedState = [...history][isHistory ? index : index - 1].map((el) => (el.id === id ? element : el));
    setHistory((historyState) => [...historyState, updatedState]);
    if (isHistory) setIndex((prevState) => prevState + 1);
    console.log(history[index])
  };


  const undo = () => {
    debugger;
    console.log(history[index - 1])
    return index > 0 && setIndex((prevState) => prevState - 1)
  }
  const redo = () =>
    index < history.length - 1 && setIndex((prevState) => prevState + 1);

  function isCanvasElementType(element: AllElementsType): element is CanvasElementType {
    return (element as CanvasElementType).points !== undefined;
  }

  function isProjectElementType(element: AllElementsType): element is ProjectElementInstance {
    return (element as ProjectElementInstance).size !== undefined;
  }
  const canvasElements = useMemo(() => history[index].filter((element) => isCanvasElementType(element)) as CanvasElementType[], [history, index]);
  const projectElements = useMemo(() => history[index].filter((element) => isProjectElementType(element)) as ProjectElementInstance[], [history, index]);
  return {
    canvasElements,
    projectElements,
    setElements: setState,
    undo,
    redo,
    addElement,
    updateElement
  };
};
