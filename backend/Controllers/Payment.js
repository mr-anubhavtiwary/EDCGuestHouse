require('dotenv').config();

const KEY = process.env.STRIPE_SECRET_KEY || "";

const stripe = require("stripe")(KEY);

const payment = async (req, res) => {
	const { amount } = req.body;
	// console.log(amount);

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount,
		currency: "inr",
		// In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
		automatic_payment_methods: {
			enabled: true,
		},
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
		// [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
		dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
	});
};

module.exports = {
	payment,
};
