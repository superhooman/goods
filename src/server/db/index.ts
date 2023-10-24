import { connect } from '@planetscale/database';
import { drizzle as drizzlePS } from 'drizzle-orm/planetscale-serverless';

import { env } from '@src/env.mjs';

import * as schema from './schema';

export const db = drizzlePS(connect({ url: env.DATABASE_URL }), { schema });

// import mysql from 'mysql2/promise';
// import { drizzle as drizzleMySQL2 } from 'drizzle-orm/mysql2';

// export const db = await (async () => {
//     if (env.NODE_ENV === 'development') {
//         const connection = await mysql.createConnection(env.DATABASE_URL);

//         return drizzleMySQL2(connection, { schema, mode: 'default' });
//     }

//     const connection = connect({
//         url: env.DATABASE_URL,
//     });

//     return drizzlePS(connection, { schema });
// })();
