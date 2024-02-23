import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from "next-auth/providers/github"
import EmailProvider from 'next-auth/providers/nodemailer';
import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { DynamoDBAdapter } from "@auth/dynamodb-adapter"

//TODO These can be undocumented when adding email
// const config: DynamoDBClientConfig = {
//   credentials: {
//     accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY as string,
//     secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY as string,
//   },
//   region: process.env.NEXT_AUTH_AWS_REGION,
// };

// const client = DynamoDBDocument.from(new DynamoDB(config), {
//   marshallOptions: {
//     convertEmptyValues: true,
//     removeUndefinedValues: true,
//     convertClassInstanceToMap: true,
//   },
// })

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
      // adapter: DynamoDBAdapter( // TODO this can be uncommented when email added
      //   client
      // ),
      pages: {
        signIn: '/auth',
        signOut: '/auth',
      },
    });
