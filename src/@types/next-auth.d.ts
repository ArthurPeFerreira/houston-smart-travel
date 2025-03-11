/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientType } from "@/lib/types/client";
import { UserGroupsType } from "@/lib/types/user";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface UserProps {
    id: string; 
    user: string; 
    name: string; 
    active: boolean; 
    dateJoined: Date;
    lastLogin: Date | null;
    updatedAt: Date;
  }

// Extensão dos tipos no módulo "next-auth"
declare module "next-auth" {
  interface Session {
    user: UserInfo;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string; 
    user: string; 
    name: string; 
    active: boolean; 
    dateJoined: Date;
    lastLogin: Date | null;
    updatedAt: Date;
    iat: number;
    exp: number;
    jti: string;
  }
}