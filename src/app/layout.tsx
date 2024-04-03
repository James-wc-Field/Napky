import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ConfigureAmplifyClientSide from "./lib/ConfigureAmplifyClientSIde";
import { cn } from "@/lib/utils";
import { NavigationBar } from "@/components/NavigationBar";
import FeedbackToast from "./components/FeedbackToast";
import { Button } from "./components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Korkbo",
  description: "A project building and sharing app",
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
          <ConfigureAmplifyClientSide />
          <div> {/* className="h-screen overflow-hidden"> */}
            <main>{children}</main>
            {/* Site Footer */}
          </div>
          <FeedbackToast />
        </Providers>
      </body>
    </html>
  );
}
