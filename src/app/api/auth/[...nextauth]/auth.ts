import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from "next-auth/providers/github"
import EmailProvider from 'next-auth/providers/nodemailer';

// import Auth from "@auth/core"
// import { default as GoogleAuth } from "@auth/core/providers/google"

export const {
  handlers,
  auth,
} = NextAuth({
    providers: [
        Google,
        GitHub,
      //   EmailProvider({
      //     server: {
      //       host: process.env.SMTP_HOST,
      //       port: process.env.SMTP_PORT,
      //       auth: {
      //         user: process.env.SMTP_USER,
      //         pass: process.env.SMTP_PASSWORD,
      //       },
      //     },
      //     from: process.env.SMTP_FROM,
      //   }),
      ],
      // adapter: MongoDBAdapter(mongoClientPromise, {
      //   databaseName: process.env.ENVIRONMENT,
      // }),
      pages: {
        signIn: '/auth',
        signOut: '/auth',
      },
    });

// const request = new Request(origin)
// const response = await Auth(request, {
//   providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
// })

// export default NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// })
    
