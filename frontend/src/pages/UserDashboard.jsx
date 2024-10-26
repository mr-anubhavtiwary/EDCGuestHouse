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
			const url = `${import.meta.env.VITE_HOST}/auth/user/applications`;

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

	// Calculation of total cost based on room tariff, food charges, and stay duration.
	const calculateTotalCost = (app) => {
		const days =
			(new Date(app.checkOutDate) - new Date(app.checkInDate)) /
			(1000 * 60 * 60 * 24);
	
		// Defining room rates and food charges by category
		const rates = {
			B: { single: 500, double: 700 },
			C: { single: 900, double: 1000 },
			D: { single: 1500, double: 2000 },
		};

		const foodRates = {
			B: { breakfast: 75, lunch: 125, dinner: 125 },
			C: { breakfast: 75, lunch: 125, dinner: 125 },
			D: { breakfast: 150, lunch: 300, dinner: 300 },
		};

		// Determininng rates for category ('B', 'C', 'D')
		const category = app.designation;

		// Skipping cost calculation for Category A, where all charges are zero
		if (category === "A") return 1;

		// Calculating room cost
		// const roomRate =
		// 	app.occupancy === "single"
		// 		? rates[category].single
		// 		: rates[category].double;
		const roomRate = app.accompanyingPersons.length * rates[category].single;

		// Calculate food cost for each person per day
		const foodCost =
			app.accompanyingPersons.length *
			(foodRates[category].breakfast +
				foodRates[category].lunch +
				foodRates[category].dinner);

		const roomCost = roomRate + foodCost;
		// console.log("days", days);
		// console.log("food", foodCost);
		// console.log("room", roomRate);
		// console.log("room cost in a day", roomCost);

		return roomCost * days;
	};

	const handleBook = async (app, appId, appStatus) => {
		const totalCost = calculateTotalCost(app);
		const token = localStorage.getItem("token");

		const url = `${import.meta.env.VITE_HOST}/auth/user/applications/${appId}/status?status=${appStatus}`;

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
					navigate("/book", { state: { totalCost, appId } });
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
