import { uploadData } from "aws-amplify/storage";
import * as htmlToImage from "html-to-image";

export async function uploadImage(projectId: string, ref: any) {
    try {
        htmlToImage.toJpeg(ref.current!).then(async (dataUrl) => {
            try {
                const result = await uploadData({
                    key: projectId + '.jpeg',
                    data: dataUrl,
                    options: {
                        accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest' // Optional progress callback.
                    }
                }).result;
                console.log('Succeeded: ', result);
            } catch (error) {
                console.log('Error : ', error);
            }
        });
    } catch (error) {
        console.log(error)
    }
}