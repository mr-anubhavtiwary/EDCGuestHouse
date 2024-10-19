import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import BannerBackground from "../assets/images/aqua4.png";
// import BannerBackground from "../assets/images/aqua.png";
import BannerImage from "../assets/images/banner.png";
import "../assets/stylesheets/Home.css";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import Login from "./Login";
import Signup from "./Signup";
import About from "./About";
import Work from "./Work";
import Testimonial from "./Testimonial";
import Footer from "./Footer";

function Home() {
	const [loggedInUser, setLoggedInUser] = useState("");
	const [popup, setPopup] = useState(null);
	// const [products, setProducts] = useState("");

	const navigate = useNavigate();
	const handleLogout = (e) => {
		localStorage.removeItem("token");
		localStorage.removeItem("loggedInUser");
		setLoggedInUser(false);
		handleSuccess("User logged out");
		setTimeout(() => {
			navigate("/home");
		}, 1000);
	};

	const handleLogin = (e) => {
		setPopup(1);
		// navigate("/login");
	};

	const handleSignup = (e) => {
		setPopup(2);
		// navigate("/signup");
	};

	const handleApplication = (e) => {
		if (loggedInUser) {
			navigate("/application");
		} else {
			setPopup(1);
		}
	};

	useEffect(() => {
		setLoggedInUser(localStorage.getItem("loggedInUser"));
	}, []);

	// const fetchProducts = async () => {
	// 	try {
	// 		const url = "http://localhost:8080/products";
	// 		const headers = {
	// 			headers: {
	// 				Authorization: localStorage.getItem("token"),
	// 			},
	// 		};
	// 		const response = await fetch(url, headers);
	// 		const result = await response.json();
	//         setProducts(result);
	// 		console.log(result);
	// 	} catch (err) {
	// 		handleError(err);
	// 	}
	// };
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
							Apply
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
				<Footer />
				{/* {applicationButton} */}
				{/* <h1>{loggedInUser}</h1> */}
				{/* <button onClick={handleLogout}>Logout</button> */}
				{/* {buttons} */}
				{/* <div>
					products && products.map((item, index)=>{
						<ul key={index}>
							<span>{item.name} : {item.price}</span>
						</ul>
					})
				</div> */}
			</div>
			{popup && (
				<div className='popup-box'>
					{popup === 1 && <Login setPopup={setPopup} />}
					{popup === 2 && <Signup setPopup={setPopup} />}
				</div>
			)}
			<ToastContainer />
		</>
	);
}

export default Home;
