"use client";

import * as React from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (

    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />

      {children}

    </ThemeProvider>
  );
}
