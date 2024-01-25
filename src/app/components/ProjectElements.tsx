import React from "react";
import { TextBlockProjectElement } from "./blocks/TextBlock";

export type ElementsType = "TextBlock";

export type ProjectElement = {
  type: ElementsType;

  construct: (id: string) => ProjectElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC;
  projectComponent: React.FC;
  propertiesComponent: React.FC;
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
};
