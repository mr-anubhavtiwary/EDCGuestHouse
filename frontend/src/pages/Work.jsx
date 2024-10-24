import { useEffect, useRef, useState } from "react";
import speech from "../assets/images/speech.png";
import wifi from "../assets/images/wifi.png";
import cutlery from "../assets/images/cutlery.png";
import party from "../assets/images/party.png";
import doctor from "../assets/images/doctor.png";
import laundry from "../assets/images/laundry.png";
import parking from "../assets/images/parking.png";
import helpdesk from "../assets/images/helpdesk.png";
import washroom from "../assets/images/washroom.png";
import vip from "../assets/images/vip.png";
import ac from "../assets/images/ac.png";
import water from "../assets/images/water.png";
import internet from "../assets/images/internet.png";
import television from "../assets/images/television.png";

const Work = () => {
	const scrollRef = useRef(null);
	const [scroll, setScroll] = useState(0);

	const workInfoData = [
		{
			image: speech,
			title: "Conference Hall",
		},
		{
			image: wifi,
			title: "Free Wi-fi",
		},
		{
			image: cutlery,
			title: "Restaurant",
		},
		{
			image: party,
			title: "Party Hall",
		},
		{
			image: television,
			title: "23 inch TV",
			// text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
		},
		{
			image: doctor,
			title: "Doctor on Call",
		},
		{
			image: laundry,
			title: "Laundry",
		},
		{
			image: parking,
			title: "Car Parking",
		},
		{
			image: helpdesk,
			title: "24x7 Help Desk",
		},
		{
			image: washroom,
			title: "Hygenic Washroom",
		},
		{
			image: vip,
			title: "VIP Suites",
		},
		{
			image: ac,
			title: "AC Suites",
		},
		{
			image: water,
			title: "Mineral Water",
		},
		{
			image: internet,
			title: "Dataport",
		},
		
	];

	useEffect(() => {
		const scrollContainer = scrollRef.current;

		const autoScroll = () => {
			if (scrollContainer) {
				const { scrollLeft, scrollWidth, clientWidth } =
					scrollContainer;

				// Scroll by 1 pixel
				if(scroll === 1){
					scrollContainer.scrollLeft -= 1;
				} else {
					scrollContainer.scrollLeft += 1;
				}

				// If at the bottom, reset scroll to the top
				if (scrollLeft  + clientWidth >= scrollWidth) {
					setScroll(1);
				} else if(scrollLeft <= 0){
					setScroll(0);
				}
			}
		};

		const intervalId = setInterval(autoScroll, 50); // Scroll every 20ms

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, [scroll]);

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
					</div>
				))}
			</div>
		</div>
	);
};

export default Work;
