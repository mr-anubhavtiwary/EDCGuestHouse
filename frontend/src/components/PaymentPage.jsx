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

const CheckoutForm = ({ totalAmount, appId }) => {
	const navigate = useNavigate();

	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);
	// console.log(appId);
	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		const updateRef = async () => {
			// console.log(appId);
			const token = localStorage.getItem("token");
			const url = `${import.meta.env.VITE_HOST}/auth/admin/applications/${appId}/referenceid`;
			try {
				const response = await fetch(url, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await response.json();

				if (data && data.success) {
					console.log("Reference ID generated and added:", data.referenceId);
				} else {
					console.error("Error generating reference ID:", data.message);
				}
			} catch (error) {
				console.error("Error updating application with reference ID:", error);
			}
		};

		setIsProcessing(true);
		try {
			// Create a payment intent on the server

			const url =
				`${import.meta.env.VITE_HOST}/auth/payments/create-payment-intent`;
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
			// console.log("rdata", data);
			const { clientSecret } = data;

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
					billing_details: {
						name: "Guest",
					},
				},
			});
			// console.log("Result", result);
			if (result.error) {
				console.error(result.error.message);
			} else if (result.paymentIntent.status === "succeeded") {
				// Redirect to confirmation page or show success message
				await updateRef();
				setTimeout(() => {
					navigate("/confirmation");
				}, 1000)
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

const PaymentPage = ({ totalAmount, appId }) => {
	return (
		<Elements stripe={stripePromise}>
			<Box sx={{ p: 4 }}>
				<Typography variant='h4' gutterBottom>
					Payment
				</Typography>
				<CheckoutForm totalAmount={totalAmount} appId={appId}/>
			</Box>
		</Elements>
	);
};

export default PaymentPage;
