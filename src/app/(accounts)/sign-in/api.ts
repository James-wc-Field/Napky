import { SignUpInputExtended } from "@/(accounts)/sign-in/SignUpForm";
import { SignInInput, signUp } from "aws-amplify/auth";
import { signIn } from "aws-amplify/auth";

export async function handleSignIn({ username: email, password }: SignInInput) {
  try {
    if (!email || !password) {
      throw new Error("username and password are required");
    }
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });
    return { isSignedIn, nextStep };
  } catch (error) {
    return { error };
  }
}

export async function handleSignUp({
  username: email,
  password,
  confirmPassword,
}: SignUpInputExtended) {
  try {
    if (!email || !password || !confirmPassword) {
      throw new Error("username, password, and confirmPassword are required");
    }
    if (password !== confirmPassword) {
      throw new Error("password and confirmPassword do not match");
    }

    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
        autoSignIn: true,
      },
    });
    return { isSignUpComplete, userId, nextStep };
  } catch (error) {
    return { error };
  }
}
