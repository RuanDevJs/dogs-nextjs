import { PrismaAdapter } from "@/app/lib/auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export const auth: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            `${process.env.GOOGLE_SCOPE_USER_EMAIL} ${process.env.GOOGLE_SCOPE_USER_PROFILE}`,
        },
      },
      profile: (profile: GoogleProfile) => {
        return {
          id: profile.sub,
          name: "",
          username: "",
          email: profile.email,
          avatar_url: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (
        account &&
        account.scope &&
        !account.scope.includes(
          process.env.GOOGLE_SCOPE_USER_EMAIL!
        )
      ) {
        return "/register/complete-auth?error=error";
      }

      return true;
    },

    async session({ session, user }) {
      return {
        ...session,
        user,
      };
    },
  },
};

const handler = NextAuth(auth);
export { handler as GET, handler as POST };
