// From https://docs.amplify.aws/javascript/build-a-backend/server-side-rendering/nextjs/#configure-amplify-library-for-client-side-usage

'use client';

import { Amplify } from 'aws-amplify';
import config from '@src/amplifyconfiguration.json';

Amplify.configure(config, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}