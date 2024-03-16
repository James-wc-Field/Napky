"use client";

import { SignInInput } from "aws-amplify/auth";
import { useForm } from "react-hook-form";

import { handleSignIn } from "@/(accounts)/sign-in/api";
import { EmailField, PasswordField } from "@components/FormFields";
import { Form } from "@ui/form";
import { Button } from "@ui/button";
import { useToast } from "@ui/use-toast";

export function SignInForm() {
  const form = useForm<SignInInput>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // TODO: Send data to server
  const { toast } = useToast();
  async function onSubmit(data: SignInInput) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      duration: 10000,
    });

    const { isSignedIn, nextStep, error } = await handleSignIn(data);

    toast({
      title: "Server response:",
      variant: error ? "destructive" : "default",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify({ isSignedIn, nextStep, error }, null, 2)}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
