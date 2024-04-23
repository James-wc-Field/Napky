import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ConfigureAmplifyClientSide from "./_lib/ConfigureAmplifyClientSIde";
import { cn } from "@/_lib/utils";
import FeedbackToast from "./components/FeedbackToast";
import { NavigationBar } from "./components/NavigationBar";
import { ProjectStoreProvider } from "./project/storeProvider";

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
            <main>
              <div className="flex flex-col min-h-screen max-h-screen min-w-full">
                <main className="flex grow">
                  <div className="w-full mx-auto overflow-hidden">
                    <NavigationBar>
                    </NavigationBar>
                    <ProjectStoreProvider>
                      {children}
                    </ProjectStoreProvider>
                  </div>
                </main>
              </div>
            </main>
          </div>
          <FeedbackToast />
        </Providers>
      </body>
    </html>
  );
}
