"use client"

import { NumericFormat, type NumericFormatProps } from "react-number-format"

import { Input } from "./ui/input"

type MoneyInputProps = Omit<NumericFormatProps, "value" | "onValueChange"> & {
  value?: string
  onValueChange?: (value: string) => void
}

const MoneyInput = ({ onValueChange, ...props }: MoneyInputProps) => {
  return (
    <NumericFormat
      customInput={Input}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      prefix="R$ "
      onValueChange={(values) => onValueChange?.(values.value)}
      {...props}
    />
  )
}

export default MoneyInput
