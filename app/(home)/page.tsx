import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import SummaryCards from "./_components/summary-cards"
import Navbar from "../_components/navbar"
import TimeSelect from "./_components/time-select"
import { isMatch } from "date-fns"

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
    redirect("?month=01")
  }

  return (
    <>
      <Navbar />

      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <SummaryCards month={month} />
      </div>
    </>
  )
}

export default Home
