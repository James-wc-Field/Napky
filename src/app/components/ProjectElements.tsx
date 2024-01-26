import React from "react";
import { TextBlockProjectElement } from "./blocks/TextBlock";
import { ImageBlockProjectElement } from "./blocks/ImageBlock";
import { LinkBlockProjectElement } from "./blocks/LinkBlock";
import { ListBlockProjectElement } from "./blocks/ListBlock";

export type ElementsType = "TextBlock" | "ImageBlock" | "LinkBlock" | "ListBlock";

export type ProjectElement = {
  type: ElementsType;

  construct: (
    id: string,
  ) => ProjectElementInstance;

  toolbarElement: {
    icon: React.ElementType;
    label: string;
  };
  canvasComponent: React.FC<{
    elementInstance: ProjectElementInstance;
  }>;
  toolbarPropertiesComponent: React.FC;
};

export type ProjectElementInstance = {
  id: string;
  type: ElementsType;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  extraAttributes?: Record<string, any>;
};

type ProjectElementsType = {
  [key in ElementsType]: ProjectElement;
};

export const ProjectElements: ProjectElementsType = {
  TextBlock: TextBlockProjectElement,
  ImageBlock: ImageBlockProjectElement,
  LinkBlock: LinkBlockProjectElement,
  ListBlock: ListBlockProjectElement,
};
