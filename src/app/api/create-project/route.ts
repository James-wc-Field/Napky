import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import config from "@/../amplifyconfiguration.json";
import { NextResponse } from "next/server";
import { createProject } from "../../../graphql/mutations";

/**
 * Create a new project
 * @returns the id of the new project
 */
export async function GET(Request: Request) {
  const client = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: () =>
      generateServerClientUsingCookies({
        config,
        cookies,
      }),
  });

  const project = (
    await client.graphql({
      query: createProject,
      variables: {
        input: {
          userId: "user",
          name: "untitled",
          description: "description",
          content: "",
        },
      },
    })
  ).data.createProject;

  return NextResponse.json(project);
}
