import { db } from "../_lib/prisma"
import { DataTable } from "../_components/ui/data-tables"
import { transactionColumns } from "./_columns"
import AddTransactionButton from "../_components/add-transaction-button"
import Navbar from "../_components/navbard"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const TransactionsPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  })

  const rows = transactions.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toNumber(),
  }))

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="items center flex w-full justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionColumns} data={rows} />
      </div>
    </>
  )
}

export default TransactionsPage
