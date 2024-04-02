// import { NavDiscover } from "./NavDiscover";
// import { NavDashboard } from "./NavDashboard";
// import { ThemeToggle } from "../ThemeToggle";
// import { Button } from "../ui/button";
import Link from "next/link";
import Image from 'next/image';
import { currentAuthenticatedUser } from "@/lib/auth";
import { AuthUser } from "aws-amplify/auth";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

export async function NavigationBarV2() {
  const currentUser = await currentAuthenticatedUser();

  return (
    <>
      <nav className="bg-navbar text-navbar-foreground flex p-2 items-center font-main px-10 h-nav">
        <a href="/discover" className="flex justify-center items-center ml-2 min-w-fit">
          <Image
            // Need absolute path to icon
            className="min-w-12"
            width={48}
            height={48}
            alt="Happy Squirrel"
            src="/images/icon.png"
          />
          <p className="mx-2 text-xl">
            KorkBo
          </p>
        </a>
        <div className="flex justify-end min-w-fit">
          <Account isSignediIn={currentUser ? true : false} />
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