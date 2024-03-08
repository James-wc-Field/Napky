import XIcon from "./XIcon";
import { Input } from "./input";


export default function LoginCard() {
    return (
    <>
        <div className="max-w-[500px] min-w-[300px] flex-col p-8 border-4 rounded-[2rem] relative">
            <div className="absolute right-[-1em] top-[-1em] overflow-clip border-4 rounded-full p-2 bg-green-500">
                <XIcon />
            </div>
            <p className="mb-8 text-2xl font-bold">Welcome to Napky</p>
            <div className="flex-col mb-4">
                <Input type="email" placeholder="email" className="mb-4"></Input>
                <div className="flex-col">
                    <Input type="password" placeholder="password" className="mb-2"></Input>
                    <p className="text-xs">Forgot your password?</p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="min-w-[50%] text-center mb-2 p-2 rounded-2xl bg-green-500">Log in</div>
                <p className="w-fit mb-2 self-center">Or</p>
                <div className="min-w-[50%] text-center mb-2 p-2 rounded-2xl bg-green-500">Create Account</div>
            </div>
        </div>
    </>
    )
}