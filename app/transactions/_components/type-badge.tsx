import { Badge } from "@/app/_components/ui/badge"
import { Transaction, TransactionType } from "@/app/generated/prisma/browser"
import { CircleIcon } from "lucide-react"

interface TransactionTypeBadgeProps {
  transaction: Pick<Transaction, "type">
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type == TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-primary/10 text-primary hover:bg-muted font-bold">
        <CircleIcon className="fill-primary mr-2" size={10} />
        Depósito
      </Badge>
    )
  }

  if (transaction.type == TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger/10 text-danger font-bold">
        <CircleIcon className="fill-danger mr-2" size={10} />
        Despesa
      </Badge>
    )
  }

  return (
    <Badge className="hover:bg-muted bg-white/10 font-bold text-white">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  )
}

export default TransactionTypeBadge
