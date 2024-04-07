"use server"
import { cookieBasedClient } from "@/lib/amplifyServerUtils";
import { getProject } from "@src/graphql/queries";

/**
 * gets project data based on the projectID
 * @param projectID the id of the project to get
 */
export async function getProjectData(projectID: string) {
    const data = (await cookieBasedClient.graphql({
        query: getProject,
        variables: { id: projectID }
    })).data.getProject;
    return data;
}