import React from "react";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/spinner";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  );
}
