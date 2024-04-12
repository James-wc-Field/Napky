import { uploadData } from "aws-amplify/storage";
import htmlToImage from "html-to-image";

export async function createProjectImage(projectId: string, ref: any) {
    try {
        htmlToImage.toJpeg(ref.current!).then(async (dataUrl) => {
            try {
                const result = await uploadData({
                    key: projectId + '.jpeg',
                    data: dataUrl,
                    options: {
                        accessLevel: 'protected', // defaults to `guest` but can be 'private' | 'protected' | 'guest' // Optional progress callback.
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

export async function uploadImage(file: File, filename: string) {
    console.log('Uploading file: ', file, filename)
    try {
        const result = await uploadData({
            key: filename,
            data: file,
            options: {
                accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
            }
        }).result;
        console.log('Succeeded: ', result);
    } catch (error) {
        console.log('Error : ', error);
    }
}