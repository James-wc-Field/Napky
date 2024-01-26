"use client";

import { useContext } from "react";
import { CanvasContext } from "../context/CanvasContext";

function useProject() {
  const context = useContext(CanvasContext);
  if (!context)
    throw new Error("useProject must be used within a ProjectContext");
  return context;
}

export default useProject;
