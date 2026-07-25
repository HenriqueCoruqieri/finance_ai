import { auth } from "@clerk/nextjs/server"
import Navbar from "../_components/navbard"
import { redirect } from "next/navigation"

const SubscriptionPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    redirect("/")
  }

  return <Navbar />
}

export default SubscriptionPage
