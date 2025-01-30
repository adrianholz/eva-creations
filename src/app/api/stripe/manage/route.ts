// Write an endpoint that creates a new post in the database.

import { verifyAuth } from "@/middleware/apiAuth";
import { NextResponse } from "next/server";

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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
      });
    } else {
      customer = customersRes.data[0];
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.AUTH0_BASE_URL}dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message || "An error ocurred" }, { status: 500 });
  }
};