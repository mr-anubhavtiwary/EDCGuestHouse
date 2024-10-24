import { useEffect, useState } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Paper,
	Box,
	Grid,
	Divider,
	Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { handleSuccess } from "../utils";
import AddIcon from "@mui/icons-material/Add";

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
		}, 1000);
	};

	const handleBook = async ( appId, appStatus ) => {
		const token = localStorage.getItem("token");
		// console.log(appId);
		// console.log(appStatus);
        
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
				}, 1000);
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

			<Box
				sx={{
					padding: 4,
					backgroundColor: "#f5f8fa",
					minHeight: "100vh",
				}}
			>
				<Typography variant='h4' gutterBottom sx={{ color: "#0dd2fe" }}>
					Dashboard
				</Typography>

				<Paper
					sx={{
						padding: 3,
						marginTop: 4,
						backgroundColor: "#ffffff",
						boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
					}}
				>
					<Typography
						variant='h5'
						gutterBottom
						sx={{ color: "#333", marginBottom: 2 }}
					>
						Applications
					</Typography>

					{applications.length > 0 ? (
						applications.map((app) => (
							<Accordion key={app._id} sx={{ marginBottom: 2 }}>
								<AccordionSummary
									expandIcon={
										<ExpandMoreIcon
											sx={{ color: "#0dd2fe" }}
										/>
									}
									sx={{
										backgroundColor: "#0dd2fe",
										color: "#fff",
										borderRadius: "4px",
									}}
								>
									<Typography
										variant='h6'
										sx={{ width: "80%", flexShrink: 0 }}
									>
										Employee Code: {app.employeeCode} -{" "}
										{app.designation}
									</Typography>
									<Typography variant='h6'>
										<strong>Status:</strong> {app.status}
									</Typography>
								</AccordionSummary>

								<AccordionDetails
									sx={{ backgroundColor: "#f0faff" }}
								>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={6}>
											<Typography>
												<strong>Application ID:</strong>{" "}
												{app._id}
											</Typography>
											<Typography>
												<strong>User ID:</strong>{" "}
												{app.userid}
											</Typography>
											<Typography>
												<strong>Designation:</strong>{" "}
												{app.designation}
											</Typography>
											<Typography>
												<strong>Employee Code:</strong>{" "}
												{app.employeeCode}
											</Typography>
											<Typography>
												<strong>
													Applicant Address:
												</strong>{" "}
												{app.applicantAddress}
											</Typography>
										</Grid>
										<Grid item xs={12} sm={6}>
											<Typography>
												<strong>Guest Name:</strong>{" "}
												{app.guestName}
											</Typography>
											<Typography>
												<strong>Guest Address:</strong>{" "}
												{app.guestAddress}
											</Typography>
											<Typography>
												<strong>Guest Mobile:</strong>{" "}
												{app.guestMobile}
											</Typography>
											<Typography>
												<strong>Guest Email:</strong>{" "}
												{app.guestEmail}
											</Typography>
											<Typography>
												<strong>
													Relation With Applicant:
												</strong>{" "}
												{app.relationWithApplicant}
											</Typography>
										</Grid>
									</Grid>

									<Divider sx={{ my: 2 }} />

									{app.accompanyingPersons &&
										app.accompanyingPersons.length > 0 && (
											<>
												<Typography
													variant='h6'
													gutterBottom
												>
													Accompanying Persons:
												</Typography>
												<ul>
													{app.accompanyingPersons.map(
														(person, index) => (
															<li key={index}>
																<Typography>
																	<strong>
																		Name:
																	</strong>{" "}
																	{
																		person.name
																	}
																	,{" "}
																	<strong>
																		Relation:
																	</strong>{" "}
																	{
																		person.relation
																	}
																</Typography>
															</li>
														)
													)}
												</ul>
											</>
										)}

									<Grid
										container
										spacing={2}
										sx={{ marginTop: 2 }}
									>
										<Grid item xs={12} sm={4}>
											<Typography>
												<strong>No. of Rooms:</strong>{" "}
												{app.numberOfRooms.toLocaleString()}
											</Typography>
											<Typography>
												<strong>Rent Paid By:</strong>{" "}
												{app.rentPaidBy}
											</Typography>
											<Typography>
												<strong>
													Purpose of Stay:
												</strong>{" "}
												{app.purposeOfStay}
											</Typography>
										</Grid>
										<Grid item xs={12} sm={4}>
											<Typography>
												<strong>Check-In Date:</strong>{" "}
												{new Date(
													app.checkInDate
												).toLocaleString()}
											</Typography>
											<Typography>
												<strong>Check-Out Date:</strong>{" "}
												{new Date(
													app.checkOutDate
												).toLocaleString()}
											</Typography>
										</Grid>
										<Grid item xs={12} sm={4}>
											<Typography>
												<strong>Created At:</strong>{" "}
												{new Date(
													app.createdAt
												).toLocaleString()}
											</Typography>
											<Typography>
												<strong>Last Updated:</strong>{" "}
												{new Date(
													app.updatedAt
												).toLocaleString()}
											</Typography>
										</Grid>
									</Grid>
									{app.status === "approved" ? (
										<Button
											size='large'
											color='secondary'
											startIcon={<AddIcon />}
											onClick={() =>
												handleBook(app._id, app.status)
											}
										>
											Book
										</Button>
									) : (
										""
									)}
								</AccordionDetails>
							</Accordion>
						))
					) : (
						<Typography>No applications available.</Typography>
					)}
				</Paper>
			</Box>
			<Footer />
		</>
	);
};

export default UserDashboard;
