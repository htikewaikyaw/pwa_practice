/* 
import NextAuth,{ Session,NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from 'next-auth/jwt';

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Name the provider
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Dummy user data
        const users = [
          { id: "1", name: "John Doe", username: "john", password: "password123" },
          { id: "2", name: "Jane Smith", username: "jane", password: "password456" },
        ];
        // Find the user with matching username and password
        const user = users.find(
          (user) => user.username === credentials?.username && user.password === credentials?.password
        );
        if (user) {
          // Return the user object if authentication is successful
          return { id: user.id, name: user.name };
        }
        // Return null if the authentication fails
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }:{token:JWT,user:any}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // async session({ session, token }) {
    //   session.user.id = token.id;
    //   return session;
    // },
    async session({ session, token }) {
      if (token) {
      session.user = {
      id: token.id as string,
      name: token.name as string,
      };
       }
      return session;
       },
      },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 

*/

import type { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/_utils/auth_options';
import { getToken } from 'next-auth/jwt';
import NextAuth from 'next-auth';

const handler = async (req: NextRequest, res: NextResponse) => {
  return await NextAuth(req as any, res as any, authOptions);
};

export { handler as GET, handler as POST };
