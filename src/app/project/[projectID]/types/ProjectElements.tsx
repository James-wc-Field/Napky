import React from "react";
import { TextBlockProjectElement } from "..//blocks/TextBlock";
import { ImageBlockProjectElement } from "../blocks/ImageBlock";
import { LinkBlockProjectElement } from "..//blocks/LinkBlock";
import { ListBlockProjectElement } from "../blocks/ListBlock";
import { TodoBlockProjectElement } from "../blocks/TodoBlock";
import { LoadingBlockProjectElement } from "../blocks/LoadingBlock";

export type ElementsType =
  | "TextBlock"
  | "ImageBlock"
  | "LinkBlock"
  | "ListBlock"
  | "TodoBlock"
  | "LoadingBlock";

export type ProjectElement = {
  type: ElementsType;

  construct: (id: string, parentId: string) => ProjectElementInstance;

  toolbarElement: {
    icon: React.ElementType;
    label: string;
  };
  canvasComponent: React.FC<{
    elementInstance: ProjectElementInstance;
  }>; // How the element will be rendered in the canvas

  toolbarPropertiesComponent: React.FC; // How the properties of the element will be rendered in the toolbar
};

export type Position = {
  x: number | null;
  y: number | null;
};

export type ProjectElementInstance = {
  id: string;
  type: ElementsType;
  selected: boolean;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  parentId: string;
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
  LoadingBlock: LoadingBlockProjectElement,
};
