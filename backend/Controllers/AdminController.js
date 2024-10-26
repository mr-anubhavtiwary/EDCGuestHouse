const AdminModel = require("../Models/admin");
const ApplicationModel = require("../Models/application");

// Import Nodemailer
const nodemailer = require("nodemailer");

const getAdminApplications = async (req, res) => {
	try {
		const adminId = req.adminId;
		const applicationData = await AdminModel.findOne({ _id: adminId })
			.populate("applications")
			.select("applications");

		res.status(201).json({
			message: "Signup successfully",
			success: true,
			data: applicationData.applications,
		});
	} catch (err) {
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};

// Set up your Nodemailer transporter
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
		clientId: process.env.OAUTH_CLIENT_ID,
		clientSecret: process.env.OAUTH_CLIENT_SECRET,
		refreshToken: process.env.OAUTH_REFRESH_TOKEN,
	},
});

// Function to send an email
const sendApprovalEmail = async (userEmail, applicationId) => {
	try {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: userEmail,
			subject: "Your Application Status",
			text: `Your application with ID: ${applicationId} has been approved!`,
		};

		await transporter.sendMail(mailOptions);
		console.log("Approval email sent to", userEmail);
	} catch (error) {
		console.error("Error sending email:", error);
	}
};

const patchApplicationStatus = async (req, res) => {
	const { appId } = req.params; // Extract the application ID from the request parameters
	const { status } = req.body; // Extract the new status from the request body
	try {
		// Find the application by its ID and update its status
		const updatedApplication = await ApplicationModel.findByIdAndUpdate(
			appId, // Find the application by ID
			{ status }, // Update the status
			{ new: true, runValidators: true } // Return the updated document
		);

		// If the application is not found
		if (!updatedApplication) {
			return res
				.status(404)
				.json({ success: false, message: "Application not found" });
		}

		// const { email } = updatedApplication;
		// const email = "h6676536@gmail.com";
		// console.log("", email);
		// console.log("", name);
		// if (status === "approved") {
		// 	await sendApprovalEmail(email, appId); // Ensure application.userEmail exists
		// }

		// Send back the updated application data
		return res
			.status(200)
			.json({ success: true, data: updatedApplication });
	} catch (error) {
		// Handle any errors that occur during the process
		console.error("Error updating application status:", error);
		return res
			.status(500)
			.json({ success: false, message: "Server error" });
	}
};

module.exports = {
	getAdminApplications,
	patchApplicationStatus,
};
