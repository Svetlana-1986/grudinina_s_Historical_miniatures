import { PrismaClient } from '@prisma/client';

import type { Request, Response } from 'express';

// const prisma = new PrismaClient();

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});


export const createAppContext = ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) => {
  return {
    prisma,
    req,
    res,
  };
};

export type AppContext = ReturnType<typeof createAppContext>;
