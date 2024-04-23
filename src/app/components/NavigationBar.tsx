import Image from 'next/image';
import { ThemeToggle } from "./ThemeToggle";

export async function NavigationBar({ children }: { children?: React.ReactNode }) {

  return (
    <>
      <nav className="bg-navbar text-navbar-foreground flex p-2 items-center font-main px-10 h-nav">
        <Image
          // Need absolute path to icon
          className="min-w-12"
          width={48}
          height={48}
          alt="App Icon"
          src="/images/Korkbo.png"
        />
        <p className="mx-2 text-xl">
          KorkBo
        </p>
        <div className="flex w-full justify-center mx-5">
          {children}
        </div>
        <ThemeToggle />
      </nav>
    </>
  );
}