import {
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "@/app/generated/prisma/enums"
import z from "zod"

export const addTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(PaymentMethod),
  date: z.date(),
})
