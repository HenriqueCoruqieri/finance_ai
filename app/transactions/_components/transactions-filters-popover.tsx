"use client"

import { Table } from "@tanstack/react-table"
import { ListFilterIcon } from "lucide-react"

import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover"
import { Separator } from "@/app/_components/ui/separator"
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/app/_constants/transactions"
import { TransactionRow } from "../_types"
import { toggleFilterValue } from "../_lib/toggle-filter-value"
import TransactionsFilterGroup from "./transactions-filter-group"

const FILTER_GROUPS = [
  { columnId: "type", title: "Tipo", options: TRANSACTION_TYPE_OPTIONS },
  {
    columnId: "category",
    title: "Categoria",
    options: TRANSACTION_CATEGORY_OPTIONS,
  },
  {
    columnId: "paymentMethod",
    title: "Método de pagamento",
    options: TRANSACTION_PAYMENT_METHOD_OPTIONS,
  },
]

interface TransactionsFiltersPopoverProps {
  table: Table<TransactionRow>
}

const TransactionsFiltersPopover = ({
  table,
}: TransactionsFiltersPopoverProps) => {
  const activeFiltersCount = table
    .getState()
    .columnFilters.reduce(
      (total, filter) => total + (filter.value as string[]).length,
      0,
    )

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <ListFilterIcon />
        Filtros
        {activeFiltersCount > 0 && (
          <Badge className="ml-1">{activeFiltersCount}</Badge>
        )}
      </PopoverTrigger>

      <PopoverContent align="end" className="max-h-96 w-64 overflow-y-auto">
        {FILTER_GROUPS.map(({ columnId, title, options }, index) => {
          const column = table.getColumn(columnId)
          const selected = (column?.getFilterValue() as string[]) ?? []

          return (
            <div key={columnId}>
              {index > 0 && <Separator className="my-2.5" />}
              <TransactionsFilterGroup
                title={title}
                options={options}
                selected={selected}
                onToggle={(value) =>
                  column?.setFilterValue(toggleFilterValue(selected, value))
                }
              />
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}

export default TransactionsFiltersPopover
