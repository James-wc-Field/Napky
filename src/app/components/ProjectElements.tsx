import React from "react";
import { TextBlockProjectElement } from "./blocks/TextBlock";
import { ImageBlockProjectElement } from "./blocks/ImageBlock";
import { LinkBlockProjectElement } from "./blocks/LinkBlock";
import { ListBlockProjectElement } from "./blocks/ListBlock";
import { TodoBlockProjectElement } from "./blocks/TodoBlock";

export type ElementsType =
  | "TextBlock"
  | "ImageBlock"
  | "LinkBlock"
  | "ListBlock"
  | "TodoBlock";

export type ProjectElement = {
  type: ElementsType;

  construct: (id: string) => ProjectElementInstance;

  toolbarElement: {
    icon: React.ElementType;
    label: string;
  };
  canvasComponent: React.FC<{
    elementInstance: ProjectElementInstance;
  }>; // How the element will be rendered in the canvas

  toolbarPropertiesComponent: React.FC; // How the properties of the element will be rendered in the toolbar

  listComponent: React.FC<{
    elementInstance: ProjectElementInstance;
  }>; // How the element will be rendered when put into a list
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
  TodoBlock: TodoBlockProjectElement,
};
