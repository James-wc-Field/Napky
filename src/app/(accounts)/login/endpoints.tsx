import { Amplify } from 'aws-amplify';
import { signUp } from 'aws-amplify/auth';
import { signIn } from 'aws-amplify/auth';
import config from "@/../amplifyconfiguration.json";
import { runWithAmplifyServerContext } from '@/amplifyServerUtils';
import {getCurrentUser} from 'aws-amplify/auth/server';
import {cookies} from 'next/headers'
export async function handleSignIn(formData: FormData) {
  // Amplify.configure(config, { ssr: true });
    console.log('handleSignIn')
    console.log(formData)
  try {
    const username = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    if (!username || !password) {
      throw new Error('username and password are required');
    }
    // const { isSignedIn, nextStep } = await runWithAmplifyServerContext({
    //   nextServerContext: { cookies},
    //   operation: async (contextSpec) => {
    //     try {
    //       const { isSignedIn, nextStep } = await signIn({ username, password });
    //       return { isSignedIn, nextStep };
    //     } catch (error) {
    //       console.log('error signing in', error);
    //       return { isSignedIn: false, nextStep: null };
    //     }
    //   }});
    Amplify.configure(config, { ssr: true });
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log(isSignedIn);
    console.log(nextStep)

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

export async function handleSignUp(formData: FormData) {
  // Amplify.configure(config, { ssr: true });
  try {
    console.log('handleSignUp')
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: formData.get('email')!.toString(),
      password: formData.get('password')!.toString(),
      options: {
        userAttributes: {
          email: formData.get('email')!.toString(),
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    });

    console.log(userId);
    console.log(isSignUpComplete);
    console.log(nextStep);
  } catch (error) {
    console.log('error signing up:', error);
  }
}