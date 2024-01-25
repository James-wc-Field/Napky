import React from "react";
import { Spinner } from "@nextui-org/spinner";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Spinner size="lg" />
    </div>
  );
}

export default Loading;
