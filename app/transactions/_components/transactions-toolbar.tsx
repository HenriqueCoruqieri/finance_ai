"use client"

import { Table } from "@tanstack/react-table"

import { TransactionRow } from "../_types"
import ClearTransactionsFiltersButton from "./clear-transactions-filters-button"
import TransactionsFiltersPopover from "./transactions-filters-popover"
import TransactionsSearchInput from "./transactions-search-input"

interface TransactionsToolbarProps {
  table: Table<TransactionRow>
}

const TransactionsToolbar = ({ table }: TransactionsToolbarProps) => {
  const globalFilter = (table.getState().globalFilter as string) ?? ""
  const hasActiveFilters =
    table.getState().columnFilters.length > 0 || globalFilter.length > 0

  return (
    <div className="flex items-center gap-2">
      <TransactionsSearchInput
        value={globalFilter}
        onChange={table.setGlobalFilter}
      />

      <TransactionsFiltersPopover table={table} />

      {hasActiveFilters && <ClearTransactionsFiltersButton table={table} />}
    </div>
  )
}

export default TransactionsToolbar
