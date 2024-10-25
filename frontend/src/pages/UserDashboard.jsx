import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { handleSuccess } from "../utils";
import BannerBackground from "../assets/images/aqua.png";
import Dashboard from "../components/Dashboard";

export const UserDashboard = () => {
	// State to store applications data
	const [applications, setApplications] = useState([]);
	const navigate = useNavigate();
	const loggedInUser = localStorage.getItem("loggedInUser");
	// console.log(loggedInUser);
	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("token");
			const url = "http://localhost:8080/auth/user/applications";

			try {
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await response.json();
				console.log(data);
				if (data && data.success) {
					setApplications(data.data); // Store applications in state
				} else {
					console.error("Error fetching data:", data.message);
				}
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};

		fetchData();
	}, [Navigate]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("loggedInUser");
		localStorage.removeItem("loggedInUserEmail");
		localStorage.removeItem("isAdmin");
		handleSuccess("User logged out");
		setTimeout(() => {
			navigate("/home");
		}, 500);
	};

	const handleBook = async (appId, appStatus) => {
		const token = localStorage.getItem("token");

		const url = `http://localhost:8080/auth/user/applications/${appId}/status?status=${appStatus}`;

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();
			// console.log(data);

			if (data && data.success) {
				setTimeout(() => {
					navigate("/book");
				}, 500);
			} else {
				console.error("Status not approved:", data.message);
			}
		} catch (error) {
			console.error("Error fetching status:", error);
		}
	};
	let buttons = (
		<button className='primary-button' onClick={handleLogout}>
			Logout
		</button>
	);
	return (
		<>
			<Navbar user={loggedInUser} buttons={buttons} />
			<div className='user-container'>
				<div className='user-bannerImage-container'>
					<img src={BannerBackground} alt='' />
				</div>

				<Box
					sx={{
						padding: 4,
						backgroundColor: "#f5f8fa",
						minHeight: "100vh",
					}}
				>
					<Typography
						variant='h4'
						gutterBottom
						sx={{ color: "#0dd2fe" }}
					>
						Dashboard
					</Typography>

					<Dashboard
						applications={applications}
						handleChange={handleBook}
					/>
				</Box>
			</div>
			<Footer />
		</>
	);
};

export default UserDashboard;
