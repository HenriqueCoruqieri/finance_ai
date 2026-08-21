"use client"

import { Table } from "@tanstack/react-table"
import { XIcon } from "lucide-react"

import { Button } from "@/app/_components/ui/button"
import { TransactionRow } from "../_types"

interface ClearTransactionsFiltersButtonProps {
  table: Table<TransactionRow>
}

const ClearTransactionsFiltersButton = ({
  table,
}: ClearTransactionsFiltersButtonProps) => {
  const handleClearFiltersClick = () => {
    table.resetColumnFilters()
    table.resetGlobalFilter()
  }

  return (
    <Button variant="ghost" onClick={handleClearFiltersClick}>
      <XIcon />
      Limpar
    </Button>
  )
}

export default ClearTransactionsFiltersButton
