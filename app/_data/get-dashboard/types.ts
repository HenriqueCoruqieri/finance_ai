import { TransactionType } from "@/app/generated/prisma/enums"

export type TransactionPercentagePerType = {
  [key in TransactionType]: number
}
