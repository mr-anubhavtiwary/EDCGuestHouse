import { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ConfirmationPage = () => {
	const navigate = useNavigate();
	const [seconds, setSeconds] = useState(5); // Countdown from 5 seconds

	// Countdown timer effect
	useEffect(() => {
		if (seconds > 0) {
			const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
			return () => clearTimeout(timer);
		} else {
			navigate("/userDashboard"); // Redirect after countdown ends
		}
	}, [seconds, navigate]);

	return (
		<Box sx={{ p: 4, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
			<CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
			<Typography variant="h4" gutterBottom>
				Payment Successful!
			</Typography>
			<Typography variant="body1" gutterBottom>
				Thank you for your payment. Your booking is confirmed.
			</Typography>
			<Typography variant="body2" color="text.secondary" gutterBottom>
				You will be redirected to your dashboard in {seconds} seconds.
			</Typography>
			<Button
				variant="contained"
				color="primary"
				onClick={() => navigate("/userDashboard")}
				sx={{ mt: 3 }}
			>
				Go to Dashboard Now
			</Button>
		</Box>
	);
};

export default ConfirmationPage;
