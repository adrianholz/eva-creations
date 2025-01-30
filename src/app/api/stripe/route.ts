// Write an endpoint that creates a new post in the database.

import { verifyAuth } from "@/middleware/apiAuth";
import { NextResponse } from "next/server";

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET() {
  try {

    const authResult = await verifyAuth();
    
    if (!authResult.isAuthenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    console.log('authResult', authResult);

    const { userInfo } = authResult;

    // Create stripe customer if it doesn't exist

    const customers = await stripe.customers.list({
      email: userInfo?.email
    });

    if (customers.data.length === 0) {
      return NextResponse.json({ error: "You are not subscribed" }, { status: 400 });
    }

    // Check if the user is already subscribed

    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ error: "You are not subscribed" }, { status: 400 });
    }

    return NextResponse.json({ subscription: {
      status: subscriptions.data[0].status,
      price: subscriptions.data[0].items.data[0].price.unit_amount
    } });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "An error ocurred" }, { status: 500 });
  }
}

export async function POST() {
  try {

    const authResult = await verifyAuth();

    if (!authResult.isAuthenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    console.log('authResult', authResult);

    const { userInfo } = authResult;

    // Create stripe customer if it doesn't exist

    let customer = null;

    const customersRes = await stripe.customers.list({
      email: userInfo?.email
    });

    if (customersRes.data.length === 0) {
      customer = await stripe.customers.create({
        email: userInfo?.email,
        name: `${userInfo?.firstName} ${userInfo?.lastName}`,
        metadata: {
          auth0_user_id: userInfo?.id
        }
      });
    } else {
      customer = customersRes.data[0];
    }

    // Check if the user is already subscribed

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
    });

    if (subscriptions.data.length > 0) {
      return NextResponse.json({ error: "You are already subscribed" }, { status: 400 });
    }

    // Create a stripe subscription

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE as string,
          quantity: 1,
        },
      ],
      customer: customer.id,
      success_url: `${process.env.AUTH0_BASE_URL}dashboard`,
      cancel_url: `${process.env.AUTH0_BASE_URL}dashboard`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "An error ocurred" }, { status: 500 });
  }
}