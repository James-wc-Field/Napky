"use client";

import React from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui/tabs";
import { Input } from "@ui/input";
import { Checkbox } from "@ui/checkbox";
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
import { handleSignIn, handleSignUp} from "@/(accounts)/login/endpoints";


export default function Page() {
  return (
    <Card className="max-w-full w-[340px]">
      <CardHeader className="flex justify-center">
        <h1 className="text-2xl font-bold">Welcome</h1>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="sign-up">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="flex flex-col gap-3">
            <LoginForm />
            <Link href="/forgot-password" className="text-sm hover:underline text-center">
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
type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

function LoginForm() {
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  // // TODO: Send data to server
  // const { toast } = useToast();
  // function onSubmit(data: LoginFormData) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }

  return (
    <Form {...form}>
      <form action={handleSignIn}
        className="flex flex-col gap-3"
      >
        <EmailField form={form} />
        <PasswordField form={form} />
        <RememberMeField form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
  rememberMe: boolean;
};

function SignUpForm() {
  const form = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      rememberMe: true,
    },
  });

  // // TODO: Send data to server
  // const { toast } = useToast();
  // function onSubmit(data: SignUpFormData) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }

  return (
    <Form {...form}>
      <form
        action={handleSignUp}
        className="flex flex-col gap-3"
      >
        <EmailField form={form} />
        <PasswordField form={form} />
        <PasswordConfirmField form={form} />
        <RememberMeField form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function EmailField({
  form,
}: {
  form: UseFormReturn<SignUpFormData | LoginFormData | any>;
}) {
  return (
    <FormField
      control={form.control}
      name="email"
      rules={{
        required: true,
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Not a valid email address",
        },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="Enter your email" {...field} />
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
  form: UseFormReturn<SignUpFormData | LoginFormData | any>;
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
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
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
  form: UseFormReturn<SignUpFormData | LoginFormData | any>;
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <FormField
      control={form.control}
      name="passwordConfirmation"
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
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
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

function RememberMeField({
  form,
}: {
  form: UseFormReturn<SignUpFormData | LoginFormData | any>;
}) {
  return (
    <FormField
      control={form.control}
      name="rememberMe"
      render={({ field: { onChange, onBlur, value } }) => (
        <FormItem>
          <FormControl>
            <div className="flex flex-row gap-2 items-center">
              <Checkbox
                checked={value}
                onCheckedChange={onChange}
                onBlur={onBlur}
              />
              <FormLabel>Remember me</FormLabel>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}