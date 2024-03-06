"use client";

import { useContext } from "react";
import { CanvasContext } from "../../canvas/context/CanvasContext";

function useProject() {
  const context = useContext(CanvasContext);
  if (!context)
    throw new Error("useCanvas must be used within a CanvasContextProvider");
  return context;
}

export default useProject;
