const UserModel = require("../Models/User");
const AdminModel = require("../Models/admin");
const ApplicationModel = require("../Models/application");
const mongoose = require("mongoose");

// Session handling with transaction, concurrency, duplicate entries, and proper error handling.
const application = async (req, res) => {
	// console.log(req.body());
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const {
			email,
			designation,
			employeeCode,
			applicantAddress,
			applicantPhone,
			guestName,
			guestAddress,
			guestMobile,
			guestEmail,
			relationWithApplicant,
			rentPaidBy,
			checkInDate,
			checkOutDate,
			numberOfRooms,
			purposeOfStay,
			accompanyingPersons,
		} = req.body;

		// Checking if the user exists
		const user = await UserModel.findOne({ email });
		if (!user) {
			await session.abortTransaction();
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}

		// console.log(user);

		const userid = user._id;

		// Check for duplicate application
		const existingApplication = await ApplicationModel.findOne({
			userid,
			employeeCode,
		}).session(session);
		if (existingApplication > 3) {
			await session.abortTransaction();
			return res.status(400).json({
				message: "An user cannot send more than three applications.",
				success: false,
			});
		}
		// console.log(existingApplication);

		// Creating new application with all form fields
		const applicationModel = new ApplicationModel({
			status: "pending",
			userid,
			email,
			designation,
			employeeCode,
			applicantAddress,
			applicantPhone,
			guestName,
			guestAddress,
			guestMobile,
			guestEmail,
			relationWithApplicant,
			rentPaidBy,
			checkInDate,
			checkOutDate,
			numberOfRooms,
			purposeOfStay,
			accompanyingPersons,
		});

		const savedApplication = await applicationModel.save({ session }); // Save the application and get the saved document

		// Push application ID to user's applications array
		const application_id = savedApplication._id;
		await UserModel.updateOne(
			{ _id: user._id },
			{ $push: { applications: application_id } },
			{ session }
		);
		await AdminModel.updateOne(
			{},
			{ $push: { applications: application_id } },
			{ session }
		);

		// Commit the transaction
		await session.commitTransaction();
		return res.status(201).json({
			message: "Application sent successfully",
			success: true,
		});
	} catch (error) {
		await session.abortTransaction();
		console.error(error);
		return res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	} finally {
		session.endSession();
	}
};

const getUserApplications = async (req, res) => {
	try {
		const userId = req.userId;
		// console.log("user id : ", userId);
		const applicationData = await UserModel.findOne({ _id: userId })
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

const getApplicationStatus = async (req, res) => {
	const { appId } = req.params;
	const { status } = req.query;
	// console.log("appID", appId);
	try {
		// Find the application by its ID and update its status
		// console.log("app id", appId);
		const findApplication = await ApplicationModel.findOne({ _id: appId });
		// console.log("app data", findApplication);
		// If the application is not found
		if (!findApplication) {
			return res
				.status(404)
				.json({ success: false, message: "Application not found" });
		}
		if (status != "approved") {
			return res
				.status(404)
				.json({ success: false, message: "Application not approved" });
		}
		// Send back the updated application data
		return res
			.status(200)
			.json({ success: true, message: "Application is approved" });
	} catch (error) {
		// Handle any errors that occur during the process
		console.error("Error application status:", error);
		return res
			.status(500)
			.json({ success: false, message: "Server error" });
	}
};

module.exports = {
	application,
	getUserApplications,
	getApplicationStatus,
};
