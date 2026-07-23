"use client"

import { ArrowDownUpIcon } from "lucide-react"
import { Button } from "./ui/button"
import MoneyInput from "./money-input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { z } from "zod"
import {
  TransactionCategory,
  TransactionType,
  PaymentMethod,
} from "../generated/prisma/enums"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "../_constants/transactions"
import { DatePicker } from "./ui/date-picker"
import { addTransaction } from "../actions/add-transaction"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  amount: z
    .number({
      error: "O valor é obrigatório",
    })
    .positive({
      message: "O valor deve ser positivo",
    }),
  type: z.nativeEnum(TransactionType, {
    error: "O tipo é obrigatório.",
  }),
  category: z.nativeEnum(TransactionCategory, {
    error: "A categoria é obrigatória.",
  }),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    error: "O metodo de pagamento é obrigatório",
  }),
  date: z.date({
    error: "A data é obrigatória",
  }),
})

type FormSchema = z.infer<typeof formSchema>

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: TransactionCategory.OTHER,
      date: undefined,
      name: "",
      paymentMethod: PaymentMethod.CASH,
      type: TransactionType.EXPENSE,
    },
  })

  const onSubmit = async (data: FormSchema) => {
    try {
      await addTransaction(data)
      setDialogIsOpen(false)
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={(open) => {
        setDialogIsOpen(open)
        if (!open) {
          reset()
        }
      }}
    >
      <DialogTrigger render={<Button className="rounded-full" />}>
        Adicionar transação
        <ArrowDownUpIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <form id="add-transaction-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                id="name"
                placeholder="Ex: Supermercado"
                {...register("name")}
              />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field data-invalid={!!errors.amount}>
              <FieldLabel htmlFor="amount">Valor</FieldLabel>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <MoneyInput
                    id="amount"
                    placeholder="Digite o valor"
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                  />
                )}
              />
              <FieldError errors={[errors.amount]} />
            </Field>

            <Field data-invalid={!!errors.type}>
              <FieldLabel htmlFor="type">Tipo</FieldLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="type" className="w-full">
                      <SelectValue>
                        {(value: TransactionType) =>
                          TRANSACTION_TYPE_OPTIONS.find(
                            (option) => option.value === value,
                          )?.label
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.type]} />
            </Field>

            <Field data-invalid={!!errors.category}>
              <FieldLabel htmlFor="category">Categoria</FieldLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue>
                        {(value: TransactionCategory) =>
                          TRANSACTION_CATEGORY_OPTIONS.find(
                            (option) => option.value === value,
                          )?.label
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.category]} />
            </Field>

            <Field data-invalid={!!errors.paymentMethod}>
              <FieldLabel htmlFor="paymentMethod">
                Método de pagamento
              </FieldLabel>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="paymentMethod" className="w-full">
                      <SelectValue>
                        {(value: PaymentMethod) =>
                          TRANSACTION_PAYMENT_METHOD_OPTIONS.find(
                            (option) => option.value === value,
                          )?.label
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.paymentMethod]} />
            </Field>

            <Field data-invalid={!!errors.date}>
              <FieldLabel htmlFor="date">Data</FieldLabel>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
              <FieldError errors={[errors.date]} />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button type="submit" form="add-transaction-form">
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddTransactionButton
