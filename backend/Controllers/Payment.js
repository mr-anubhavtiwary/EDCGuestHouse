require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const ApplicationModel = require("../Models/application");

const KEY = process.env.STRIPE_SECRET_KEY || "";

const stripe = require("stripe")(KEY);

const payment = async (req, res) => {
	const { amount } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount * 100,
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

const addApplicationReferenceId = async (req, res) => {
	const { appId } = req.params;
	console.log(appId);
	if (!appId) {
		return res
			.status(400)
			.json({ success: false, message: "Invalid application ID" });
	}
	try {
		// Generate a unique reference ID
		const referenceId = uuidv4();

		// Update application with the new reference ID
		const updatedApplication = await ApplicationModel.findByIdAndUpdate(
			appId,
			{ referenceId },
			{ new: true }
		);

		if (!updatedApplication) {
			return res
				.status(404)
				.json({ success: false, message: "Application not found" });
		}

		res.json({
			success: true,
			message: "Reference ID generated and added successfully",
			referenceId,
		});
	} catch (error) {
		console.error("Error generating reference ID:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

module.exports = {
	payment,
	addApplicationReferenceId,
};
