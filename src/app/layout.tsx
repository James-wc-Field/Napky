import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ConfigureAmplify from "./components/configAmplify";
import { cn } from "@/lib/utils";
import { NavigationBar } from "@/components/navigation/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // https://github.com/pacocoursey/next-themes#html--css
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen", inter.className)}>
        <Providers>
          <ConfigureAmplify />
          <div className="relative flex min-h-screen flex-col">
            <NavigationBar></NavigationBar>
            <main className="flex-1">{children}</main>
            {/* Site Footer */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
