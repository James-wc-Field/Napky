"use client";

import React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@ui/input-otp";
import { Button } from "@ui/button";
import { Card, CardHeader, CardContent } from "@ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@ui/form";

import { useToast } from "@ui/use-toast";
import { UseFormReturn, useForm } from "react-hook-form";
import { handleConfirmSignUp } from "@/(accounts)/confirm-signup/api";
import { ConfirmSignUpInput } from "aws-amplify/auth";

export default function ConfirmSignUpCard() {
  return (
    <Card className="max-w-full w-[340px]">
      <CardHeader className="flex justify-center">
        <h1 className="text-2xl font-bold">Confirm Sign-Up</h1>
      </CardHeader>
      <CardContent>
        <ConfirmSignUpForm />
      </CardContent>
    </Card>
  );
}

function ConfirmSignUpForm() {
  const form = useForm<ConfirmSignUpInput>();

  // TODO: Send data to server
  const { toast } = useToast();
  function onSubmit(data: ConfirmSignUpInput) {
    handleConfirmSignUp(data);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <OTPField form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function OTPField({ form }: { form: UseFormReturn<ConfirmSignUpInput | any> }) {
  return (
    <FormField
      control={form.control}
      name="confirmationCode"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <InputOTP
              maxLength={6}
              render={({ isFocused, isHovering, slots }) => (
                <>
                  <InputOTPGroup>
                    {slots.slice(0, 3).map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} />
                    ))}{" "}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {slots.slice(3).map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} />
                    ))}
                  </InputOTPGroup>
                </>
              )}
              {...field}
            />
          </FormControl>
          <FormDescription>
            Please enter your 6-digit confirmation code.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
