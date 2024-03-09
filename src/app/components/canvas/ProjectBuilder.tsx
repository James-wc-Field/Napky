"use client";

import React, { useId } from "react";
import {
  DndContext,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  PointerSensor,
} from "@dnd-kit/core";

import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import useProject from "./hooks/useProject";
import { useEffect, useState } from "react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import BuildArea from "@canvas/BuildArea";
import DragOverlayWrapper from "@canvas/DragOverlayWrapper";
import usePreventZoom from "@canvas/hooks/usePreventZoom";
import { ThemeToggle } from "@components/ThemeToggle";
import { Project } from "../../../API";

export default function ProjectBuilder({ projectID }: { projectID: string }) {
  const [project, setProject] = useState<Project>();
  const { loadElements } = useProject();
  const { elements, updateProjectName, projectName } = useProject();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 2 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );
  usePreventZoom();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/get-project/${projectID}`, {
          method: "GET",
        });

        if (!response.ok) throw new Error("Network response was not ok");

        setProject(await response.json());
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (project) {
      loadElements(JSON.parse(project.content || "[]"));
    }
  }, [project]);

  return (
    <DndContext
      id={useId()}
      sensors={sensors}
      collisionDetection={pointerWithin}
    >
      <main className="flex flex-col w-full h-full max-h-[90vh]">
        <div className="flex justify-between border-b-1 border-slate-500 p-2 gap-2 items-center">
          <h2 className="truncate font-medium">
            <span className="mr-2">
              Project:
              <Input
                placeholder={project?.name}
                onChange={(e) => updateProjectName(e.target.value)}
              ></Input>
            </span>
          </h2>
          <ThemeToggle />
          <Button
            className="gap-1"
            onClick={async () => {
              await fetch(`/api/save-project/${projectID}/${projectName}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(elements),
              });
            }}
          >
            <DocumentCheckIcon className="h-5 w-6" />
            <p>Save</p>
          </Button>
        </div>

        <BuildArea />
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
