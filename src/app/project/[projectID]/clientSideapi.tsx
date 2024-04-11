import { uploadData } from "aws-amplify/storage";

export async function uploadImage(file: File, filename: string) {
    try {
        return await uploadData({
            key: filename,
            data: file,
            options: {
                accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
            }
        }).result;
    } catch (error) {
        console.log('Error : ', error);
        return null;
    }
}