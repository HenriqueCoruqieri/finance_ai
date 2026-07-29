"use client"

import { Button } from "@/app/_components/ui/button"
import { createStripeCheckout } from "../actions/create-checkout"

const AcquirePlanButton = () => {
  const handleAcquirePlan = async () => {
    const { url } = await createStripeCheckout()
    if (!url) {
      throw new Error("Stripe checkout URL not found")
    }

    window.location.href = url
  }

  return (
    <div className="">
      <Button
        className="w-full rounded-full font-bold"
        onClick={handleAcquirePlan}
      >
        Adiquirir plano
      </Button>
    </div>
  )
}

export default AcquirePlanButton
