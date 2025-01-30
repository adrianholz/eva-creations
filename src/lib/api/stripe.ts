import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export async function apiStripeGetSubscription() {
  return await fetch('/api/stripe', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async res => {
    const data = await res.json()

    if (data.error) {
      console.error(data.error)
      return
    }

    return data.subscription

  }).catch(err => console.error(err))
}

export async function apiStripeCreateSubscription() {
  return await fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }).then(async res => {
    const data = await res.json()


    if (data.error) {
      console.error(data.error)
      return
    }

    // Redirect to the checkout page

    const stripe = await stripePromise;

    if (!stripe) {
      console.error('Stripe.js has not loaded correctly')
      return
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (error) {
      console.error(error)
    }

    window.location.href = '/dashboard'


  }).catch(err => console.error(err))
}

// Create subscription management session

export async function apiStripeManageSubscription() {
  return await fetch('/api/stripe/manage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }).then(async res => {
    const data = await res.json()

    if (data.error) {
      console.error(data.error)
      return
    }

    // Open the billing portal

    window.location.href = data.url
  
  }).catch(err => console.error(err))
}