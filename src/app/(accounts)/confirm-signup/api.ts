import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';

export async function handleConfirmSignUp({
  username,
  confirmationCode
}: ConfirmSignUpInput) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode
    });
    console.log('isSignUpComplete', isSignUpComplete);
    console.log('nextStep', nextStep);
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}