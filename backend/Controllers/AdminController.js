const AdminModel = require("../Models/admin");
const ApplicationModel = require("../Models/application");

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

const patchApplicationStatus = async (req, res) => {
	const { appId } = req.params; // Extract the application ID from the request parameters
	const { status } = req.body; // Extract the new status from the request body
	// console.log("appID", appId);
	// // Validate the status to make sure it's one of the allowed values
	// const validStatuses = ["approved", "pending", "rejected"];
	// if (!validStatuses.includes(status)) {
	// 	return res
	// 		.status(400)
	// 		.json({ success: false, message: "Invalid status value" });
	// }

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
