// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      username: string;
      isVerified: boolean;
      isAcceptingMessages: boolean;
      displayName?: string;
      avatarUrl?: string;
      createdAt?: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    displayName?: string;
    avatarUrl?: string;
    createdAt?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    displayName?: string;
    avatarUrl?: string;
    createdAt?: string;
  }
}






