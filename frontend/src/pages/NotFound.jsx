import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/"); // Redirect to home or another relevant page
	};

	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#f4f6f9",
				textAlign: "center",
				padding: 3,
			}}
		>
			<Typography
				variant='h1'
				component='h1'
				gutterBottom
				sx={{ fontSize: "8rem", fontWeight: "bold", color: "#1976d2" }}
			>
				404
			</Typography>
			<Typography variant='h4' component='h2' gutterBottom>
				File or directory not found
			</Typography>
			<Typography variant='body1' gutterBottom>
				The resource you are looking for might have been removed, had
				its name changed, or is temporarily unavailable.
			</Typography>
			<Button
				variant='contained'
				color='primary'
				onClick={handleGoHome}
				sx={{ mt: 3 }}
			>
				Go to Home
			</Button>
		</Box>
	);
};

export default NotFound;
