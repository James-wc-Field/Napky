'use client'

import React from "react";
import { motion } from "framer-motion";
import { Tabs, Tab } from "@nextui-org/tabs"
import { Input } from "@nextui-org/input"
import { Checkbox } from "@nextui-org/checkbox"
import { Link } from "@nextui-org/link"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter } from "@nextui-org/card"

import Copyright from "../components/Copyright";

export default function Page() {
	const [selected, setSelected] = React.useState("login");

	return (
		<div className="flex flex-col w-full">
			<Card className="max-w-full w-[340px] h-[400px]">
				<CardBody className="overflow-hidden">
					<Tabs
						fullWidth
						size="md"
						aria-label="Tabs form"
						selectedKey={selected}
						onSelectionChange={(key: React.Key) => setSelected(key as string)}
					>
						<Tab key="login" title="Login">
							<form className="flex flex-col gap-4">
								<Input isRequired label="Email" placeholder="Enter your email" type="email" />
								<Input
									isRequired
									label="Password"
									placeholder="Enter your password"
									type="password"
								/>
								<Checkbox defaultSelected>Remember me</Checkbox>

								<div className="flex gap-2 justify-end">
									<Button fullWidth color="primary">
										Login
									</Button>
								</div>
								<div className="flex flex-col gap-1">
									<div className="flex group gap-2 justify-center">
										<p className="text-sm text-center">
											Don't have an account?
										</p>
										<Link className="cursor-pointer" size="sm" onPress={() => setSelected("sign-up")}>
											Sign up
										</Link>
									</div>
									<Link size="sm" href='/forgot-password' className="justify-center cursor-pointer">
											Forgot password?
									</Link>
								</div>
							</form>
						</Tab>
						<Tab key="sign-up" title="Sign up">
							<form className="flex flex-col gap-4 h-[300px]">
								<Input isRequired label="Name" placeholder="Enter your name" type="password" />
								<Input
									isRequired
									label="Email"
									placeholder="Enter your email"
									type="email"
								/>
								<Input
									isRequired
									label="Password"
									type="password"
								/>
								<div className="flex gap-2 justify-end">
									<Button fullWidth color="primary">
										Sign up
									</Button>
								</div>
								<p className="text-center text-small">
									Already have an account?{" "}
									<Link size="sm" className="cursor-pointer" onPress={() => setSelected("login")}>
										Login
									</Link>
								</p>
							</form>
						</Tab>
					</Tabs>
				</CardBody>
				<CardFooter className="flex flex-col">
					<Copyright />
				</CardFooter>
			</Card>
		</div>
	);
}
