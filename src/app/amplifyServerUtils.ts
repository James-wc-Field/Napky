import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import config from '@/../amplifyconfiguration.json';
import { cookies } from 'next/headers';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';

export const { runWithAmplifyServerContext } = createServerRunner({
  config
});

export const cookieClient = generateServerClientUsingCookies({config: config, cookies})