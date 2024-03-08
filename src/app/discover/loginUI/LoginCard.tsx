import { Input } from "./input";


export default function LoginCard() {
    return (
    <>
        <div className="w-1/3 min-w-[300px] flex-col p-8 border rounded-[2rem]">
            <p className="mb-8 text-2xl">Welcome to Napky</p>
            <div className="flex-col mb-4">
                <Input type="email" placeholder="email" className="mb-2"></Input>
                <div className="flex-col">
                    <Input type="password" placeholder="password" className="m-2"></Input>
                    <p className="mt-2 text-xs">Forgot your password?</p>
                </div>
            </div>
            <div className="flex-col items-center px-6">
                <div className="mb-2 p-2 border rounded-2xl">Log in</div>
                <p className="w-fit">Or</p>
                <div className="p-2 border rounded-2xl">Create Account</div>
            </div>
        </div>
    </>
    )
}