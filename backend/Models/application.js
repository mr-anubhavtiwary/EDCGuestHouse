const mongoose = require("mongoose");

// Define the accompanying persons schema
const AccompanyingPersonSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxlength: 100,
		},
		relation: {
			type: String,
			trim: true,
			maxlength: 50,
		},
	},
	{ _id: false }
);

// Define the application schema
const ApplicationSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			minlength: 3,
			maxlength: 100,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			match: /.+\@.+\..+/, // Valid email format
		},
		status: {
			type: String,
			enum: ["approved", "pending", "rejected"],
			required: true,
		},
		userid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		referenceId: {
			type: String,
			unique: true, // Ensures reference ID is unique across applications
			sparse: true, // Allows `null` values for unpaid applications, if required
		},
		designation: {
			type: String,
			enum: ["A", "B", "C", "D"], // Director, head/section in charge, etc.
			required: true,
		},
		employeeCode: {
			type: String,
			required: true,
			trim: true,
			alphanumeric: true,
			minlength: 3,
			maxlength: 10,
		},
		applicantAddress: {
			type: String,
			required: true,
			trim: true,
			minlength: 10,
			maxlength: 200,
		},
		applicantPhone: {
			type: String,
			required: true,
			match: /^[0-9]{10}$/, // Must be exactly 10 digits
		},
		guestName: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 100,
		},
		guestAddress: {
			type: String,
			required: true,
			trim: true,
			minlength: 10,
			maxlength: 200,
		},
		guestMobile: {
			type: String,
			required: true,
			match: /^[0-9]{10}$/, // Must be exactly 10 digits
		},
		guestEmail: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			match: /.+\@.+\..+/, // Valid email format
		},
		relationWithApplicant: {
			type: String,
			enum: ["A", "B", "C", "D"], // Institute Guest, Departmental Guest, etc.
			required: true,
		},
		accompanyingPersons: {
			type: [AccompanyingPersonSchema], // An array of accompanying persons
			validate: [arrayLimit, "Exceeds the limit of 3 persons"], // Limit to 3 persons
		},
		rentPaidBy: {
			type: String,
			enum: ["Applicant", "Guest"],
			required: true,
		},
		checkInDate: {
			type: Date,
			required: true,
		},
		checkOutDate: {
			type: Date,
			required: true,
		},
		numberOfRooms: {
			type: Number,
			required: true,
			min: 1,
		},
		purposeOfStay: {
			type: String,
			enum: ["Personal", "Official"],
			required: true,
		},
	},
	{ timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Custom validation function to limit the number of accompanying persons
function arrayLimit(val) {
	return val.length <= 3;
}

// Create and export the Application model
const ApplicationModel = mongoose.model("Application", ApplicationSchema);
module.exports = ApplicationModel;
