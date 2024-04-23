"use client";
import React, { useId, useMemo, useRef, useState } from "react";
import {
  DndContext,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  PointerSensor,
} from "@dnd-kit/core";

import { Save } from "lucide-react";
import { useEffect } from "react";
import BuildArea from "@/[projectID]/BuildArea";
import DragOverlayWrapper from "@/[projectID]/DragOverlayWrapper";
import usePreventZoom from "@/[projectID]/hooks/usePreventZoom";
import { ThemeToggle } from "@components/ThemeToggle";
import { saveProject } from "@/[projectID]/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "./storeProvider";
import { createProjectImage } from "./clientapi";
import { useShallow } from "zustand/react/shallow";
import { LoadingSpinner } from "@/components/ui/spinner";

export default function ProjectBuilder() {

  const elements = useProjectStore((state) => state.elements);
  const updateProjectName = useProjectStore((state) => state.updateProjectName);
  const projectName = useProjectStore((state) => state.projectName);
  const projectId = useProjectStore((state) => state.projectId);
  const updateKey = useProjectStore((state) => state.updateKey);
  const imageRef = useProjectStore((state) => state.imageRef);
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = "hidden";
    }
  }, []);
  const id = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 2 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );
  usePreventZoom();

  return (
    <DndContext id={id} sensors={sensors} collisionDetection={pointerWithin}>
      <main className="flex flex-col w-full h-full max-h-90vh">
        {/* This is the Project "NavBar" */}
        <BuildArea />
        <Popover>
          <PopoverTrigger
            asChild
            style={{
              top: "95%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className="absolute"
          >
            <Button variant="outline">AI Summary</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">API Key</h4>
                <p className="text-sm text-muted-foreground">
                  Add your OpenAI API key here.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Input
                    onChange={(e) => updateKey(e.target.value)}
                    id="width"
                    defaultValue=""
                    className="col-span-3 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  );
}
