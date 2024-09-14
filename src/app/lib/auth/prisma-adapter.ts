import { Adapter } from "next-auth/adapters";
import { prismaClient as prisma } from "../prisma";
import { cookies } from "next/headers";

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user) {
      const cookieStorage = cookies();
      const userIdFromCookies = cookieStorage.get("@dogs-social-login:userId");

      if (!cookieStorage.has("@dogs-social-login:userId")) {
        throw new Error("User ID not found on cookies.");
      }

      if (userIdFromCookies && userIdFromCookies.value) {
        const prismaUser = await prisma.user.update({
          where: {
            id: userIdFromCookies?.value,
          },
          data: {
            email: user.email,
            avatar_url: user.avatar_url,
          },
        });

        cookieStorage.delete("@dogs-social-login:userId");
        return {
          id: prismaUser.id,
          name: prismaUser.name,
          username: prismaUser.username,
          email: prismaUser.email!,
          emailVerified: null,
          avatar_url: prismaUser.avatar_url!,
        };
      }

      throw new Error("Internal Error");
    },

    async getUser(id) {
      console.log("getUser");

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) return null;

      return {
        id: user.id,
        name: user.name!,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      };
    },

    async getUserByEmail(email) {
      console.log("email");
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) return null;

      return {
        id: user.id,
        name: user.name!,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider_account_id: providerAccountId,
            provider: provider,
          },
        },
        include: {
          user: true,
        },
      });

      if (!account) return null;

      const { user } = account;

      return {
        id: user.id,
        name: user.name!,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      };
    },

    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      console.log("Método updateUser da função PrismaAdapter ativado");

      return {
        id: updatedUser.id,
        name: updatedUser.name!,
        username: updatedUser.username,
        email: updatedUser.email!,
        emailVerified: null,
        avatar_url: updatedUser.avatar_url!,
      };
    },

    async deleteUser(userId) {
      await prisma.user.delete({ where: { id: userId } });
    },

    async linkAccount(account) {
      const {
        provider,
        providerAccountId,
        type,
        userId,
        access_token,
        expires_at,
        id_token,
        refresh_token,
        scope,
        session_state,
        token_type,
      } = account;
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider,
          provider_account_id: account.providerAccountId,
          access_token,
          expires_at,
          id_token,
          refresh_token,
          scope,
          session_state,
          token_type,
        },
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          userId: userId,
          expires,
          session_token: sessionToken,
        },
      });

      return {
        sessionToken,
        userId,
        expires,
      };
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: { session_token: sessionToken },
        include: {
          user: true,
        },
      });

      if (!prismaSession) return null;

      const { user, ...session } = prismaSession;

      return {
        user: {
          id: user.id,
          name: user.name!,
          username: user.username,
          email: user.email!,
          emailVerified: null,
          avatar_url: user.avatar_url!,
        },
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: user.id,
        },
      };
    },

    async updateSession({ sessionToken, userId, expires }) {
      const updatedUser = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          userId,
        },
      });

      return {
        sessionToken,
        userId: updatedUser.userId,
        expires: updatedUser.expires,
      };
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({ where: { session_token: sessionToken } });
    },
  };
}
