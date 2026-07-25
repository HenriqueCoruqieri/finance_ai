import AddTransactionButton from "@/app/_components/add-transaction-button"
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"
import { ReactNode } from "react"

interface SummaryCardProps {
  icon: ReactNode
  title: string
  amount: number
  size?: "small" | "large"
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        {icon}
        <p
          className={`${size == "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>

      <CardContent className="flex justify-between">
        <p className={`font-bold ${size == "small" ? "text-2xl" : "text-4xl"}`}>
          {Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size == "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  )
}

export default SummaryCard
