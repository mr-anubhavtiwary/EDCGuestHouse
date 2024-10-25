// import * from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
	const navigate = useNavigate();

	return (
		<Box sx={{ p: 4, textAlign: "center" }}>
			<Typography variant='h4' gutterBottom>
				Payment Successful!
			</Typography>
			<Typography variant='body1' gutterBottom>
				Thank you for your payment. Your booking is confirmed.
			</Typography>
			<Button
				variant='contained'
				color='primary'
				onClick={() => navigate("/dashboard")}
			>
				Go to Dashboard
			</Button>
		</Box>
	);
};

export default ConfirmationPage;
