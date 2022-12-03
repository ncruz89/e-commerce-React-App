require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

// serverless function setup for stripe
// receives a request with an amount which we pass into stripe as a payment intent

exports.handler = async (e) => {
  try {
    const { amount } = JSON.parse(e.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (err) {
    console.log({ err });
    return {
      status: 400,
      body: JSON.stringify({ err }),
    };
  }
};
