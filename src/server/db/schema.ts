import { relations, sql } from 'drizzle-orm';
import {
    index,
    int,
    mysqlTableCreator,
    primaryKey,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/mysql-core';

import { UserRole } from '@src/types/user';

export const mysqlTable = mysqlTableCreator((name) => `goods_${name}`);

export const items = mysqlTable(
    'item',
    {
        id: varchar('id', { length: 255 }).notNull().primaryKey(),
        name: varchar('name', { length: 255 }).notNull(),
        brand: varchar('brand', { length: 255 }).notNull(),
        description: text('description').notNull(),
        price: int('price').notNull(),
        image: text('image').notNull(),
        url: text('url').notNull(),
        currency: varchar('currency', { length: 3 }).notNull(),
        createdById: varchar('createdById', { length: 255 }).notNull(),
        createdAt: timestamp('created_at')
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp('updatedAt').onUpdateNow(),
    },
    (item) => ({
        createdByIdIdx: index('createdById_idx').on(item.createdById),
        nameIndex: index('name_idx').on(item.name),
    })
);

export type Item = typeof items.$inferSelect;

export const users = mysqlTable('user', {
    id: varchar('id', { length: 255 }).notNull().primaryKey(),
    name: varchar('name', { length: 255 }),
    role: varchar('role', { length: 32 }).notNull().default(UserRole.USER),
    email: varchar('email', { length: 255 }).notNull(),
    emailVerified: timestamp('emailVerified', {
        mode: 'date',
        fsp: 3,
    }).default(sql`CURRENT_TIMESTAMP(3)`),
    image: varchar('image', { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
}));

export const accounts = mysqlTable(
    'account',
    {
        userId: varchar('userId', { length: 255 }).notNull(),
        type: varchar('type', { length: 255 })
            .$type<'oauth' | 'email' | 'oidc'>()
            .notNull(),
        provider: varchar('provider', { length: 255 }).notNull(),
        providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: int('expires_at'),
        token_type: varchar('token_type', { length: 255 }),
        scope: varchar('scope', { length: 255 }),
        id_token: text('id_token'),
        session_state: varchar('session_state', { length: 255 }),
    },
    (account) => ({
        compoundKey: primaryKey(account.provider, account.providerAccountId),
        userIdIdx: index('userId_idx').on(account.userId),
    })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
    'session',
    {
        sessionToken: varchar('sessionToken', { length: 255 })
            .notNull()
            .primaryKey(),
        userId: varchar('userId', { length: 255 }).notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (session) => ({
        userIdIdx: index('userId_idx').on(session.userId),
    })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
    'verificationToken',
    {
        identifier: varchar('identifier', { length: 255 }).notNull(),
        token: varchar('token', { length: 255 }).notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token),
    })
);
