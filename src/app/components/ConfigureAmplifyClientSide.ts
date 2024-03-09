// https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/nextjs/#configure-amplify-library-for-client-side-usage

"use client";

import { Amplify } from "aws-amplify";
import config from "@/../amplifyconfiguration.json";

Amplify.configure(config, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
