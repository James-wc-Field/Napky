import Link from "next/link";
import Image from 'next/image';
import { currentAuthenticatedUser } from "@/lib/auth";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

export async function NavigationBar({ children }: { children: React.ReactNode }) {
  const currentUser = await currentAuthenticatedUser();

  return (
    <>
      <nav className="bg-navbar text-navbar-foreground flex p-2 items-center font-main px-10 h-nav">
        <Link href="/discover" className="flex justify-center items-center ml-2 min-w-fit">
          <Image
            className="min-w-12"
            width={48}
            height={48}
            alt="Happy Squirrel"
            src="/images/icon.png"
          />
          <p className="mx-2 text-xl">
            KorkBo
          </p>
        </Link>
        <div className="flex w-full justify-center mx-5">
          {children}
        </div>
        <ThemeToggle />
      </nav>
    </>
  );
}

function Account({ isSignediIn }: { isSignediIn: boolean }) {
  return (
    <>
      {isSignediIn ?
        <Button variant={"ghost"} className="text-lg " asChild>
          <Link href={"#"}>
            Account
          </Link>
        </Button> :
        <Button variant={"ghost"} className="text-lg " asChild>
          <Link href={"/sign-in"}>
            SignIn
          </Link>
        </Button>
      }
    </>
  )


}