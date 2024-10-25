import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import BannerBackground from "../assets/images/aqua4.png";
import BannerImage from "../assets/images/banner.png";
import "../assets/stylesheets/Home.css";
import Navbar from "../components/Navbar";
import { FiArrowRight } from "react-icons/fi";
import Login from "./Login";
import Signup from "./Signup";
import About from "../components/About";
import Work from "../components/Work";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";

function Home() {
	const [loggedInUser, setLoggedInUser] = useState("");
	const [popup, setPopup] = useState(null);

	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("loggedInUser");
		localStorage.removeItem("loggedInUserEmail");
		localStorage.removeItem("isAdmin");
		const token = localStorage.getItem("token");
		if (!token) setLoggedInUser(false);
		handleSuccess("User logged out");
		setTimeout(() => {
			navigate("/home");
		}, 500);
	};

	const handleLogin = () => {
		setPopup(1);
	};

	const handleSignup = () => {
		setPopup(2);
	};

	const handleApplication = () => {
		if (loggedInUser) {
			navigate("/application", {
				state: {
					loggedInUser,
					loggedInUserEmail:
						localStorage.getItem("loggedInUserEmail"),
				},
			});
		} else {
			setPopup(1);
		}
	};
	// console.log(localStorage.getItem("loggedInUserEmail"));
	useEffect(() => {
		setLoggedInUser(localStorage.getItem("loggedInUser"));
	}, [popup]);

	let buttons;
	if (loggedInUser) {
		buttons = (
			<button className='primary-button' onClick={handleLogout}>
				Logout
			</button>
		);
	} else {
		buttons = (
			<div className='buttons'>
				<button className='primary-button' onClick={handleLogin}>
					Login
				</button>
				<button className='primary-button' onClick={handleSignup}>
					Signup
				</button>
			</div>
		);
	}
	return (
		<>
			<div
				className='Home-container'
				style={popup ? { filter: "blur(5px)" } : {}}
			>
				<Navbar user={loggedInUser} buttons={buttons} />
				<div className='home-banner-container'>
					<div className='home-bannerImage-container'>
						<img src={BannerBackground} alt='' />
					</div>

					<div className='home-text-section'>
						<h1 className='primary-heading'>MNNIT GuestHouse</h1>
						<p className='primary-text'>
							The MNNIT Guesthouse, located within the serene
							campus of Motilal Nehru National Institute of
							Technology Allahabad, provides a comfortable and
							convenient stay for visitors, including faculty,
							officials, and guests of the institution.
						</p>
						<p className='primary-text'>
							Known for its clean and well-maintained facilities,
							the guesthouse offers a peaceful environment, ideal
							for both short and extended stays.
						</p>

						<button
							className='secondary-button'
							onClick={handleApplication}
						>
							Register
							<FiArrowRight />{" "}
						</button>
					</div>
					<div className='home-image-section'>
						<img className='home-image' src={BannerImage} alt='' />
					</div>
				</div>
				<About />
				<Work />
				<Testimonial />
				<Gallery />
				<Footer />
			</div>
			{popup && (
				<div className='popup-box'>
					{popup === 1 && <Login setPopup={setPopup} />}
					{popup === 2 && <Signup setPopup={setPopup} />}
				</div>
			)}
		</>
	);
}

export default Home;
