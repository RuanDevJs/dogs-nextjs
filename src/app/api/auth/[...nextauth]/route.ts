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
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
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
          "https://www.googleapis.com/auth/userinfo.email"
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
