"use client"

import { Card, CardContent } from "@/app/_components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart"
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types"
import { TransactionType } from "@/app/generated/prisma/enums"
import { PiggyBank, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Pie, PieChart } from "recharts"
import PercentageItem from "./percentage-item"

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },

  [TransactionType.DEPOSIT]: {
    label: "Investido",
    color: "#55B02E",
  },

  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
}

const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },

    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },

    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
  ]

  return (
    <Card className="flex flex-col border p-6">
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />

          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-danger" />}
            title="Despesas"
            value={typesPercentage[TransactionType.EXPENSE]}
          />

          <PercentageItem
            icon={<PiggyBank size={16} />}
            title="Investimento"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionsPieChart
