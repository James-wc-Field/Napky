import { Tools, ToolsType } from "./types/NinjaSketchTypes";

import { LuPencil } from "react-icons/lu";
import { FiMinus, FiMousePointer, FiSquare } from "react-icons/fi";
import { IoHandRightOutline, IoText } from "react-icons/io5";
import { Card } from "@/components/ui/card";

type ActionBarProps = {
  tool: ToolsType;
  setTool: (tool: ToolsType) => void;
};

export function ActionBar({ tool, setTool }: ActionBarProps) {
  return (
    <Card
      className="absolute top-4 left-80 flex flex-row p-2 gap-2"
      style={{ zIndex: 5 }}>
      {Object.values(Tools).map((t, index) => (
        <div
          className={`inputWrapper ${tool === t ? "selected" : ""}`}
          key={t}
          onClick={() => setTool(t)}
        >
          <input
            type="radio"
            id={t}
            checked={tool === t}
            onChange={() => setTool(t)}
            readOnly
          />
          <label htmlFor={t}>{t}</label>
          {t === "pan" && <IoHandRightOutline />}
          {t === "selection" && <FiMousePointer />}
          {t === "pencil" && <LuPencil />}
          <span>{index + 1}</span>
        </div>
      ))}
    </Card>
  );
}
