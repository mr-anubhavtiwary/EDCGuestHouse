import {
	Box,
	Container,
	Typography,
	TextField,
	Button,
	Card,
	CardContent,
	Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const ContactPage = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted", form);
		// Add your form submission logic here
	};

	return (
		<>
			<Navbar />
			<Box
				sx={{
					backgroundImage: "url('/path-to-your-background-image.jpg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					minHeight: "100vh",
					py: 8,
				}}
			>
				<Container maxWidth="sm">
					<Card
						sx={{
							padding: 4,
							boxShadow: 5,
							borderRadius: 2,
							backgroundColor: "rgba(255, 255, 255, 0.9)",
							backdropFilter: "blur(5px)",
						}}
					>
						<CardContent>
							<Typography
								variant="h4"
								align="center"
								gutterBottom
								sx={{ color: "rgb(13, 246, 254)", fontWeight: "bold" }}
							>
								Contact Us
							</Typography>
							<Divider sx={{ my: 2, bgcolor: "rgb(13, 246, 254)" }} />
							<Typography
								variant="body1"
								align="center"
								sx={{ color: "#555", mb: 3 }}
							>
								We would love to hear from you! Fill out the form below and
								we will get back to you as soon as possible.
							</Typography>

							<Box
								component="form"
								onSubmit={handleSubmit}
								sx={{
									display: "flex",
									flexDirection: "column",
									gap: 2,
								}}
							>
								<TextField
									label="Name"
									variant="outlined"
									fullWidth
									required
									name="name"
									value={form.name}
									onChange={handleChange}
								/>
								<TextField
									label="Email"
									variant="outlined"
									type="email"
									fullWidth
									required
									name="email"
									value={form.email}
									onChange={handleChange}
								/>
								<TextField
									label="Message"
									variant="outlined"
									multiline
									rows={4}
									fullWidth
									required
									name="message"
									value={form.message}
									onChange={handleChange}
								/>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									endIcon={<SendIcon />}
									fullWidth
									sx={{
										mt: 2,
										backgroundColor: "rgb(13, 246, 254)",
										color: "#fff",
										fontWeight: "bold",
										"&:hover": {
											backgroundColor: "rgb(13, 246, 254)",
										},
									}}
								>
									Send Message
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Container>
			</Box>
			<Footer />
		</>
	);
};

export default ContactPage;
