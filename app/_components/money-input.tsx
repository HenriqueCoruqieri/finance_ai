"use client"

import { NumericFormat, type NumericFormatProps } from "react-number-format"

import { Input } from "./ui/input"

type MoneyInputProps = NumericFormatProps

const MoneyInput = (props: MoneyInputProps) => {
  return (
    <NumericFormat
      customInput={Input}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      prefix="R$ "

      {...props}
    />
  )
}

export default MoneyInput
