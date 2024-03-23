"use client";

import * as React from "react";
import CanvasContextProvider from "./components/canvas/context/CanvasContext";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark', 'test']}
    >
      <Toaster />
      <CanvasContextProvider>{children}</CanvasContextProvider>
    </ThemeProvider>
  );
}
