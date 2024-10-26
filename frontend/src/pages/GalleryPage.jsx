import {
	Box,
	Typography,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Dialog,
	IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import mnnit1 from "../assets/images/mnnit1.png";
import mnnit2 from "../assets/images/mnnit2.png";
import mnnit3 from "../assets/images/mnnit3.png";
import mnnit4 from "../assets/images/mnnit4.png";
import room1 from "../assets/images/room1.png";
import room2 from "../assets/images/room2.png";
import room3 from "../assets/images/room3.png";
import mnnit5 from "../assets/images/mnnit5.png";
import room5 from "../assets/images/room5.png";
import room6 from "../assets/images/room6.png";
import room7 from "../assets/images/room7.png";
import room8 from "../assets/images/room8.png";
import mnnit6 from "../assets/images/mnnit6.png";
import mnnit7 from "../assets/images/mnnit7.png";
import mnnit8 from "../assets/images/mnnit8.png";
import { useState } from "react";

const images = [
	{ src: mnnit1, title: "Image 1" },
	{ src: mnnit2, title: "Image 2" },
	{ src: mnnit3, title: "Image 3" },
	{ src: mnnit4, title: "Image 4" },
	{ src: room1, title: "Image 5" },
	{ src: room2, title: "Image 6" },
	{ src: room3, title: "Image 7" },
	{ src: mnnit5, title: "Image 8" },
	{ src: room5, title: "Image 9" },
	{ src: room6, title: "Image 10" },
	{ src: room7, title: "Image 11" },
	{ src: room8, title: "Image 12" },
	{ src: mnnit6, title: "Image 13" },
	{ src: mnnit7, title: "Image 14" },
	{ src: mnnit8, title: "Image 15" },
];

const GalleryPage = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	const handleClickOpen = (image) => {
		setSelectedImage(image);
	};

	const handleClose = () => {
		setSelectedImage(null);
	};

	return (
		<>
			<Navbar />
			<Box
				sx={{
					padding: 4,
					backgroundColor: "#f7f8fc",
					minHeight: "100vh",
				}}
			>
				<Typography
					variant='h3'
					align='center'
					gutterBottom
					sx={{ color: "rgb(13, 246, 254)", fontWeight: "bold" }}
				>
					Gallery
				</Typography>
				<ImageList
					sx={{ width: "100%", height: "auto" }}
					cols={3}
					gap={12}
				>
					{images.map((image) => (
						<ImageListItem
							key={image.src}
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
								src={`${image.src}`}
								alt={image.title}
								loading='lazy'
								style={{
									cursor: "pointer",
									borderRadius: "8px",
									height: "100%",
									width: "100%",
									objectFit: "cover",
									boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
								}}
								onClick={() => handleClickOpen(image)}
							/>
							<ImageListItemBar
								title={image.title}
								sx={{
									background:
										"linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
								}}
							/>
						</ImageListItem>
					))}
				</ImageList>

				{/* Dialog to show selected image */}
				<Dialog
					open={Boolean(selectedImage)}
					onClose={handleClose}
					maxWidth='md'
					PaperProps={{
						sx: {
							backgroundColor: "transparent",
							boxShadow: "none",
							backdropFilter: "blur(8px)",
						},
					}}
				>
					<Box
						sx={{
							position: "relative",
							borderRadius: 2,
							overflow: "hidden",
							maxWidth: "90vw",
							maxHeight: "90vh",
						}}
					>
						<img
							src={selectedImage?.src}
							alt={selectedImage?.title}
							style={{
								width: "100%",
								height: "auto",
								borderRadius: 8,
							}}
						/>
						<IconButton
							onClick={handleClose}
							sx={{
								position: "absolute",
								top: 8,
								right: 8,
								color: "white",
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								"&:hover": {
									backgroundColor: "rgba(0, 0, 0, 0.8)",
								},
							}}
						>
							<CloseIcon />
						</IconButton>
					</Box>
				</Dialog>
			</Box>
			<Footer />
		</>
	);
};

export default GalleryPage;
