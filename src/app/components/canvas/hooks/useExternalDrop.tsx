import useProject from './useProject'
import { ElementsType, ProjectElements } from "@canvas/types/ProjectElements";
import { idGenerator } from "@/lib/idGenerator";
import { generateSummary, getOpenGraphTags } from '@/project/[projectID]/api'

export function useExternalDrop() {
    const { addElement, scrollLeft, scrollTop, zoomLevel, key } = useProject();
    /**
     * External drop handler
     * Handler for external file drop
     * @param e Dragevent
     * @returns 
     */
    async function externalDropHandler(e: React.DragEvent<HTMLDivElement>) {
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
                    console.log(src)
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
        else if (isValidUrl(confirmUrl(e.dataTransfer.getData("text/plain")))) {
            const url = confirmUrl(e.dataTransfer.getData("text/plain"))
            const xPos = e.clientX - left;
            const yPos = e.clientY - top;
            if (
                yPos < 0 ||
                xPos < 0 ||
                yPos > canvasRect.height ||
                xPos > canvasRect.width
            ) return;
            const type = "LinkBlock";
            const tags = await getOpenGraphTags(url)
            let summary = await generateSummary(url, key)
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
                    metaTags: tags,
                    summary: summary
                },
            };
            addElement(
                newElement,
                (xPos - scrollLeft) / zoomLevel,
                (yPos - scrollTop) / zoomLevel
            );
        }
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


function confirmUrl(str: string) {
    if (!str.startsWith('http')) {
        str = "https://" + str
    }
    return str
}
function isValidUrl(str: string) {
    let url;
    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}