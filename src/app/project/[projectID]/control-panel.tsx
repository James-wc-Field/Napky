import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { ArrowUturnRightIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";
import { Card } from "@/components/ui/card";
import { useProjectStore } from "./storeProvider";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => {
                updateZoomLevel(false, 1.1)
              }}>
                <MinusIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom Out</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => updateZoomLevel(zoomLevel < 1, 1)}>
                {new Intl.NumberFormat("en-GB", { style: "percent" }).format(
                  zoomLevel
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Set scale to 100%</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => {
                updateZoomLevel(true, 1.1)
              }}>
                <PlusIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom In</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Card>
      <Card className="absolute bottom-20 left-10 flex flex-row p-2 gap-2 select-none"
        style={{ zIndex: 5 }}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={undo}>
                <ArrowUturnLeftIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo last action</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={redo}>
                <ArrowUturnRightIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo last action</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider >
      </Card >
    </>
  );
}
