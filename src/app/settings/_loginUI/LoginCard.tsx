import XIcon from "./XIcon";
import { Input } from "@components/ui/input";


export default function SettingsCard() {
    return (
    <>
    <div className="flex h-screen justify-center items-center">

        <div className="max-w-[500px] min-w-[300px] flex-col p-8 border-4 rounded-[2rem] relative">
            {/* <div className="absolute right-[-1em] top-[-1em] overflow-clip border-4 rounded-full p-2 bg-green-500">
                <XIcon />
            </div> */}
            <p className="mb-8 text-2xl font-bold">Settings</p>
            <div className="flex-col mb-4">
                <Input type="text" placeholder="username" className="mb-4"></Input>
                <Input type="email" placeholder="email" className="mb-4"></Input>
                <Input type="password" placeholder="password" className="mb-4"></Input>
            </div>
            <div className="flex flex-col items-center">
                <div className="min-w-[50%] text-center mb-2 p-2 rounded-2xl bg-green-500">Save</div>
            </div>
        </div>
    </div>
    </>
    )
}