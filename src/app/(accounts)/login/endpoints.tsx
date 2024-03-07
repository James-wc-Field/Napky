'use server'
import { signUp } from 'aws-amplify/auth';
import { signIn, type SignInInput } from 'aws-amplify/auth';

export async function handleSignIn(formData: FormData) {
    console.log('handleSignIn')
    console.log(formData)
  try {
    const username = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    if (!username || !password) {
      throw new Error('username and password are required');
    }
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log(isSignedIn);
  } catch (error) {
    console.log('error signing in', error);
  }
}


type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
};

export async function handleSignUp({
  username,
  password,
  email,
  phone_number
}: SignUpParameters) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
          phone_number // E.164 number convention
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    });

    console.log(userId);
  } catch (error) {
    console.log('error signing up:', error);
  }
}