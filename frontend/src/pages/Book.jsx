import {
	ImageList,
	ImageListItem,
	Typography,
	Box,
	Paper,
	Grid,
} from "@mui/material";
import mnnit1 from "../assets/images/mnnit1.png";
import mnnit2 from "../assets/images/mnnit2.png";
import mnnit3 from "../assets/images/mnnit3.png";
import mnnit4 from "../assets/images/mnnit4.png";
import room1 from "../assets/images/room1.png";
import room2 from "../assets/images/room2.png";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

const Book = () => {
	const itemData = [
		{ img: mnnit1, title: "Guesthouse 1" },
		{ img: mnnit2, title: "Guesthouse 2" },
		{ img: mnnit3, title: "Guesthouse 3" },
		{ img: mnnit4, title: "Guesthouse 4" },
		{ img: room1, title: "Guesthouse 5" },
		{ img: room2, title: "Guesthouse 6" },
	];
	const navigate = useNavigate();
	const loggedInUser = localStorage.getItem("loggedInUser");
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("loggedInUser");
		localStorage.removeItem("loggedInUserEmail");
		// setLoggedInUser(false);
		handleSuccess("User logged out");
		setTimeout(() => {
			navigate("/home");
		}, 1000);
	};
	let buttons = (
		<button className='primary-button' onClick={handleLogout}>
			Logout
		</button>
	);
	return (
		<>
			<Navbar user={loggedInUser} buttons={buttons} />
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
						The MNNIT Guesthouse provides visitors a peaceful and
						serene environment for a relaxing stay. Situated within
						the beautiful campus of MNNIT Allahabad, it offers
						modern amenities, spacious rooms, and a dining area.
						Whether you are here for conferences, academic events,
						or a leisurely visit, the guesthouse ensures a
						comfortable experience with personalized services.
					</Typography>
					<Typography variant='body1' paragraph>
						We offer high-speed Wi-Fi, a dedicated lounge area, and
						easy access to the academic and administrative blocks.
						The surrounding greenery and well-maintained
						infrastructure make it a perfect place for guests
						looking for a blend of comfort and convenience.
					</Typography>
				</Paper>

				{/* Guesthouse Gallery */}
				<Box mb={5}>
					<Typography variant='h4' align='center' gutterBottom>
						EDC Guesthouse Gallery
					</Typography>
					<ImageList
						sx={{ width: "100%", height: "auto" }}
						cols={3}
						gap={12}
					>
						{itemData.map((item) => (
							<ImageListItem
								key={item.img}
								sx={{
									overflow: "hidden",
									"& img": {
										transition: "transform 0.5s ease",
									},
									"&:hover img": {
										transform: "scale(1.1)",
									},
								}}
							>
								<img
									src={`${item.img}`}
									alt={item.title}
									loading='lazy'
									style={{
										borderRadius: "8px",
										height: "100%",
										width: "100%",
										objectFit: "cover",
									}}
								/>
							</ImageListItem>
						))}
					</ImageList>
				</Box>

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
								- On-premises dining with a variety of cuisines
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant='h5' gutterBottom>
								Location
							</Typography>
							<Typography variant='body1'>
								The guesthouse is located inside the MNNIT
								Allahabad campus, offering convenient access to
								academic buildings, the main auditorium, and the
								sports complex. It is also close to the main
								city attractions, ensuring easy travel for our
								guests.
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Box>
			<Footer />
		</>
	);
};

export default Book;
