'use server'
// See if this works with the server tag. Amplify doesn't mention this api on their list of server-side APIs
import { updatePassword, type UpdatePasswordInput } from 'aws-amplify/auth';

async function handleUpdatePassword({
  oldPassword,
  newPassword
}: UpdatePasswordInput) {
  try {
    await updatePassword({ oldPassword, newPassword });
  } catch (err) {
    console.log(err);
  }
}