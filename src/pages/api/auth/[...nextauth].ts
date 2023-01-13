import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { prisma } from "../../../lib/prisma";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: `Credentials`,
      credentials: {
        email: {
          label: `email`,
          type: `email`,
          placeholder: `...@mail.com`,
        },
        password: { label: `password`, type: `password` },
      },
      type: `credentials`,
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials;

        const res = await prisma.user.findFirst({
          where: {
            email,
            password,
          },
        });

        if (!res) {
          throw new Error(`No user found`);
        }

        return res;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      const user = await prisma.user.findUnique({
        where: {
          id: +token.sub,
        },
      });

      const newToken = {
        ...token,
        role: user?.role,
      };

      return Promise.resolve(newToken);
    },
    session: async ({ session, token }): Promise<any> => {
      const user = await prisma.user.findUnique({
        where: {
          id: +token.sub,
        },
      });

      const newSession = {
        user: {
          ...session.user,
          id: token.sub,
          role: user?.role,
        },
      };

      return Promise.resolve(newSession);
    },
  },
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: `jwt`,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
