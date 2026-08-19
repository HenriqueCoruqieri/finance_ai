import { Transaction } from "@/app/generated/prisma/browser"

export type TransactionRow = Omit<Transaction, "amount"> & { amount: number }
