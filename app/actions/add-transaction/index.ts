"use server"

import { db } from "@/app/_lib/prisma"
import {
  TransactionType,
  TransactionCategory,
  PaymentMethod,
} from "@/app/generated/prisma/client"
import { auth } from "@clerk/nextjs/server"
import { addTransactionSchema } from "./schema"
import { revalidatePath } from "next/cache"

interface AddTransactionParams {
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: PaymentMethod
  date: Date
}

export const addTransaction = async (params: AddTransactionParams) => {
  addTransactionSchema.parse(params)
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }

  await db.transaction.create({
    data: { ...params, userId },
  })

  revalidatePath("/transactions")
}
