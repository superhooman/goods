import type { DefaultSession } from 'next-auth';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export type User = {
    id: string;
    role: UserRole;
} & DefaultSession['user'];
