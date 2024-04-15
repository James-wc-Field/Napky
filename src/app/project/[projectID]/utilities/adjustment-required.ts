import { ToolsType } from "../types/NinjaSketchTypes";

export const adjustmentRequired = (type: ToolsType) =>
  ["line", "rectangle"].includes(type);
