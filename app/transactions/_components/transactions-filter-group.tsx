import { Checkbox } from "@/app/_components/ui/checkbox"
import { Label } from "@/app/_components/ui/label"
import { useId } from "react"

interface FilterOption {
  value: string
  label: string
}

interface TransactionsFilterGroupProps {
  title: string
  options: FilterOption[]
  selected: string[]
  onToggle: (value: string) => void
}

const TransactionsFilterGroup = ({
  title,
  options,
  selected,
  onToggle,
}: TransactionsFilterGroupProps) => {
  const groupId = useId()

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-xs font-medium">{title}</p>

      <div className="space-y-1.5">
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`

          return (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={optionId}
                checked={selected.includes(option.value)}
                onCheckedChange={() => onToggle(option.value)}
              />
              <Label htmlFor={optionId} className="text-sm font-normal">
                {option.label}
              </Label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TransactionsFilterGroup
