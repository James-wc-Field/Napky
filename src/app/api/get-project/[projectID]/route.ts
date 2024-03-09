import { getProject } from "../../../../graphql/queries";
import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import config from "@/../amplifyconfiguration.json";

/**
 * gets project data based on the projectID
 * @param projectID the id of the project to get
 */
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      userID: string;
      projectID: string;
    };
  }
) {
  const client = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: () =>
      generateServerClientUsingCookies({
        config,
        cookies,
      }),
  });

  const { projectID } = params;
  const project = (
    await client.graphql({
      query: getProject,
      variables: { id: projectID },
    })
  ).data.getProject;

  return NextResponse.json(project);
}
