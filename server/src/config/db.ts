import { PrismaClient } from "../../prisma/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

// only load env vars in dev as railway breaks if there's dotenv.config used in prod
if (process.env.NODE_ENV !== 'production') dotenv.config();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });