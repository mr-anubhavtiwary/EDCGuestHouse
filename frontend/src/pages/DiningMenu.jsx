import { Typography, Box, Card, CardContent, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const diningMenu = {
	breakfast: {
		time: "7:00 AM - 9:00 AM",
		items: ["Idli-Sambar", "Poha", "Tea/Coffee", "Bread Butter", "Juice"],
	},
	lunch: {
		time: "12:30 PM - 2:00 PM",
		items: [
			"Roti/Chapati",
			"Rice",
			"Dal Tadka",
			"Mixed Vegetable",
			"Salad",
			"Curd",
		],
	},
	snacks: {
		time: "4:00 PM - 5:00 PM",
		items: ["Samosa", "Pakora", "Tea/Coffee"],
	},
	dinner: {
		time: "7:30 PM - 9:00 PM",
		items: [
			"Roti/Chapati",
			"Rice",
			"Paneer Butter Masala",
			"Dal Fry",
			"Salad",
			"Dessert",
		],
	},
};

const DiningMenuPage = () => {
	return (
		<>
			<Navbar />
			<Box sx={{ padding: 4, backgroundColor: "#f7f8fc" }}>
				<Typography
					variant='h3'
					align='center'
					gutterBottom
					sx={{ color: "rgb(13, 246, 254)", fontWeight: "bold" }}
				>
					EDC Guesthouse Dining Menu
				</Typography>
				<Typography variant='subtitle1' align='center' sx={{ mb: 4 }}>
					Explore our diverse dining options available throughout the
					day.
				</Typography>
				<Grid
					container
					spacing={4}
					justifyContent='center'
					sx={{
						maxWidth: 900,
						margin: "auto",
					}}
				>
					{Object.keys(diningMenu).map((meal) => (
						<Grid item xs={12} md={6} key={meal}>
							<Card
								sx={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									boxShadow: 5,
									borderRadius: 3,
									backgroundColor: "#ffffff",
								}}
							>
								<CardContent
									sx={{
										textAlign: "center",
										width: "100%",
										minHeight: 250,
									}}
								>
									<Typography
										variant='h4'
										sx={{
											color: "#ff7043",
											fontWeight: "bold",
											textTransform: "capitalize",
											mb: 2,
										}}
									>
										{meal}
									</Typography>
									<Typography
										variant='subtitle1'
										sx={{ color: "#757575" }}
									>
										Time: {diningMenu[meal].time}
									</Typography>
									<Box
										component='ul'
										sx={{
											paddingLeft: 3,
											mt: 2,
											color: "#424242",
											listStyleType: "none",
										}}
									>
										{diningMenu[meal].items.map(
											(item, index) => (
												<Typography
													component='li'
													key={index}
													variant='body1'
													sx={{
														mb: 1,
														fontSize: "1rem",
														borderBottom:
															"1px dotted #ccc",
													}}
												>
													{item}
												</Typography>
											)
										)}
									</Box>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>
			<Footer />
		</>
	);
};

export default DiningMenuPage;
