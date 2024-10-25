import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;
const stripePromise = loadStripe(STRIPE_PUB_KEY);

const CheckoutForm = ({ totalAmount }) => {
	const navigate = useNavigate();
	
	// console.log("amt", totalAmount);
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		setIsProcessing(true);
		try {
			// Create a payment intent on the server

			const url =
				"http://localhost:8080/auth/payments/create-payment-intent";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					amount: totalAmount, // Add loggedInUserEmail to the data sent
				}),
			});

			const data = await response.json();
			console.log("rdata", data);
			const { clientSecret } = data;

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
					billing_details: {
						name: "Guest",
					},
				},
			});
			console.log("Result", result);
			if (result.error) {
				console.error(result.error.message);
			} else if (result.paymentIntent.status === "succeeded") {
				// Redirect to confirmation page or show success message
				navigate("/confirmation");
			}
		} catch (error) {
			console.error("Payment error:", error);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement options={{ hidePostalCode: true }} />
			<Button
				type='submit'
				disabled={!stripe || isProcessing}
				variant='contained'
				color='primary'
				sx={{ mt: 2 }}
			>
				{isProcessing ? "Processing..." : `Pay ₹${totalAmount}`}
			</Button>
		</form>
	);
};

const PaymentPage = ({ totalAmount }) => {
	return (
		<Elements stripe={stripePromise}>
			<Box sx={{ p: 4 }}>
				<Typography variant='h4' gutterBottom>
					Payment
				</Typography>
				<CheckoutForm totalAmount={totalAmount} />
			</Box>
		</Elements>
	);
};

export default PaymentPage;
