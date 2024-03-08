import React from "react";
import { LoadingSpinner } from "@ui/spinner";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <LoadingSpinner />
    </div>
  );
}

export default Loading;
