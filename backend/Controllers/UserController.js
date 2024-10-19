const UserModel = require("../Models/User");
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
    console.log(user);

		const userid = user._id.toHexString();

		// Check for duplicate application
		const existingApplication = await ApplicationModel.findOne({
			userid,
			employeeCode,
		}).session(session);
		if (existingApplication) {
			await session.abortTransaction();
			return res.status(400).json({
				message: "An application with this employee code already exists for this user.",
				success: false,
			});
		}

		// Creating new application with all form fields
		const applicationModel = new ApplicationModel({
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
		const application_id = savedApplication._id.toHexString();
		await UserModel.updateOne(
			{ _id: user._id },
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

module.exports = {
	application,
};
