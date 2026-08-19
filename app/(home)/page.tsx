import { auth, clerkClient } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import SummaryCards from "./_components/summary-cards"
import Navbar from "../_components/navbar"
import TimeSelect from "./_components/time-select"
import { isMatch } from "date-fns"
import TransactionsPieChart from "./_components/transactions-pie-chart"
import { getDashboard } from "../_data/get-dashboard"
import ExpensesPerCategory from "./_components/expenses-per-category"
import LastTransactions from "./_components/last-transactions"
import { canUserAddTransaction } from "../_data/can-user-add-transaction"
import AiReportButton from "./_components/ai-report-button"

interface HomeProps {
  searchParams: Promise<{
    month: string
  }>
}
const Home = async ({ searchParams }: HomeProps) => {
  const { month } = await searchParams
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const monthIsInvalid = !month || !isMatch(month, "MM")
  if (monthIsInvalid) {
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0")
    redirect(`?month=${currentMonth}`)
  }

  const dashboard = await getDashboard(month)
  const userCanAddTransactions = await canUserAddTransaction()
  const client = await clerkClient()
  const user = await client.users.getUser(userId)

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={user.publicMetadata.subscriptionPlan == "premium"}
            />
            <TimeSelect />
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr] grid-rows-1 gap-6 overflow-hidden">
          <div className="flex min-h-0 flex-col gap-6 overflow-hidden">
            <SummaryCards
              userCanAddTransaction={userCanAddTransactions}
              month={month}
              {...dashboard}
            />
            <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  )
}

export default Home
