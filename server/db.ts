import { PrismaClient } from '@/app/generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  var __prisma: InstanceType<typeof PrismaClient> | undefined;
  var __pgPool: Pool | undefined;
}

const pool = global.__pgPool ?? new Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== 'production') global.__pgPool = pool;

const adapter = new PrismaPg(pool);

export const prisma = global.__prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') global.__prisma = prisma;
