"use server"

import { auth } from "@clerk/nextjs/server"
import Stripe from "stripe"

export const createStripeCheckout = async () => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found")
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-06-24.dahlia",
  })

  const appUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.APP_URL

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: appUrl,
    cancel_url: appUrl,
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  })

  return { url: session.url }
}
