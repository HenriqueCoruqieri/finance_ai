"use client"

import { DataTable } from "@/app/_components/ui/data-tables"
import { TransactionRow } from "../_types"
import { transactionColumns } from "../_columns"
import { transactionsGlobalFilter } from "../_lib/transactions-global-filter"
import TransactionsToolbar from "./transactions-toolbar"

interface TransactionsDataTableProps {
  transactions: TransactionRow[]
}

const TransactionsDataTable = ({
  transactions,
}: TransactionsDataTableProps) => {
  return (
    <DataTable
      columns={transactionColumns}
      data={transactions}
      globalFilterFn={transactionsGlobalFilter}
      emptyMessage="Nenhuma transação encontrada."
      toolbar={(table) => <TransactionsToolbar table={table} />}
    />
  )
}

export default TransactionsDataTable
