// https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/nextjs/#configure-amplify-library-for-server-side-usage
// https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/nextjs/#calling-amplify-category-apis-on-the-server-side

import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import config from "@/../amplifyconfiguration.json";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});
