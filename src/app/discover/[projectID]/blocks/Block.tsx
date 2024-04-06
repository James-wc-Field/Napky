import React from "react";
import { TextBlockProjectElement } from "./TextBlock";
import { ImageBlockProjectElement } from "./ImageBlock";
import { LinkBlockProjectElement } from "./LinkBlock";
import { ListBlockProjectElement } from "./ListBlock";
import { TodoBlockProjectElement } from "./TodoBlock";

export type ElementsType =
    | "TextBlock"
    | "ImageBlock"
    | "LinkBlock"
    | "ListBlock"
    | "TodoBlock"


export type ProjectElement = {
    type: ElementsType;
    construct: (id: string, parentId: string) => ProjectElementInstance;
    canvasComponent: React.FC<{
        elementInstance: ProjectElementInstance;
    }>; // How the element will be rendered in the canvas

};

export type Position = {
    x: number | null;
    y: number | null;
}

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
};
