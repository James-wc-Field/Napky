"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import CanvasContextProvider from "./components/context/CanvasContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <CanvasContextProvider>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </CanvasContextProvider>
  );
}
