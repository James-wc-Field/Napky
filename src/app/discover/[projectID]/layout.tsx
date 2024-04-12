import { ReactNode } from "react";
import { DiscoverProjectStoreProvider } from "./storeProvider";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DiscoverProjectStoreProvider>
            {children}
        </DiscoverProjectStoreProvider>
    )

}