"use client"

import { Button } from "@/app/_components/ui/button"
import { TrashIcon } from "lucide-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { TransactionRow } from "../_columns"
import { useState } from "react"
import { deleteTransaction } from "@/app/actions/delete-transaction"

interface DeleteTransactionButtonProps {
  transaction: TransactionRow
}

const DeleteTransactionButton = ({
  transaction,
}: DeleteTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteTransaction = async () => {
    setIsDeleting(true)
    try {
      await deleteTransaction(transaction.id)
      setDialogIsOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
          />
        }
      >
        <TrashIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir transação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir essa transação? A ação não poderá ser
            desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button variant="ghost">Cancelar</Button>} />
          <Button onClick={handleDeleteTransaction} disabled={isDeleting}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteTransactionButton
