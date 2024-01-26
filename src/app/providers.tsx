"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import BuilderContextProvider from "./components/context/BuilderContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <BuilderContextProvider>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </BuilderContextProvider>
  );
}
