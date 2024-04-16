import { ProjectElementInstance } from "./ProjectElements";

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
    id: number;
    type: ToolsType;
    offsetX?: number;
    offsetY?: number;
    position?: string | null;
    points?: { x: number; y: number }[];
};

export type ActionsType =
    | "drawing"
    | "moving"
    | "panning"
    | "resizing"
    | "none";

export const Tools = {
    pan: "pan",
    selection: "selection",
    pencil: "pencil"
};

export type ToolsType = (typeof Tools)[keyof typeof Tools];

export type PointType = { x: number; y: number };