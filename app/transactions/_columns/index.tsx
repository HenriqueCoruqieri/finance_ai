"use client"

import { ColumnDef } from "@tanstack/react-table"

import TransactionTypeBadge from "../_components/type-badge"

import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions"
import EditTransactionButton from "../_components/edit-transaction-button"
import DeleteTransactionButton from "../_components/delete-transaction-button"
import { TransactionRow } from "../_types"

export const transactionColumns: ColumnDef<TransactionRow>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },

  {
    accessorKey: "type",
    header: "Tipo",
    filterFn: "arrIncludesSome",
    enableGlobalFilter: false,
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },

  {
    accessorKey: "category",
    header: "Categoria",
    filterFn: "arrIncludesSome",
    enableGlobalFilter: false,
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },

  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    filterFn: "arrIncludesSome",
    enableGlobalFilter: false,
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },

  {
    accessorKey: "date",
    header: "Data",
    enableGlobalFilter: false,
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },

  {
    accessorKey: "amount",
    header: "Valor",
    enableGlobalFilter: false,
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },

  {
    accessorKey: "actions",
    header: "",
    enableGlobalFilter: false,
    cell: ({ row: { original: transaction } }) => {
      return (
        <div>
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transaction={transaction} />
        </div>
      )
    },
  },
]
