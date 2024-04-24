import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { PiMinus, PiPlus } from "react-icons/pi";
import {
  HiOutlineArrowUturnLeft,
  HiOutlineArrowUturnRight,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { useProjectStore } from "./storeProvider";


export function ControlPanel() {
  const undo = useProjectStore((state) => state.undo);
  const redo = useProjectStore((state) => state.redo);
  const updateZoomLevel = useProjectStore((state) => state.updateZoomLevel);
  const zoomLevel = useProjectStore((state) => state.zoomLevel);
  return (
    <>
      <Card
        className="absolute bottom-20 right-10 flex flex-row p-2 gap-2 select-none"
        style={{ zIndex: 5 }}>
        <Tippy content="Zoom Out">
          <button onClick={() => {
            updateZoomLevel(false, 1.1)
          }} aria-label="Zoom Out">
            <PiMinus />
          </button>
        </Tippy>
        <Tippy content={`Set scale to 100%`}>
          <button
            onClick={() => updateZoomLevel(zoomLevel < 1, 1)}
            aria-label={`Set scale to 100%`}
          >
            {new Intl.NumberFormat("en-GB", { style: "percent" }).format(
              zoomLevel
            )}
          </button>
        </Tippy>
        <Tippy content="Zoom In">
          <button onClick={() => {
            updateZoomLevel(true, 1.1)
          }} aria-label="Zoom In">
            <PiPlus />
          </button>
        </Tippy>
      </Card >

      <Card className="absolute bottom-20 left-10 flex flex-row p-2 gap-2 select-none"
        style={{ zIndex: 5 }}>
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
      </Card>
    </>
  );
}
