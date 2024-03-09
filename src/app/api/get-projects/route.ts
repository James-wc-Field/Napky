import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import config from "@/../amplifyconfiguration.json";
import { listProjects } from "../../../graphql/queries";
import { NextResponse } from "next/server";

/**
 * Get all projects
 * @returns an array of all projects
 */
export async function GET(request: Request) {
  const client = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: () =>
      generateServerClientUsingCookies({
        config,
        cookies,
      }),
  });

  const projects = (
    await client.graphql({
      query: listProjects,
    })
  ).data.listProjects.items;

  return NextResponse.json(projects);
}
