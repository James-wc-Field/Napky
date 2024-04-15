import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { PiMinus, PiPlus } from "react-icons/pi";
import {
  HiOutlineArrowUturnLeft,
  HiOutlineArrowUturnRight,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

type ControlPanelProps = {
  undo: () => void;
  redo: () => void;
  onZoom: (scale: number) => void;
  scale: number;
  setScale: (scale: number) => void;
};

export function ControlPanel({
  undo,
  redo,
  onZoom,
  scale,
  setScale,
}: ControlPanelProps) {
  return (
    <>
      <Card
        className="absolute top-4 left-4 flex flex-col p-2 gap-2 z-100"
      >
        <Tippy content="Zoom Out">
          <button onClick={() => onZoom(-0.1)} aria-label="Zoom Out">
            <PiMinus />
          </button>
        </Tippy>
        <Tippy content={`Set scale to 100%`}>
          <button
            onClick={() => setScale(1)}
            aria-label={`Set scale to 100%`}
          >
            {new Intl.NumberFormat("en-GB", { style: "percent" }).format(
              scale
            )}
          </button>
        </Tippy>
        <Tippy content="Zoom In">
          <button onClick={() => onZoom(0.1)} aria-label="Zoom In">
            <PiPlus />
          </button>
        </Tippy>
      </Card >

      <div className="editPanel">
        <Tippy content="Undo last action">
          <button onClick={undo} aria-label="Undo last action">
            <HiOutlineArrowUturnLeft />
          </button>
        </Tippy>
        <Tippy content="Redo last action">
          <button onClick={redo} aria-label="Redo last action">
            <HiOutlineArrowUturnRight />
          </button>
        </Tippy>
      </div>
    </>
  );
}
