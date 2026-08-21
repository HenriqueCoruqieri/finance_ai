import { FilterFn } from "@tanstack/react-table"
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
  TRANSACTION_TYPE_LABELS,
} from "@/app/_constants/transactions"
import { TransactionRow } from "../_types"

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()

const buildSearchableText = (transaction: TransactionRow) =>
  normalize(
    [
      transaction.name,
      TRANSACTION_TYPE_LABELS[transaction.type],
      TRANSACTION_CATEGORY_LABELS[transaction.category],
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
    ].join(" "),
  )

export const transactionsGlobalFilter: FilterFn<TransactionRow> = (
  row,
  _columnId,
  filterValue: string,
) => buildSearchableText(row.original).includes(normalize(filterValue))
