import { NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs/server"
import Stripe from "stripe"

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.error()
  }
  const text = await request.text()

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error()
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-06-24.dahlia",
  })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }

  switch (event.type) {
    case "invoice.paid": {
      {
        const { customer } = event.data.object
        const subscriptionDetails =
          event.data.object.parent?.subscription_details
        const clerkUserId = subscriptionDetails?.metadata?.clerk_user_id

        if (!clerkUserId) {
          return NextResponse.error()
        }

        const client = await clerkClient()
        await client.users.updateUser(clerkUserId, {
          privateMetadata: {
            stripeCustomerId: customer,
            stripeSubscriptionId: subscriptionDetails?.subscription,
          },
          publicMetadata: {
            subscriptionPlan: "premium",
          },
        })
        break
      }
    }

    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      )
      const clerkUserId = subscription.metadata.clerk_user_id
      if (!clerkUserId) {
        return NextResponse.error()
      }

      ;(await clerkClient()).users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      })
    }
  }

  return NextResponse.json({ received: true })
}
