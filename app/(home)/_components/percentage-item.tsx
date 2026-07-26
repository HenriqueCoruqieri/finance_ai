import { ReactNode } from "react"

interface PercentageItemProps {
  icon: ReactNode
  value: number
  title: string
}

const PercentageItem = ({ icon, value, title }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-muted-foreground text-sm">{title}</p>
      </div>
      {value}
    </div>
  )
}

export default PercentageItem
