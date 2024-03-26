import useProject from './useProject'
import { ElementsType, ProjectElements } from "@canvas/types/ProjectElements";
import { idGenerator } from "@/lib/idGenerator";
export function useExternalDrop() {
    const { addElement, scrollLeft, scrollTop,zoomLevel} = useProject();
    /**
     * External drop handler
     * Handler for external file drop
     * @param e Dragevent
     * @returns 
     */
    function externalDropHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        if (!e.dataTransfer?.items) return;
        const canvasRect = document
            .getElementById("canvas-pane-droppable")
            ?.getBoundingClientRect() as DOMRect;
        const top = canvasRect.top || 0;
        const left = canvasRect.left || 0;
        // If the dropped item is a file, create an image block
        if (e.dataTransfer.files.length > 0) {
            for (const file of Array.from(e.dataTransfer.files)) {
                console.log("FILE:", file);
                const reader = new FileReader();
                const xPos = e.clientX - left;
                const yPos = e.clientY - top;
                if (
                    yPos < 0 ||
                    xPos < 0 ||
                    yPos > canvasRect.height ||
                    xPos > canvasRect.width
                )
                    continue;

                reader.onload = (event) => {
                    const src = event.target?.result as string;
                    const type = "ImageBlock";
                    let newElement = ProjectElements[type as ElementsType].construct(
                        idGenerator(),
                        "root"
                    );
                    console.log("NEW ELEMENT:", newElement);

                    newElement = {
                        ...newElement,
                        extraAttributes: {
                            ...newElement.extraAttributes,
                            src: src,
                        },
                    };

                    addElement(
                        newElement,
                        (xPos - scrollLeft) / zoomLevel,
                        (yPos - scrollTop) / zoomLevel
                    );
                };

                reader.readAsDataURL(file);
            }
        }
        // if the dropped item is a url, create an url block
        // else if (e.dataTransfer.getData("text/plain")) is a valid url
        // if the dropped item is text, create a text block
        else if (e.dataTransfer.getData("text/plain")) {
            const xPos = e.clientX - left;
            const yPos = e.clientY - top;
            if (
                yPos < 0 ||
                xPos < 0 ||
                yPos > canvasRect.height ||
                xPos > canvasRect.width
            ) return;
            const type = "TextBlock";
            let newElement = ProjectElements[type as ElementsType].construct(
                idGenerator(),
                "root"
            );
            console.log("NEW ELEMENT:", newElement);
            newElement = {
                ...newElement,
                extraAttributes: {
                    ...newElement.extraAttributes,
                    text: e.dataTransfer.getData("text/plain"),
                },
            };
            addElement(
                newElement,
                (xPos - scrollLeft) / zoomLevel,
                (yPos - scrollTop) / zoomLevel
            );
        };
    }
    return { externalDropHandler }

}