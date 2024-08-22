import NextAuth from "next-auth";
import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string; // Include role here
    } & NextAuthUser;
  }

  interface User {
    id: string;
    email: string;
    role: string; // Include role here
  }
}
