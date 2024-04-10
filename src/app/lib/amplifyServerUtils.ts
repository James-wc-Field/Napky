/**
 * These functions enable you to use Amplify APIs from a server-side runtime.
 * Each of these functions is used in different use cases, documented below.
 *
 * See the following links for more info:
 * - https://docs.amplify.aws/javascript/build-a-backend/server-side-rendering/nextjs/
 * - https://docs.amplify.aws/javascript/build-a-backend/graphqlapi/connect-from-server-runtime/
 */

import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { generateServerClientUsingReqRes } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import amplifyConfig from "../../../src/amplifyconfiguration.json";

/**
 * Used for providing necessary server context to Amplify's Auth, REST APIs, and Storage category APIs.
 * 
 * More info:
 * - https://docs.amplify.aws/javascript/build-a-backend/server-side-rendering/nextjs/#calling-amplify-category-apis-on-the-server-side
 */
export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfig,
});

/**
 * A client for calling the GraphQL API on the server side using **cookies**.
 * 
 * Use cases:
 * - React Server Component
 * - Next.js Server Action
 * - Next.js Route Handler
 * 
 * More info: https://docs.amplify.aws/javascript/build-a-backend/graphqlapi/connect-from-server-runtime/
 */
export const cookieBasedClient = generateServerClientUsingCookies({
  config: amplifyConfig,
  cookies,
});

/**
 * A client for calling the GraphQL API on the server side using **NextRequest/NextResponse**.
 * 
 * Use cases:
 * - Next.js Middleware
 * 
 * More info: https://docs.amplify.aws/javascript/build-a-backend/graphqlapi/connect-from-server-runtime/
 */
export const reqResBasedClient = generateServerClientUsingReqRes({
  config: amplifyConfig,
});
