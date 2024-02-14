'use client'

import React from "react";
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

import { Tabs, Tab } from "@nextui-org/tabs"
import { Input } from "@nextui-org/input"
import { Checkbox } from "@nextui-org/checkbox"
import { Link } from "@nextui-org/link"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter } from "@nextui-org/card"

import { EyeFilledIcon } from "../../../public/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../public/icons/EyeSlashFilledIcon";

import Copyright from "../components/Copyright";

interface Props {
	session: Session | null;
}

export default function Page({ session } : Props) {
	const [selected, setSelected] = React.useState("login");
	const [isVisible, setIsVisible] = React.useState(false);
	const [email, setEmail] = React.useState('');

	const handleEmailSignIn = (e: React.FormEvent<HTMLFormElement>) => {
		// handle email sign in
		e.preventDefault();
		React.useEffect(() => {
			(async () => {
				await signIn('email', { email, callbackUrl: '/protected' });
			})();
		})
	};
	
	const handleGoogleSignIn = () => {
		// handle Google sign in
		React.useEffect(() => {
			(async () => {
				await signIn('google', { callbackUrl: '/protected' });
			})();
		})
	};
	
	const handleSignOut = () => {
		// handle sign out
		React.useEffect(() => {
			(async () => {
				await signOut({ callbackUrl: '/' });
			})();
		})

	};

	const toggleVisibility = () => setIsVisible(!isVisible);
	function tabChange(key: React.Key) {
		setIsVisible(false); // Reset password visibility when changing tabs
		setSelected(key as string);
	}

	return (
		<>
		<div className="border-4 rounded-lg border-sky-500 mb-4">
			<h1>Test Auth UI</h1>
			{!session && (
				<>
					<form onSubmit={handleEmailSignIn}>
						<input
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button>Continue</button>
					</form>
					<button onClick={handleGoogleSignIn}>Continue with Google</button>
				</>
			)}

			{session && <button onClick={handleSignOut}>Sign out</button>}
		</div>
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
								<Button fullWidth color="primary">
									Login
								</Button>
								<div className="flex flex-col gap-1">
									<div className="flex group gap-2 justify-center">
										<p className="text-sm text-center">
											Don't have an account?
										</p>
										<Link className="cursor-pointer" size="sm" onPress={() => tabChange("sign-up")}>
											Sign up
										</Link>
									</div>
									<Link size="sm" href='/forgot-password' className="justify-center">
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
								<Button fullWidth color="primary">
									Sign up
								</Button>
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
