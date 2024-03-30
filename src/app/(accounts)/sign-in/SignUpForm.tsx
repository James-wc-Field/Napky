"use client";

import { SignUpInput } from "aws-amplify/auth";
import { useForm } from "react-hook-form";

import { handleSignUp } from "@/(accounts)/sign-in/api";
import {
  EmailField,
  PasswordConfirmField,
  PasswordField,
} from "@components/FormFields";
import { Form } from "@ui/form";
import { Button } from "@ui/button";
import { useToast } from "@ui/use-toast";

export type SignUpInputExtended = SignUpInput & {
  confirmPassword: string;
};

export function SignUpForm() {
  const form = useForm<SignUpInputExtended>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();
  async function onSubmit(data: SignUpInputExtended) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      duration: 10000,
    });

    const { isSignUpComplete, nextStep, userId, error } = await handleSignUp(
      data
    );

    toast({
      title: "Server response:",
      variant: error ? "destructive" : "default",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              { isSignUpComplete, nextStep, userId, error },
              null,
              2
            )}
          </code>
        </pre>
      ),
      duration: 10000,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <EmailField form={form} />
        <PasswordField form={form} />
        <PasswordConfirmField form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
