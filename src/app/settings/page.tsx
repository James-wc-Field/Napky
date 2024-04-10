import React from "react";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/spinner";
import LoginCard from "./_loginUI/LoginCard";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginCard></LoginCard>
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
