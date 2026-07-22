"use client"

import { Transaction } from "@/app/generated/prisma/browser"
import { ColumnDef } from "@tanstack/react-table"

import TransactionTypeBadge from "../_components/type-badge"

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },

  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },

  {
    header: "Categoria",
  },

  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
  },

  {
    accessorKey: "date",
    header: "Data",
  },

  {
    accessorKey: "amount",
    header: "Valor",
  },

  {
    accessorKey: "actions",
    header: "",
  },
]
