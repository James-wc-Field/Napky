import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen min-w-full">
      <main className="flex grow">{children}</main>
    </div>
  );
}

export default Layout;
