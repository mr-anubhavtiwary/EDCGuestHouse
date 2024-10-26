import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { handleSuccess } from "../utils";
import BannerBackground from "../assets/images/adminbanner.png";
import Dashboard from "../components/Dashboard";

export const AdminDashboard = () => {
	// State to store applications data
	const [applications, setApplications] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("token");
			const url = `${import.meta.env.VITE_HOST}/auth/admin/applications`;

			try {
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await response.json();

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

	const handleStatusChange = async (appId, newStatus) => {
		// console.log(appId);
		const token = localStorage.getItem("token");
		const url = `${import.meta.env.VITE_HOST}/auth/admin/applications/${appId}/status`;

		try {
			const response = await fetch(url, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ status: newStatus }),
			});

			const data = await response.json();

			if (data && data.success) {
				setApplications((prevApps) =>
					prevApps.map((app) =>
						app._id === appId ? { ...app, status: newStatus } : app
					)
				);
			} else {
				console.error("Error updating status:", data.message);
			}
		} catch (error) {
			console.error("Error updating status:", error);
		}
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("loggedInUser");
		localStorage.removeItem("loggedInUserEmail");
		localStorage.removeItem("isAdmin");
		// setLoggedInUser(false);
		handleSuccess("Admin logged out");
		setTimeout(() => {
			navigate("/home");
		}, 1000);
	};
	let buttons = (
		<button className='primary-button' onClick={handleLogout}>
			Logout
		</button>
	);
	return (
		<>
			<Navbar user={"Admin"} buttons={buttons} />
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
						sx={{ color: "#eb4545ed" }}
					>
						Dashboard
					</Typography>

					<Dashboard
						applications={applications}
						handleChange={handleStatusChange}
					/>
				</Box>
			</div>
			<Footer />
		</>
	);
};

export default AdminDashboard;
