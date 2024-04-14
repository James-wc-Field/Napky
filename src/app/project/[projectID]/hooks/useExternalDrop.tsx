import {
  ElementsType,
  ProjectElements,
} from "@/project/[projectID]/types/ProjectElements";
import { idGenerator } from "@/lib/idGenerator";
import { generateSummary, getOpenGraphTags } from "@/project/[projectID]/api";
import { useProjectStore } from "../storeProvider";
import { uploadImage } from "@/project/[projectID]/clientapi";
import { getImageURL } from "@/project/[projectID]/clientapi";

export function useExternalDrop() {
  const updateElement = useProjectStore((state) => state.updateElement);
  const addElement = useProjectStore((state) => state.addElement);
  const deleteElement = useProjectStore((state) => state.deleteElement);
  const scrollLeft = useProjectStore((state) => state.scrollLeft);
  const scrollTop = useProjectStore((state) => state.scrollTop);
  const zoomLevel = useProjectStore((state) => state.zoomLevel);
  const key = useProjectStore((state) => state.key);
  /**
   * External drop handler
   * Handler for external file drop
   * @param e Dragevent
   * @returns
   */
  //
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
          console.log(src);

          addElement({
            ...newElement,
            position: {
              x: (xPos - scrollLeft) / zoomLevel,
              y: (yPos - scrollTop) / zoomLevel,
            },
            extraAttributes: {
              ...newElement.extraAttributes,
              src: src,
            },
          });
        };

        // Get hash of the image as the key
        const hash = await window.crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(file.name)
        );
        let key = Array.from(new Uint8Array(hash))
          .map((x) => x.toString(16).padStart(2, "0"))
          .join("");

        // Add timestamp to the key
        key += "-" + Date.now();
        console.log(key);

        const uploadDataOutput = uploadImage(file, key);
        if (!uploadDataOutput) {
          console.log("No upload output");
          return;
        }

        let loadingElement = ProjectElements[
          "LoadingBlock" as ElementsType
        ].construct(idGenerator(), "root");

        addElement({
          ...loadingElement,
          position: {
            x: (xPos - scrollLeft) / zoomLevel,
            y: (yPos - scrollTop) / zoomLevel,
          },
        });

        uploadDataOutput.result.then((result) => {
          if (uploadDataOutput.state === "SUCCESS") {
            console.log("RESULT:", result);

            let newElement = ProjectElements[
              "ImageBlock" as ElementsType
            ].construct(idGenerator(), "root");

            getImageURL(result.key).then((url) => {
              if (!url) return;

              console.log("URL:", url);
              console.log("NEW ELEMENT:", newElement);
              addElement({
                ...newElement,
                position: {
                  x: (xPos - scrollLeft) / zoomLevel,
                  y: (yPos - scrollTop) / zoomLevel,
                },
                extraAttributes: {
                  ...newElement.extraAttributes,
                  src: url.href,
                },
              });
              deleteElement(loadingElement.id);
            });
          }
        });
      }
    } else if (isValidUrl(e.dataTransfer.getData("text/plain"))) {
      const url = confirmUrl(e.dataTransfer.getData("text/plain"));
      const xPos = e.clientX - left;
      const yPos = e.clientY - top;
      if (
        yPos < 0 ||
        xPos < 0 ||
        yPos > canvasRect.height ||
        xPos > canvasRect.width
      )
        return;
      let newElement = ProjectElements["LinkBlock" as ElementsType].construct(
        idGenerator(),
        "root"
      );
      addElement({
        ...newElement,
        position: {
          x: (xPos - scrollLeft) / zoomLevel,
          y: (yPos - scrollTop) / zoomLevel,
        },
        extraAttributes: {
          ...newElement.extraAttributes,
          isRenderingBackup: true,
          text: e.dataTransfer.getData("text/plain"),
        },
      });
      updateElement(newElement.id, {
        ...newElement,
        extraAttributes: {
          ...newElement.extraAttributes,
          isRenderingBackup: false,
          metaTags: await getOpenGraphTags(url),
          summary: await generateSummary(url, key),
        },
      });
    } else if (e.dataTransfer.getData("text/plain")) {
      const xPos = e.clientX - left;
      const yPos = e.clientY - top;
      if (
        yPos < 0 ||
        xPos < 0 ||
        yPos > canvasRect.height ||
        xPos > canvasRect.width
      )
        return;
      const type = "TextBlock";
      let newElement = ProjectElements[type as ElementsType].construct(
        idGenerator(),
        "root"
      );
      addElement({
        ...newElement,
        position: {
          x: (xPos - scrollLeft) / zoomLevel,
          y: (yPos - scrollTop) / zoomLevel,
        },
        extraAttributes: {
          ...newElement.extraAttributes,
          text: e.dataTransfer.getData("text/plain"),
        },
      });
    }
  }
  return { externalDropHandler };
}

function confirmUrl(str: string) {
  if (!str.startsWith("http")) {
    str = "https://" + str;
  }
  return str;
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
