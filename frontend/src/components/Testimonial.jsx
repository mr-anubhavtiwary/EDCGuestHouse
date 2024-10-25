import { useEffect, useState } from "react";
import profilepic1 from "../assets/images/johndoe.png";
import profilepic2 from "../assets/images/profile2.jpg";
import profilepic3 from "../assets/images/profile3.jpg";
import { AiFillStar } from "react-icons/ai";

const testimonials = [
	{
		image: profilepic1,
		text: "EDC is located in the campus of MNNIT Allahabad behind the academic building near staff quarters. It's very economical to stay here if you are going NIT for any program or to attend workshop/seminar. The food is also good.",
		name: "Anubhav Anand",
	},
	{
		image: profilepic2,
		text: "It's a very nice place in MNNIT campus for guest stay and food. Green and spacious. Tasty food in mess. Overall everything here is good.",
		name: "Prakash Kumar",
	},
	{
		image: profilepic3,
		text: "A very well managed place. Food is awesome. Service is very nice. Absolutely wonderful three days stay for me here. Rooms are also good. Quality place with cost effective rates. 5 Star from me.",
		name: "Aadersh Chaubey",
	},
];

const Testimonial = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(
				(prevIndex) => (prevIndex + 1) % testimonials.length
			);
		}, 3000); // Change testimonial every 3 seconds

		return () => clearInterval(interval); // Clean up the interval on unmount
	}, []);

	return (
		<div className='work-section-wrapper'>
			<div className='work-section-top'>
				<p className='primary-subheading'>Testimonial</p>
				<h1 className='primary-heading'>What They Are Saying</h1>
				<p className='primary-text'>
					Our Guests experiences are at the heart of our GuestHouse.
					Here’s what they have to say about their time with us.
				</p>
			</div>
			<div className='testimonial-section-bottom-container'>
				<div className='testimonial-section-bottom'>
					{/* Displaying current testimonial */}
					<img
						src={testimonials[currentIndex].image}
						alt={testimonials[currentIndex].name}
					/>
					<p>{testimonials[currentIndex].text}</p>
					<div className='testimonials-stars-container'>
						<AiFillStar />
						<AiFillStar />
						<AiFillStar />
						<AiFillStar />
						<AiFillStar />
					</div>
					<h2>{testimonials[currentIndex].name}</h2>
				</div>
			</div>
		</div>
	);
};

export default Testimonial;
