import { auth, clerkClient } from "@clerk/nextjs/server"
import { getCurrencyMonthTransaction } from "../get-currency-month-transactions"

export const canUserAddTransaction = async () => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }
  const client = await clerkClient()
  const user = await client.users.getUser(userId)

  if (user.publicMetadata.subscriptionPlan == "premium") {
    return true
  }
  const currentMonthTransaction = await getCurrencyMonthTransaction()
  if (currentMonthTransaction >= 10) {
    return false
  }
  return true
}
