import { getUrl } from "aws-amplify/storage";


export async function getPreviewUrl(projectId: string) {
    const storageUrl = await getUrl({
        key: `${projectId}.jpg`,
        options: {
            accessLevel: 'guest'
        }
    });
    if (!storageUrl) {
        return null;
    }
    return storageUrl.url;
}