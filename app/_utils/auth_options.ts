import { Session } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { JWT } from 'next-auth/jwt';
const maxAge = 60 * 60; //1hour

export const authOptions: NextAuthOptions = {
  // CredentialsProviderの場合 adapter は使用できない模様。
  //adapter: PrismaAdapter(prisma),
  theme: {
    colorScheme: 'light',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Email',
        },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      authorize: async (credentials, req) => {
        const url = process.env.LOGIN_API_LINK as string;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
          cache: 'no-store',
        });
        const result = await response.json();

        if (result.message === 'success') {
          return result.data;
        }
        return null;
      },
    }),
  ],
  session: {
    maxAge: maxAge,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      // 最初のサインイン
      if (user) {
        return {
          ...token,
          name: user.username,
          email: user.email,
          // employeeId: user.employeeId,
          // masterUserGroup: user.masterUserGroup,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // session.user.id = token.sub;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
    // redirect url for multi domain usage
    async redirect({ url, baseUrl }) {
      // console.log("url",new Date().toISOString(),url),
      // console.log("baseUrl",new Date().toISOString(),baseUrl)
      if (url.startsWith('/')) return url;
      return url;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  // サインイン・サインアウトで飛ぶカスタムログインページを指定
  // pages: {
  //   signIn: '/auth/signin',
  // },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
};
