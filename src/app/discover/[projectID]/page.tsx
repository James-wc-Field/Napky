import { ProjectStoreProvider } from "@/project/[projectID]/storeProvider"
import { getProjectData } from "./api"
import Project from "./project"

export default async function page({ params }: { params: { projectID: string } }) {
    const elements = JSON.parse((await getProjectData(params.projectID))?.content ?? "[]")

    return (
        <ProjectStoreProvider>
            <Project elements={elements} />
        </ProjectStoreProvider>
    )
}