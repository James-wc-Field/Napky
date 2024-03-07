import React from "react";

import { Input } from "@ui/input";
import Link from "next/link";
import { Button } from "@ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@ui/card";

import Copyright from "../../components/Copyright";

export default function Page() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="max-w-full w-[340px] h-fit">
        <CardHeader className="flex justify-center">
          <p className="text-xl font-bold">Reset Password</p>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <p className="text-sm">
              Enter your email address and we will send you a link to reset your
              password.
            </p>
            <Input type="email" placeholder="Enter your email" />
            <Button color="primary">Email me</Button>
            <Link href="/login" className="text-center text-sm hover:underline">
              Back to Login
            </Link>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Copyright />
        </CardFooter>
      </Card>
    </div>
  );
}
