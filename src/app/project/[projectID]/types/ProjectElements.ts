import React from "react";
import { TextBlockProjectElement } from "../blocks/TextBlock";
import { ImageBlockProjectElement } from "../blocks/ImageBlock";
import { LinkBlockProjectElement } from "../blocks/LinkBlock";
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

  // Used when the element is pulled from the server to append any unstored attributes
  addUnstoredAttributes?: (elementInstance: ProjectElementInstance) => ProjectElementInstance;

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

  // Extra attributes that are stored on the server
  extraAttributes?: Record<string, any>;

  // Extra attributes that do not need to be stored on the server
  // Can be used for common functionality among element types, or generated attributes not necessary to store
  unstoredAttributes?: Record<string, any>;
};

type ProjectElementsType = {
  [key in ElementsType]: ProjectElement;
};

export type PointType = { x: number; y: number };

export const ProjectElements: ProjectElementsType = {
  TextBlock: TextBlockProjectElement,
  ImageBlock: ImageBlockProjectElement,
  LinkBlock: LinkBlockProjectElement,
  ListBlock: ListBlockProjectElement,
  TodoBlock: TodoBlockProjectElement,
  LoadingBlock: LoadingBlockProjectElement,
};

export type SelectedCanvasElementType = CanvasElementType & {
  xOffsets?: number[];
  yOffsets?: number[];
  offsetX?: number;
  offsetY?: number;
};

export interface ExtendedCanvasElementType extends CanvasElementType {
  xOffsets?: number[];
  yOffsets?: number[];
}

export type AllElementsType = (CanvasElementType | ProjectElementInstance);

export type CanvasElementType = {
  id: string;
  offsetX?: number;
  offsetY?: number;
  position?: string | null;
  points?: { x: number; y: number }[];
  selected: boolean;
};