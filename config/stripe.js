// import stripePackage from 'stripe';
import stripePackage from 'stripe'

console.log("Stripe API Key: ", process.env.STRIPE_SECRET_KEY);

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export default stripe
