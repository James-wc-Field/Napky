import { ToolsType } from "../NinjaSketchTypes";

export const adjustmentRequired = (type: ToolsType) =>
  ["line", "rectangle"].includes(type);
