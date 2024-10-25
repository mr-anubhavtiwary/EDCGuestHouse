import { Box, ImageList, ImageListItem } from "@mui/material";
import mnnit1 from "../assets/images/mnnit1.png";
import mnnit2 from "../assets/images/mnnit2.png";
import mnnit3 from "../assets/images/mnnit3.png";
import mnnit4 from "../assets/images/mnnit4.png";
import room1 from "../assets/images/room1.png";
import room2 from "../assets/images/room2.png";

const Gallery = () => {
	const itemData = [
		{ img: mnnit1, title: "Guesthouse 1" },
		{ img: mnnit2, title: "Guesthouse 2" },
		{ img: mnnit3, title: "Guesthouse 3" },
		{ img: mnnit4, title: "Guesthouse 4" },
		{ img: room1, title: "Guesthouse 5" },
		{ img: room2, title: "Guesthouse 6" },
	];
	return (
		<div className='gallary-section-wrapper'>
			<div className='gallary-section-top'>
				<p className='primary-subheading'>Gallary</p>
				<h1 className='primary-heading'>EDC Guest House</h1>
			</div>
			<div className='gallary-section-bottom-container'>
				<Box mb={5}>
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
			</div>
		</div>
	);
};

export default Gallery;
