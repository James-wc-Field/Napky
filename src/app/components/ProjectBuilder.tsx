'use client'
import React, { useId } from "react";
import {
  DndContext,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  PointerSensor,
} from "@dnd-kit/core";

import { Input } from "@nextui-org/react";
import { Project } from "../../API";
import BuildArea from "./BuildArea";
import DragOverlayWrapper from "./DragOverlayWrapper";
import usePreventZoom from "./hooks/usePreventZoom";
import { Button } from "@nextui-org/react";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import useProject from "./hooks/useProject";
import config from '../../amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';
import { ProjectElementInstance } from "./ProjectElements";
import { useEffect, useState } from "react";

export default function ProjectBuilder({ project, saveProject }: { project: Project, saveProject: (projectId: string, name: string, elements: ProjectElementInstance[]) => void }) {
  const { loadElements } = useProject();
  useEffect(() => {
    if (project) {
      loadElements(JSON.parse(project.content || "[]"));
    }
  }, [project]);

  const id = useId();
  const {
    elements,
    updateProjectName,
    projectName
  } = useProject();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 2 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );
  Amplify.configure(config);
  usePreventZoom();
  return (
    <DndContext id={id} sensors={sensors} collisionDetection={pointerWithin}>
      <main className="flex flex-col w-full h-full">
        <div className="flex justify-between border-b-1 border-slate-500 p-2 gap-2 items-center">

          <h2 className="truncate font-medium">
            <span className="mr-2">Project:
              <Input placeholder={project.name} onChange={(e) => updateProjectName(e.target.value)}>
              </Input>
            </span>
          </h2>
          <Button onPress={() => saveProject(project.id, projectName, elements)}>
            <DocumentCheckIcon className="h-5 w-6" />
            Save
          </Button>
        </div>
        <BuildArea />
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
