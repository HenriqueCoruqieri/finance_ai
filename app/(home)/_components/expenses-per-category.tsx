import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Progress } from "@/app/_components/ui/progress"
import { ScrollArea } from "@/app/_components/ui/scroll-area"
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions"
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types"

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[]
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border p-4">
      <CardHeader className="mb-6">
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {expensesPerCategory.map((category) => (
          <div className="space-y-2" key={category.category}>
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[category.category]}
              </p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  )
}

export default ExpensesPerCategory
