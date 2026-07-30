"use client"

import { Button } from "@/app/_components/ui/button"
import { createStripeCheckout } from "../actions/create-checkout"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"

const AcquirePlanButton = () => {
  const { user } = useUser()
  const handleAcquirePlan = async () => {
    const { url } = await createStripeCheckout()
    if (!url) {
      throw new Error("Stripe checkout URL not found")
    }

    window.location.href = url
  }

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium"

  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerencial plano
        </Link>
      </Button>
    )
  }
  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlan}
    >
      Adquirir plano
    </Button>
  )
}

export default AcquirePlanButton
