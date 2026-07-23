"use client"

import { ArrowDownUpIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import AddTransactionDialog from "./upsert-transaction-dialog"

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar transação
        <ArrowDownUpIcon />
      </Button>
      <AddTransactionDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  )
}

export default AddTransactionButton
