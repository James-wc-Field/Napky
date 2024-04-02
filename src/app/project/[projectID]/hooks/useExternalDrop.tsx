import useProject from "./useProject";
import {
  ElementsType,
  ProjectElements,
} from "@/project/[projectID]/types/ProjectElements";
import { idGenerator } from "@/lib/idGenerator";
import { generateSummary, getOpenGraphTags } from "@/project/[projectID]/api";
import { uploadData } from "aws-amplify/storage";

export function useExternalDrop() {
  const { addElement, scrollLeft, scrollTop, zoomLevel, key, updateElement } =
    useProject();
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
          console.log(src);
          newElement = {
            ...newElement,
            extraAttributes: {
              ...newElement.extraAttributes,
              src,
            },
          };

          addElement(
            newElement,
            (xPos - scrollLeft) / zoomLevel,
            (yPos - scrollTop) / zoomLevel
          );
        };

        // Create hash of file, then convert hash to string to use as filename: https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
        const hash = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
        const filename = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
        console.log("FILENAME:", filename);



        // ---- INVALID IDENTITY POOL CONFIGURATION EXCEPTION ----

        try {
          const result = await uploadData({
            key: filename,
            data: file,
          }).result;
          console.log("Succeeded: ", result);
        } catch (error) {
          console.log("Error : ", error);
        }

        // ---- INVALID IDENTITY POOL CONFIGURATION EXCEPTION ----



        // Don't use this right now, need to figure out adding file to S3 first (above)
        // reader.readAsDataURL(file);
      }
    } else if (isValidUrl(confirmUrl(e.dataTransfer.getData("text/plain")))) {
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
      console.log("NEW ELEMENT:", newElement);
      newElement = {
        ...newElement,
        extraAttributes: {
          ...newElement.extraAttributes,
          isRenderingBackup: true,
          text: e.dataTransfer.getData("text/plain"),
        },
      };
      addElement(
        newElement,
        (xPos - scrollLeft) / zoomLevel,
        (yPos - scrollTop) / zoomLevel
      );
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
