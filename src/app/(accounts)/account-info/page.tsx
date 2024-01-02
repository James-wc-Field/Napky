import React from "react";

import { Input } from "@nextui-org/input"
import { Link } from "@nextui-org/link"
import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import {usePress} from 'react-aria'


import Copyright from "../../components/Copyright";

const username = "my username"
const email = "test@email.com"


export default function Page() {
  return (
    <div className="flex h-screen justify-center items-center">
			<Card className="max-w-full w-[340px] h-fit">
        <CardHeader className="flex justify-center">
          <p className="text-xl font-bold">Account Information</p>
        </CardHeader>
				<CardBody>
          <form className="flex flex-col gap-4">
            <p className="text-sm text-center mx-4">
              Username: {username}
            </p>



            <a href="account-info/change-username">
                <Button
                    fullWidth
                    color="primary">
                    Change Username
                    </Button>
            </a>



            <p className="text-sm text-center mx-4">
              Email: {email}
            </p>


            <a href="account-info/change-email">
                <Button
                    fullWidth
                    color="primary">
                    Change Email
                </Button>
            </a>


            <a href="account-info/change-password">
                <Button
                  fullWidth
                  color="primary">
                  Change Password
                </Button>
            </a>


            <Link href="/dashboard" className="justify-center text-sm">
              Back to Dashboard
            </Link>
          </form>
				</CardBody>
				<CardFooter className="flex flex-col">
					<Copyright />
				</CardFooter>
			</Card>

    </div>
  );
}