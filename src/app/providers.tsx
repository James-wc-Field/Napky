"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CanvasContextProvider from "./project/[projectID]/context/CanvasContext";
export function Providers({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  return (
    <CanvasContextProvider>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </CanvasContextProvider>
  );
}
