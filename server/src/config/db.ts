import { PrismaClient } from "../../prisma/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
dotenv.config();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

// This is the single instance used by the whole app
export const prisma = new PrismaClient({ adapter });