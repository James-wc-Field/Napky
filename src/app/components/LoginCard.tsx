'use client'

import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs"
import { Input } from "@nextui-org/input"
import { Checkbox } from "@nextui-org/checkbox"
import { Link } from "@nextui-org/link"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter } from "@nextui-org/card"

import { EyeFilledIcon } from "./icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";

import Copyright from "../components/Copyright";

export default function Page() {
	const [selected, setSelected] = React.useState("login");
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
	function tabChange(key: React.Key) {
		setIsVisible(false); // Reset password visibility when changing tabs
		setSelected(key as string);
	}

	return (
		<>
			<Card className="max-w-full w-[340px] h-[400px]">
				<CardBody className="overflow-hidden">
					<Tabs
						fullWidth
						size="md"
						aria-label="Tabs form"
						selectedKey={selected}
						onSelectionChange={(key: React.Key) => tabChange(key)}
					>
						<Tab key="login" title="Login">
							<form className="flex flex-col gap-4">
								<Input
									isRequired
									label="Email"
									type="email"
									placeholder="Enter your email"
								/>
								<Input
									isRequired
									label="Password"
									placeholder="Enter your password"
									endContent={
										<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
											{isVisible ? (
												<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
											)}
										</button>
									}
									type={isVisible ? "text" : "password"}
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
										<Link className="cursor-pointer" size="sm" onPress={() => tabChange("sign-up")}>
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
								<Input
									isRequired
									label="Name"
									type="text"
									placeholder="Enter your name"
								/>
								<Input
									isRequired
									label="Email"
									type="email"
									placeholder="Enter your email"
								/>
								<Input
									isRequired
									label="Password"
									endContent={
										<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
											{isVisible ? (
												<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
											)}
										</button>
									}
									type={isVisible ? "text" : "password"}
									placeholder="Enter your password"
								/>
								<div className="flex gap-2 justify-end">
									<Button fullWidth color="primary">
										Sign up
									</Button>
								</div>
								<p className="text-center text-small">
									Already have an account?{" "}
									<Link size="sm" className="cursor-pointer" onPress={() => tabChange("login")}>
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
		</>
	);
}
