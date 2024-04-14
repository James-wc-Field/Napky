import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SignInInput } from "aws-amplify/auth";

import { Input } from "@ui/input";
import { Button } from "@ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";

import { EyeIcon } from "@heroicons/react/16/solid";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import { SignUpInputExtended } from "@/(accounts)/sign-in/SignUpForm";
import { FeedbackInput } from "./FeedbackToast";
import { Textarea } from "./ui/textarea";

export function EmailField({
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

export function PasswordField({
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

export function PasswordConfirmField({
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

export function FeedbackCommentsField({
  form,
}: {
  form: UseFormReturn<FeedbackInput | any>;
}) {
  return (
    <FormField
      control={form.control}
      name="feedback"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="feedback">Your feedback</FormLabel>
          <FormControl>
            <Textarea
              id="feedback"
              placeholder="Enter your feedback here"
              rows={5}
              {...field}
            />
          </FormControl>
          <FormDescription>
            Your feedback helps us improve our site. Thank you!
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
