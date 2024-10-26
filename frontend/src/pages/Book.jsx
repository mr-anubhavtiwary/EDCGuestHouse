import { Typography, Box, Paper, Grid } from "@mui/material";
import mnnit1 from "../assets/images/mnnit1.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { handleSuccess } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";
import BannerBackground from "../assets/images/bookbanner.png";
import Gallery from "../components/Gallery";
import PaymentPage from "../components/PaymentPage";

const Book = () => {
	const location = useLocation();
	const { totalCost, appId } = location.state || {};
	console.log("total Cost - ", totalCost);
	console.log("appId - ", appId);
	const navigate = useNavigate();
	const loggedInUser = localStorage.getItem("loggedInUser");
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("loggedInUser");
		localStorage.removeItem("loggedInUserEmail");
		handleSuccess("User logged out");
		setTimeout(() => {
			navigate("/home");
		}, 500);
	};

	let buttons = (
		<button className='primary-button' onClick={handleLogout}>
			Logout
		</button>
	);
	return (
		<>
			<Navbar user={loggedInUser} buttons={buttons} />
			<div className='book-container'>
				<div className='book-bannerImage-container'>
					<img src={BannerBackground} alt='' />
				</div>
				<Box sx={{ padding: 3, backgroundColor: "#f4f6f9" }}>
					{/* Hero Section */}
					<Box
						sx={{
							backgroundImage: `url(${mnnit1})`,
							backgroundPosition: "center",
							backgroundSize: "cover",
							height: "400px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							color: "#fff",
							textAlign: "center",
							mb: 5,
						}}
					>
						<Typography
							variant='h2'
							sx={{
								fontWeight: "bold",
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								p: 2,
							}}
						>
							Welcome to MNNIT Guesthouse
						</Typography>
					</Box>

					{/* Guesthouse Description */}
					<Paper elevation={3} sx={{ padding: 3, marginBottom: 5 }}>
						<Typography variant='h4' gutterBottom>
							About MNNIT Guesthouse
						</Typography>
						<Typography variant='body1' paragraph>
							The MNNIT Guesthouse provides visitors a peaceful
							and serene environment for a relaxing stay. Situated
							within the beautiful campus of MNNIT Allahabad, it
							offers modern amenities, spacious rooms, and a
							dining area. Whether you are here for conferences,
							academic events, or a leisurely visit, the
							guesthouse ensures a comfortable experience with
							personalized services.
						</Typography>
						<Typography variant='body1' paragraph>
							We offer high-speed Wi-Fi, a dedicated lounge area,
							and easy access to the academic and administrative
							blocks. The surrounding greenery and well-maintained
							infrastructure make it a perfect place for guests
							looking for a blend of comfort and convenience.
						</Typography>
					</Paper>
					{/* Gallary */}

					<Gallery />

					{/* Location or Facilities Section */}
					<Paper
						elevation={3}
						sx={{
							padding: 3,
							marginBottom: 5,
							backgroundColor: "#e0f7fa",
						}}
					>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<Typography variant='h5' gutterBottom>
									Our Facilities
								</Typography>
								<Typography variant='body1'>
									- Spacious rooms with modern amenities
								</Typography>
								<Typography variant='body1'>
									- Complimentary high-speed Wi-Fi
								</Typography>
								<Typography variant='body1'>
									- Conference and meeting halls
								</Typography>
								<Typography variant='body1'>
									- On-premises dining with a variety of
									cuisines
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant='h5' gutterBottom>
									Location
								</Typography>
								<Typography variant='body1'>
									The guesthouse is located inside the MNNIT
									Allahabad campus, offering convenient access
									to academic buildings, the main auditorium,
									and the sports complex. It is also close to
									the main city attractions, ensuring easy
									travel for our guests.
								</Typography>
							</Grid>
						</Grid>
						<PaymentPage totalAmount={totalCost} appId={appId} />
					</Paper>
				</Box>
			</div>
			<Footer />
		</>
	);
};

export default Book;
