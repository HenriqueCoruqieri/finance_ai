import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"
import SummaryCard from "./summary-card"
import { db } from "@/app/_lib/prisma"

interface SumaryCardProps {
  month: string
}

const SummaryCards = async ({ month }: SumaryCardProps) => {
  const now = new Date()
  const year = now.getFullYear()
  const selectedMonth = Number(month) || now.getMonth() + 1

  const where = {
    date: {
      gte: new Date(year, selectedMonth - 1, 1),
      lt: new Date(year, selectedMonth, 1),
    },
  }

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  )

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTIMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  )

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  )

  const balance = depositsTotal - investmentsTotal - expensesTotal

  return (
    <div className="space-y-6">
      {/*PRIMEIRO CARD*/}
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      {/*OUTROS CARDS*/}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />

        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />

        <SummaryCard
          icon={<TrendingUpDownIcon size={16} className="text-danger" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  )
}

export default SummaryCards
