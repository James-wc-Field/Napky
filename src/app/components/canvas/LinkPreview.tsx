import useProject from "./hooks/useProject";
import { ProjectElementInstance } from "./types/ProjectElements";
const {updateElement} = useProject()
export async function LinkPreview(elementId: string, element:ProjectElementInstance) {

    let imageExists;
    let tags = await metaTags;

    if (tags) {
        imageExists = tags["og:image"] ? true : false
    } else {
        imageExists = false
    }
    console.log(metaTags)
    return (
        <div>
            {imageExists ? (
                <div>
                    {/* <Image width={300}
              height={200}
              alt={metaTags["og:title"] || ""}
              src={metaTags["og:image"] || ""}
              className="rounded-md">
            </Image> */}
                    <h3>{tags["og:title"]} || ""</h3>
                    <p>{tags["og:description"] || ""}</p>
                </div>
            ) : <></>}
        </div>

    )
}