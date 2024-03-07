"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import CanvasContextProvider from "./components/canvas/context/CanvasContext";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <CanvasContextProvider>{children}</CanvasContextProvider>
    </ThemeProvider>
  );
}
