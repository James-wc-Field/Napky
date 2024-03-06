"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import CanvasContextProvider from "./components/canvas/context/CanvasContext";
import { ThemeProvider } from "./components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CanvasContextProvider>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </CanvasContextProvider>
    </ThemeProvider>
  );
}
