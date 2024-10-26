import {
	Typography,
	Box,
	Card,
	CardContent,
	Container,
	Divider,
	Paper,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
	return (
		<>
			<Navbar />
			<Box
				sx={{
					backgroundImage: "url('/path-to-background-image.jpg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					minHeight: "100vh",
					py: 8,
					color: "#fff",
				}}
			>
				<Container maxWidth="lg">
					<Card
						sx={{
							padding: 4,
							borderRadius: 2,
							backgroundColor: "rgba(255, 255, 255, 0.9)",
							boxShadow: 4,
							backdropFilter: "blur(5px)",
						}}
					>
						<CardContent>
							<Typography
								variant="h3"
								gutterBottom
								sx={{ color: "rgb(13, 246, 254)", fontWeight: "bold", textAlign: "center" }}
							>
								About MNNIT EDC Guesthouse
							</Typography>
							<Divider sx={{ my: 2, bgcolor: "rgb(13, 246, 254)" }} />
							<Typography variant="body1" sx={{ mb: 4, color: "#555" }}>
								Welcome to the <strong>MNNIT Allahabad EDC Guesthouse</strong>!
								Our guesthouse is situated in the serene campus of MNNIT Allahabad,
								offering a peaceful, comfortable, and well-equipped stay for guests
								involved in academic, research, or administrative activities.
							</Typography>

							<Box sx={{ mt: 3 }}>
								<Typography variant="h5" sx={{ color: "rgb(13, 246, 254)", mb: 1 }}>
									Our Mission
								</Typography>
								<Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
									To ensure every guest’s stay is convenient and comfortable, whether
									you are here for an academic collaboration, a meeting, or to visit
									a student.
								</Typography>
							</Box>

							<Box sx={{ mt: 3 }}>
								<Typography variant="h5" sx={{ color: "rgb(13, 246, 254)", mb: 1 }}>
									Facilities and Services
								</Typography>
								<Paper
									elevation={2}
									sx={{
										backgroundColor: "#f1f8ff",
										padding: 2,
										borderRadius: 1,
									}}
								>
									<List>
										{[
											"Well-furnished rooms with essential amenities",
											"Dining area with a variety of meal options",
											"Complimentary Wi-Fi",
											"Conference room available upon request",
											"24/7 guest assistance",
										].map((facility) => (
											<ListItem key={facility}>
												<ListItemIcon>
													<CheckCircleIcon color="primary" />
												</ListItemIcon>
												<ListItemText primary={facility} />
											</ListItem>
										))}
									</List>
								</Paper>
							</Box>

							<Box sx={{ mt: 3 }}>
								<Typography variant="h5" sx={{ color: "rgb(13, 246, 254)", mb: 1 }}>
									Booking and Policies
								</Typography>
								<Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
									Our guesthouse is available for official visitors associated
									with MNNIT. To ensure your reservation, please book early. Visit
									the reservations page or contact us below for more details.
								</Typography>
							</Box>

							<Box sx={{ mt: 3 }}>
								<Typography variant="h5" sx={{ color: "rgb(13, 246, 254)", mb: 1 }}>
									Contact Us
								</Typography>
								<Paper
									elevation={2}
									sx={{
										backgroundColor: "#f1f8ff",
										padding: 2,
										borderRadius: 1,
									}}
								>
									<List>
										<ListItem>
											<ListItemIcon>
												<PhoneIcon color="primary" />
											</ListItemIcon>
											<ListItemText primary="Phone: +91-123-456-7890" />
										</ListItem>
										<ListItem>
											<ListItemIcon>
												<EmailIcon color="primary" />
											</ListItemIcon>
											<ListItemText primary="Email: guesthouse@mnnit.ac.in" />
										</ListItem>
										<ListItem>
											<ListItemIcon>
												<LocationOnIcon color="primary" />
											</ListItemIcon>
											<ListItemText
												primary="EDC Guesthouse, MNNIT Allahabad Campus, Allahabad, Uttar Pradesh, India, 211004"
											/>
										</ListItem>
									</List>
								</Paper>
							</Box>

							{/* <Box sx={{ textAlign: "center", mt: 4 }}>
								<Button
									variant="contained"
									color="primary"
									size="large"
									onClick={() => window.location.href = "/reservations"}
									sx={{
										backgroundColor: "#1e88e5",
										color: "#fff",
										'&:hover': {
											backgroundColor: "#1565c0",
										},
									}}
								>
									Go to Reservations
								</Button>
							</Box> */}
						</CardContent>
					</Card>
				</Container>
			</Box>
			<Footer />
		</>
	);
};

export default AboutPage;
