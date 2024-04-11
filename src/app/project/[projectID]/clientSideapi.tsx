import { uploadData } from "aws-amplify/storage";

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