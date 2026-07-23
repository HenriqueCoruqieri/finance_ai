"use client"

import { Calendar as CalendarIcon } from "lucide-react"
import { ptBR } from "react-day-picker/locale"

import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { TRANSACTION_DATE_EMPTY_STATE_LABEL } from "@/app/_constants/transactions"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const isDateReady = value instanceof Date && !isNaN(value.getTime())

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!isDateReady}
            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
          />
        }
      >
        <CalendarIcon />
        {isDateReady ? (
          value.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        ) : (
          <span>{TRANSACTION_DATE_EMPTY_STATE_LABEL}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={ptBR}
          selected={isDateReady ? value : undefined}
          onSelect={(date) => onChange?.(date)}
        />
      </PopoverContent>
    </Popover>
  )
}
