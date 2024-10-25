// netstat -a -n -o
// taskkill -f /pid 13056
import AboutBackground from "../assets/images/about.png";
import AboutBackgroundImage from "../assets/images/mnnit2.png";

const About = () => {
	const handleDetails = () => {
		window.open(
			"https://www.mnnit.ac.in/images/newstories/2022/edc/905-_Notice_for_Revised_Tariff__Food_Charges_of_EDC_10.08.2022.pdf",
			"_blank"
		);
	};
	return (
		<div className='about-section-container'>
			<div className='about-background-image-container'>
				<img src={AboutBackground} alt='' />
			</div>
			<div className='about-section-image-container'>
				<img className='home-image' src={AboutBackgroundImage} alt='' />
			</div>
			<div className='about-section-text-container'>
				<p className='primary-subheading'>About</p>
				<h1 className='primary-heading'>
					Executive Development Center
				</h1>
				<p className='primary-text'>
					We provide 23 AC rooms at EDC on advance booking on the
					prescribed format. All official bookings will need prior
					approval of the Director/Registrar or Head of the
					Department/Section.
				</p>
				<div className='about-buttons-container'>
					<button
						className='secondary-button'
						onClick={handleDetails}
					>
						Learn More
					</button>
				</div>
			</div>
		</div>
	);
};

export default About;
