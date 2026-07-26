import {
  TransactionCategory,
  TransactionType,
} from "@/app/generated/prisma/enums"

export type TransactionPercentagePerType = {
  [key in TransactionType]: number
}

export interface TotalExpensePerCategory {
  category: TransactionCategory
  totalAmount: number
  percentageOfTotal: number
}
