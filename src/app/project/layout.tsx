import React, { ReactNode } from "react";
import { ProjectStoreProvider } from "./[projectID]/storeProvider";

function Layout({ children }: { children: ReactNode }) {
  return (
    <ProjectStoreProvider>
      <div className="flex flex-col min-h-screen max-h-screen min-w-full">
        <main className="flex grow">{children}</main>
      </div>
    </ProjectStoreProvider>
  );
}

export default Layout;
