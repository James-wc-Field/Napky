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
          <p className="text-xl font-bold">Change Email</p>
        </CardHeader>


				<CardBody>
          <form className="flex flex-col gap-4">

            <Input
              isRequired
              label="New Email"
              type="email"
              placeholder="Enter your new email"
            />

            <Input
              isRequired
              label="Re-Enter New Email"
              type="email"
              placeholder="Enter your new email"
            />

            <Input
              isRequired
              label="Enter Password"
              type="password"
              placeholder="Enter your password"
            />

            <a href="/account-info">
                <Button
                  fullWidth
                  color="primary">
                  Change Email
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