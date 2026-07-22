import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client"

const createPrismaClient = () =>
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  })

declare global {
  var cachedPrisma: PrismaClient | undefined
}

export const db =
  process.env.NODE_ENV === "production"
    ? createPrismaClient()
    : (globalThis.cachedPrisma ??= createPrismaClient())
