import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Button,
	Paper,
	Box,
	Grid,
	Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = ({ applications, handleChange }) => {
	const isAdmin = localStorage.getItem("isAdmin") === "true";
	return (
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
									sx={{
										color: `${
											isAdmin ? "#eb4545ed" : "#0dd2fe"
										}`,
									}}
								/>
							}
							sx={{
								backgroundColor: `${
									isAdmin ? "#eb4545ed" : "#0dd2fe"
								}`,
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

						<AccordionDetails sx={{ backgroundColor: "#f0faff" }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<Typography>
										<strong>Application ID:</strong>{" "}
										{app._id}
									</Typography>
									<Typography>
										<strong>User ID:</strong> {app.userid}
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
										<strong>Applicant Address:</strong>{" "}
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
										<Typography variant='h6' gutterBottom>
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
															{person.name},{" "}
															<strong>
																Relation:
															</strong>{" "}
															{person.relation}
														</Typography>
													</li>
												)
											)}
										</ul>
									</>
								)}

							<Grid container spacing={2} sx={{ marginTop: 2 }}>
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
										<strong>Purpose of Stay:</strong>{" "}
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

							{isAdmin ? (
								<Box sx={{ marginTop: 3 }}>
									<Button
										variant='contained'
										color='success'
										onClick={() =>
											handleChange(app._id, "approved")
										}
										sx={{
											marginRight: 2,
											backgroundColor: "#28a745",
										}}
									>
										Approve
									</Button>
									<Button
										variant='contained'
										color='warning'
										onClick={() =>
											handleChange(app._id, "pending")
										}
										sx={{
											marginRight: 2,
											backgroundColor: "#ffc107",
										}}
									>
										Pending
									</Button>
									<Button
										variant='contained'
										color='error'
										onClick={() =>
											handleChange(app._id, "rejected")
										}
										sx={{ backgroundColor: "#dc3545" }}
									>
										Reject
									</Button>
								</Box>
							) : app.status === "approved" ? (
								<Button
									size='large'
									color='secondary'
									startIcon={<AddIcon />}
									onClick={() =>
										handleChange(app._id, app.status)
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
	);
};

export default Dashboard;
