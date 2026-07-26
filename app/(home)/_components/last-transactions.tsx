import { Button } from "@/app/_components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { ScrollArea } from "@/app/_components/ui/scroll-area"
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions"
import { Transaction, TransactionType } from "@/app/generated/prisma/client"
import { formatCurrency } from "@/app/utils/currency"
import Image from "next/image"
import Link from "next/link"

interface LastTransactionsProps {
  lastTransactions: Transaction[]
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type == TransactionType.EXPENSE) {
      return "text-danger"
    }
    if (transaction.type == TransactionType.DEPOSIT) {
      return "text-primary"
    }
    return "text-white"
  }

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type == TransactionType.DEPOSIT) {
      return "+"
    }
    return "-"
  }

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex flex-row items-center justify-between p-3">
        <CardTitle className="font-bold">Últimas Movimentações</CardTitle>
        <Button
          variant="outline"
          className="max-w-25 rounded-full font-bold"
          render={<Link href="/transactions" />}
        >
          Ver mais
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/3 p-2">
                <Image
                  src={
                    TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]
                  }
                  height={20}
                  width={20}
                  alt="PIX"
                />
              </div>

              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-muted-foreground text-xs">
                  {new Date(transaction.date).toLocaleDateString("pt-br", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  )
}

export default LastTransactions
