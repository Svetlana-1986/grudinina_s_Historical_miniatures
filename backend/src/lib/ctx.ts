import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAppContext = () => {
  return {
    prisma,
  };
};

export type AppContext = ReturnType<typeof createAppContext>;