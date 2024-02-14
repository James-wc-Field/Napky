// env.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
    }
  }