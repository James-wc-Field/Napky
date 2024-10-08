"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui/tabs";
import { SignInForm } from "@/(accounts)/sign-in/SignInForm";
import { SignUpForm } from "@/(accounts)/sign-in/SignUpForm";
import Link from "next/link";
import { Copyright } from "@/components/Copyright";

import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from "next/navigation";
function Page() {
  return (
    <div className="flex h-screen justify-center items-center">
      {/* <Card className="max-w-full w-[340px]">
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
      </Card> */}
    </div>
  );
}

function App({ signOut, user }: WithAuthenticatorProps) {
  const router = useRouter()
  router.push('/dashboard')
  return <></>
}

export default withAuthenticator(App);