'use client'
import { useDiscoverProjectStore } from "./storeProvider"
import Project from "./project"
import { Suspense, useEffect } from "react";

export default async function page({ params }: { params: { projectID: string } }) {
    const projectID = params.projectID;
    const fetch = useDiscoverProjectStore((state) => state.fetchElements);
    useEffect(() => {
        fetch(projectID);
    }, [projectID, fetch]);
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Project />
        </Suspense>
    )
}