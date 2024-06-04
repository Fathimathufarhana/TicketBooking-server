import stripePackage from 'stripe'

    const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export default stripe
