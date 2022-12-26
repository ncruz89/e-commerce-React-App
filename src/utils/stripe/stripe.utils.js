import { loadStripe } from "@stripe/stripe-js";

// load stripe with API key in env
export const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);
