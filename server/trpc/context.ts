import { prisma } from "@/server/db";

export const createContext = async () => {
  return {
    prisma,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
