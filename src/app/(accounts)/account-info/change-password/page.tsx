import React from "react";

import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"

import Copyright from "../../../components/Copyright";

export default function Page() {
  return (
    <div className="flex h-screen justify-center items-center">
			<Card className="max-w-full w-[340px] h-fit">
        <CardHeader className="flex justify-center">
          <p className="text-xl font-bold">Change Password</p>
        </CardHeader>


				<CardBody>
          <form className="flex flex-col gap-4">

            <Input
              isRequired
              label="New Password"
              type="password"
              placeholder="Enter your new password"
            />

            <Input
              isRequired
              label="Re-Enter New Password"
              type="password"
              placeholder="Enter your new password"
            />

            <Input
              isRequired
              label="Enter Password"
              type="password"
              placeholder="Enter your old password"
            />

            <a href="/account-info">
                <Button
                  fullWidth
                  color="primary">
                  Change Username
                </Button>
            </a>





          </form>
				</CardBody>
				<CardFooter className="flex flex-col">
					<Copyright />
				</CardFooter>
			</Card>

    </div>

  );
}