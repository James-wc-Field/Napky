"use client";

import { Button } from "@ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => console.error(error), [error]);
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4">
      <h2 className="text-4xl">Something went wrong!</h2>
      <Button>
        <Link href={"/"}>
          Go Home
        </Link>
      </Button>
    </div>
  );
}
