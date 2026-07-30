"use client"

import { ArrowDownUpIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import UpsertTransactionDialog from "./upsert-transaction-dialog"

interface AddTransactionButtonProps {
  userCanAddTransaction: boolean
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<span className="inline-flex" />}>
            <Button
              type="button"
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
              className="rounded-full font-bold"
            >
              Adicionar transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              "Você atingiu o limite de transações. Atualize seu plano para possuir transações ilimitadas"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  )
}

export default AddTransactionButton
