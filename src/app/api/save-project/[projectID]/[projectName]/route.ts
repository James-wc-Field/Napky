import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import config from "@/../amplifyconfiguration.json";
import { updateProject } from "../../../../../graphql/mutations";
import { NextResponse } from "next/server";

/**
 * saves a project to the database
 * @param elements a list of elements from a project to save
 */
export async function POST(
  request: Request,
  { params }: { params: { projectID: string; projectName: string } }
) {
  const client = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: () =>
      generateServerClientUsingCookies({
        config,
        cookies,
      }),
  });
  const body = await request.json();

  await client.graphql({
    query: updateProject,
    variables: {
      input: {
        id: params.projectID,
        userId: "user",
        name: params.projectName,
        description: "description",
        content: JSON.stringify(body),
      },
    },
  });
  
  return NextResponse.json({ success: true });
}
