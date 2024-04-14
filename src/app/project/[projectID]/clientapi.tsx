import { getUrl, uploadData } from "aws-amplify/storage";
import { toJpeg } from "html-to-image";

export async function createProjectImage(
  projectId: string,
  ref: HTMLDivElement | null
) {
  console.log(ref);
  if (!ref) return;
  try {
    toJpeg(ref).then(async (dataUrl) => {
      try {
        const blob = await fetch(dataUrl).then((res) => res.blob());
        const file = new File([blob], "filename.jpg", { type: "image/jpeg" });
        const result = await uploadData({
          key: projectId + ".jpg",
          data: file,
          options: {
            accessLevel: "guest", // defaults to `guest` but can be 'private' | 'protected' | 'guest' // Optional progress callback.
          },
        }).result;
        console.log("Succeeded: ", result);
      } catch (error) {
        console.log("Error : ", error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export function uploadImage(file: File, filename: string) {
  console.log("Uploading file: ", file, filename);
  try {
    return uploadData({
      key: filename,
      data: file,
      options: {
        accessLevel: "guest", // defaults to `guest` but can be 'private' | 'protected' | 'guest'
      },
    });
  } catch (error) {
    console.log("Error : ", error);
    return null;
  }
}

export async function getImageURL(key: string) {
  const storageUrl = await getUrl({
    key,
    options: {
      accessLevel: "guest",
      expiresIn: 10, // We don't really need the URL for long
    },
  });
  if (!storageUrl) {
    return null;
  }
  return storageUrl.url;
}
