import { db } from "../_lib/prisma"
import { DataTable } from "../_components/ui/data-tables"
import { transactionColumns } from "./_columns"
import AddTransactionButton from "../_components/add-transaction-button"
import Navbar from "../_components/navbar"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { canUserAddTransaction } from "../_data/can-user-add-transaction"
import TransactionsDataTable from "./_components/transactions-data-table"

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

  const userCanAddTransactions = await canUserAddTransaction()
  return (
    <>
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col space-y-6 p-6">
        <div className="items center flex w-full justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton
            userCanAddTransaction={userCanAddTransactions}
          />
        </div>
        <TransactionsDataTable transactions={rows} />
      </div>
    </>
  )
}

export default TransactionsPage
