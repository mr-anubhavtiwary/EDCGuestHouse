import React, { useEffect, useRef, useState } from "react";
import mnnit2 from "../assets/images/mnnit2.png";

const Work = () => {
	const scrollRef = useRef(null);

	const workInfoData = [
		{
			// image: mnnit2,
			title: "AC Rooms",
			text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
		},
		{
			image: mnnit2,
			title: "Conference Hall",
			text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
		},
		{
			title: "Free Wi-fi",
			text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
		},
		{
			title: "Restaurant",
			text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
		},
		{
			title: "Party Hall",
			text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
		},
		{
			title: "Doctor on Call",
			text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
		},
	];

	useEffect(() => {
		const scrollContainer = scrollRef.current;

		const autoScroll = () => {
			if (scrollContainer) {
				const { scrollLeft, scrollWidth, clientWidth } =
					scrollContainer;

				// Scroll by 1 pixel
				scrollContainer.scrollLeft += 1;

				// If at the bottom, reset scroll to the top
				if (scrollLeft + clientWidth >= scrollWidth) {
					scrollContainer.scrollLeft = 0;
				}
			}
		};

		const intervalId = setInterval(autoScroll, 50); // Scroll every 20ms

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className='work-section-wrapper'>
			<div className='work-section-top'>
				<p className='primary-subheading'>Work</p>
				<h1 className='primary-heading'>Facilities</h1>
				<p className='primary-text'>
					The Guest House consists of a number of units in buildings
					located within the Institute campus. All the rooms are
					furnished, most have attached facilities, and a few have
					kitchenettes. Effort is made to appropriately accommodate
					Distinguished Visitors and Visiting Academics, including
					visiting doctoral students in the various guest rooms.
				</p>
			</div>

			{/* Auto-scrolling container */}
			<div
				className='work-section-bottom'
				ref={scrollRef}
			>
				{workInfoData.map((data, index) => (
					<div className='work-section-info' key={index}>
						<div className='info-boxes-img-container'>
							<img src={data.image} alt={data.title} />
						</div>
						<h2>{data.title}</h2>
						{/* <p>{data.text}</p> */}
					</div>
				))}
			</div>
		</div>
	);
};

export default Work;
