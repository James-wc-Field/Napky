"use client";

import React, { useContext } from "react";
import { BuilderContext } from "../context/BuilderContext";

function useProject() {
  const context = useContext(BuilderContext);
  if (!context)
    throw new Error("useProject must be used within a ProjectContext");
  return context;
}

export default useProject;
