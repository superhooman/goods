import type { UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

export type User = {
    id: string;
    role: UserRole;
} & DefaultSession["user"];
