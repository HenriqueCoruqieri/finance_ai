import { Input } from "@/app/_components/ui/input"
import { SearchIcon } from "lucide-react"

interface TransactionsSearchInputProps {
  value: string
  onChange: (value: string) => void
}

const TransactionsSearchInput = ({
  value,
  onChange,
}: TransactionsSearchInputProps) => {
  return (
    <div className="maw-w-80 relative w-full">
      <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Pesquisar transação..."
        className="pl-8"
      />
    </div>
  )
}

export default TransactionsSearchInput
