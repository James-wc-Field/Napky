"use client";

import React from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui/tabs";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";

import Copyright from "@components/Copyright";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/16/solid";
import { EyeSlashIcon } from "@heroicons/react/16/solid";

import { useToast } from "@ui/use-toast";
import { UseFormReturn, useForm } from "react-hook-form";
import { handleSignIn, handleSignUp } from "@/(accounts)/sign-in/api";
import { SignInInput, SignUpInput } from "aws-amplify/auth";

export default function LoginCard() {
  return (
    <Card className="max-w-full w-[340px]">
      <CardHeader className="flex justify-center">
        <h1 className="text-2xl font-bold">Welcome</h1>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sign-in">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="sign-in">Sign in</TabsTrigger>
            <TabsTrigger value="sign-up">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="flex flex-col gap-3">
            <SignInForm />
            <Link
              href="/forgot-password"
              className="text-sm hover:underline text-center"
            >
              Forgot password?
            </Link>
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Copyright />
      </CardFooter>
    </Card>
  );
}

// Read https://react-hook-form.com/get-started to get more info

function SignInForm() {
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

export type SignUpInputExtended = SignUpInput & {
  confirmPassword: string;
};

function SignUpForm() {
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

function EmailField({
  form,
}: {
  form: UseFormReturn<SignInInput | SignUpInputExtended | any>;
}) {
  return (
    <FormField
      control={form.control}
      name="username"
      rules={{
        required: true,
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Not a valid email address",
        },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormControl>
            <Input
              autoComplete="email"
              id="email"
              placeholder="Enter your email"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PasswordField({
  form,
}: {
  form: UseFormReturn<SignInInput | SignUpInputExtended | any>;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name="password"
      rules={{
        required: true,
        validate: (value) => {
          return value.length >= 8 || "Password must be at least 8 characters";
        },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                {...field}
              />
              <Button
                variant={"ghost"}
                size="icon"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PasswordConfirmField({
  form,
}: {
  form: UseFormReturn<SignInInput | SignUpInputExtended | any>;
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <FormField
      control={form.control}
      name="confirmPassword"
      rules={{
        required: true,
        validate: (value) => {
          return (
            value === form.getValues().password || "Passwords do not match"
          );
        },
        onChange: () => {
          form.trigger("passwordConfirmation"); // trigger validation on change
        },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id="confirm-password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                {...field}
              />
              <Button
                variant={"ghost"}
                size="icon"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
