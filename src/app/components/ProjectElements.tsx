import React from "react";
import { TextBlockProjectElement } from "./blocks/TextBlock";
import { ImageBlockProjectElement } from "./blocks/ImageBlock";

export type ElementsType = "TextBlock" | "ImageBlock";

export type ProjectElement = {
  type: ElementsType;

  construct: (id: string) => ProjectElementInstance;

  toolbarElement: {
    icon: React.ElementType;
    label: string;
  };

  projectComponent: React.FC<{
    elementInstance: ProjectElementInstance;
  }>;
  toolbarPropertiesComponent: React.FC;
};

export type ProjectElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type ProjectElementsType = {
  [key in ElementsType]: ProjectElement;
};

export const ProjectElements: ProjectElementsType = {
  TextBlock: TextBlockProjectElement,
  ImageBlock: ImageBlockProjectElement,
};
